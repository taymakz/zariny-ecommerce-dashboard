import type { ApiResponseType } from '~/types/request'
import { toast } from 'vue-sonner'
import { useAuthenticateStore } from '~/stores/authenticate'
import {
  isAuthenticateAccessTokenExpired,
} from '~/utils/authenticate'

/**
 * FetchApi - A function to handle API requests with default configuration and error handling.
 * @param url - The endpoint URL.
 * @param config - Optional fetch-like configuration object.
 * @returns - The API response wrapped in a generic type.
 */
export async function FetchApi<T>(
  url: string,
  config: RequestInit = {},
): Promise<ApiResponseType<T>> {
  const runtimeConfig = useRuntimeConfig()

  // Set default configuration values
  config = {
    method: 'GET',
    credentials: 'include', // Include cookies for authentication
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {}), // Merge provided headers
    },
  }

  // Construct full URL
  const fullUrl = `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/${url.startsWith('/') ? url.slice(1) : url}`

  try {
    const response = await fetch(fullUrl, config)
    const data = await response.json()

    // Validate response structure
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data as ApiResponseType<T>
  }
  catch (error: any) {
    return handleFetchError<T>(error)
  }
}

/**
 * ClientApi - A function to handle authenticated API requests.
 * Ensures the user is logged in and refreshes tokens if necessary.
 * @param url - The endpoint URL.
 * @param config - Optional fetch configuration object.
 * @returns - The API response wrapped in a generic type.
 */
export async function ClientApi<T>(
  url: string,
  config: RequestInit = {},
): Promise<ApiResponseType<T>> {
  const email = useCookie('email') // Retrieve user's email from cookies
  const authStore = useAuthenticateStore() // Get authentication store

  // Check if user is logged in
  if (!email.value) {
    toast.error('Please log in first')
    authStore.RedirectToLogin()
    throw new Error('User not authenticated')
  }

  // Refresh token if expired
  if (isAuthenticateAccessTokenExpired()) {
    try {
      await refreshToken()
    }
    catch {
      toast.error('Please log in first')
      authStore.RedirectToLogin()
      throw new Error('Token refresh failed')
    }
  }

  // Set default config and attach access token to headers if available
  const accessToken = useCookie('access_token') // Assuming access token is stored in a cookie
  config = {
    method: 'GET',
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      ...(config.headers || {}), // Merge provided headers
    },
    ...config,
  }

  // Construct full URL
  const runtimeConfig = useRuntimeConfig()
  const fullUrl = `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/${url.startsWith('/') ? url.slice(1) : url}`

  try {
    const response = await fetch(fullUrl, config)
    const data = await response.json()

    // Validate response structure
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data as ApiResponseType<T>
  }
  catch (error: any) {
    return handleFetchError<T>(error)
  }
}

/**
 * handleFetchError - Function to handle general API errors.
 * @param error - Error object from fetch.
 * @returns - Error response in the expected format.
 */
function handleFetchError<T>(error: any): ApiResponseType<T> {
  let status = 500
  let message = 'An error occurred during the operation'

  if (error.response?.status) {
    status = error.response.status
    if (status === 429) {
      message = 'Please try again in a moment'
      if (import.meta.client)
        toast(message)
    }
    else if (status === 401) {
      message = 'Unauthorized access'
      if (import.meta.client)
        toast('Please log in again')
      useAuthenticateStore().RedirectToLogin()
    }
    else if (status === 503) {
      message = 'The server is currently unavailable'
      if (import.meta.client)
        toast(message)
    }
  }
  else if (error.message.includes('Failed to fetch')) {
    status = 503
    message = 'The server is currently unavailable'
    if (import.meta.client)
      toast(message)
  }

  return {
    success: false,
    status,
    message,
    data: null,
    errors: error.response?.data?.errors || null,
  } as ApiResponseType<T>
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
