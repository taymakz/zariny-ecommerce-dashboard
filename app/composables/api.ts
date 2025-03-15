import type { ApiResponseType } from '~/types/request'
import { toast } from 'vue-sonner'
import { useAuthenticateStore } from '~/stores/authenticate'
import {
  isAuthenticateAccessTokenExpired,
} from '~/utils/authenticate'

/**
 * FetchApi - A function to handle API requests with default configuration and error handling.
 * @param {string} url - The endpoint URL.
 * @param {any} config - Optional Axios-like configuration object.
 * @returns {Promise<ApiResponseType<T>>} - The API response wrapped in a generic type.
 */
export default async function FetchApi<T>(
  url: string,
  config: any = {},
): Promise<ApiResponseType<T>> {
  const runtimeConfig = useRuntimeConfig()

  // Set default configuration values
  config = {
    method: 'GET',
    baseURL: `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/`,
    ...config,
    credentials: 'include',
  }

  try {
    // Attempt API call using $fetch
    return await $fetch<ApiResponseType<T>>(url, config)
  }
  catch (error: any) {
    // Handle error based on HTTP status or specific error message
    return handleFetchError<T>(error)
  }
}
/**
 * ClientApi - A function to handle authenticated API requests.
 * Ensures the user is logged in and refreshes tokens if necessary.
 * @param {string} url - The endpoint URL.
 * @param {any} config - Optional fetch configuration object.
 * @returns {Promise<Response>} - The raw fetch Response object.
 */
export async function ClientApi(
  url: string,
  config: any = {},
): Promise<Response> {
  const email = useCookie('email') // Retrieve user's email from cookies
  const authStore = useAuthenticateStore() // Get authentication store for state management

  // If the user is not logged in, show an error and redirect to login
  if (!email.value) {
    toast.error('Please log in first') // Show toast notification
    authStore.RedirectToLogin() // Redirect to login page
  }
  // If access token is expired, refresh it before making API call
  if (isAuthenticateAccessTokenExpired()) {
    try {
      await refreshToken()
    }
    catch {
      toast.error('Please log in first') // Show toast notification
      authStore.RedirectToLogin() // Redirect to login page
    }
  }

  // Set default config and attach access token to headers if available
  config = {
    method: 'GET', // Default request method
    credentials: 'include', // Include cookies for authentication
    headers: {
      ...(config.headers || {}), // Merge provided headers with existing ones
    },
    ...config, // Spread provided config to override defaults
  }

  const runtimeConfig = useRuntimeConfig() // Get runtime config for API base URL

  // Construct full URL (since fetch doesn't use baseURL directly)
  const fullUrl = `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/${url.startsWith('/') ? url.slice(1) : url}`

  // Perform API call using native fetch
  return await fetch(fullUrl, config)
}

/**
 * handleFetchError - Function to handle general API errors.
 * @param {any} error - Error object from $fetch.
 * @returns {ApiResponseType<T>} - Error response in the expected format.
 */
function handleFetchError<T>(error: any): ApiResponseType<T> {
  if (error.status === 429) {
    if (import.meta.client)
      toast('Please try again in a moment')
    return {
      success: false,
      status: error.response?.status,
      message: 'Please try again in a moment',
      data: null,
    } as ApiResponseType<T>
  }
  else if (error.message.includes('<no response> Failed to fetch')) {
    if (import.meta.client)
      toast('The server is currently unavailable')
    return {
      success: false,
      status: 503,
      message: 'The server is currently unavailable',
      data: null,
    } as ApiResponseType<T>
  }
  else {
    return {
      success: false,
      status: error.response?.status,
      message: 'An error occurred during the operation',
      data: null,
    } as ApiResponseType<T>
  }
}

/**
 * Refresh authentication token using native fetch.
 * Throws an error if refresh fails.
 */
export async function refreshToken(): Promise<void> {
  const runtimeConfig = useRuntimeConfig()
  const authStore = useAuthenticateStore()

  const url = `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/refresh/`

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      credentials: 'include', // Ensure cookies are sent
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }
  }
  catch (error) {
    toast.error('Session expired. Please log in again.')
    authStore.RedirectToLogin()
    throw error // Re-throw to handle it elsewhere if needed
  }
}
