import { toast } from 'vue-sonner'
import { useAuthenticateStore } from '~/stores/authenticate'
import {
  isAuthenticateAccessTokenExpired,
} from '~/utils/authenticate'

/**
 * FetchApi - A function to handle API requests with default configuration.
 * @param {string} url - The endpoint URL.
 * @param {any} config - Optional fetch configuration object.
 * @returns {Promise<Response>} - The raw fetch Response object.
 */
export default async function FetchApi(
  url: string,
  config: any = {},
): Promise<Response> {
  const runtimeConfig = useRuntimeConfig() // Getting runtime configuration for API base URL

  // Set default configuration values
  const fetchConfig = {
    method: 'GET', // Default request method
    credentials: 'include', // Include cookies for cross-origin requests
    headers: {
      'Content-Type': 'application/json', // Default content type
    },
    baseURL: `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api/`, // Base API URL
    ...config, // Spread provided config to override defaults
  }

  // Construct full URL (since fetch doesn't use baseURL directly)
  const fullUrl = `${fetchConfig.baseURL}${url.startsWith('/') ? url.slice(1) : url}`

  // Remove baseURL from fetchConfig since fetch doesn't use it
  delete fetchConfig.baseURL

  // Perform API call using native fetch and return the full Response
  return await fetch(fullUrl, fetchConfig)
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

  /**
   * refreshToken - Function to refresh the authentication token.
   * If the refresh request fails, it forces the user to log in again.
   */
  async function refreshToken() {
    const result = await FetchApi('refresh/', { method: 'HEAD' }) // Call API to refresh token

    if (!result.ok) { // If refresh fails, force user to log in again
      toast.error('Please log in first') // Show toast notification
      authStore.RedirectToLogin() // Redirect to login page
    }
  }

  // If access token is expired, refresh it before making API call
  if (isAuthenticateAccessTokenExpired()) {
    await refreshToken()
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
