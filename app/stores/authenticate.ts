import type { AuthenticateTokensType } from '~/types/authenticate'
import type { UserAdminType } from '~/types/user'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { RefreshUserToken } from '~/composables/api'
import { UserGetCurrentDetail, UserLogout } from '~/services/user'
import {
  getAuthenticateTokens,
  isAuthenticateAccessTokenExpired,
} from '~/utils/authenticate'
import { createSimpleMemoizeExpiringCache } from '~/utils/cache'

export const useAuthenticateStore = defineStore('authenticate', () => {
  // State
  const userTokens = ref<AuthenticateTokensType | null>(null)
  const userDetail = ref<UserAdminType | null>(null)
  const loading = ref<boolean>(false)
  const initLoading = ref<boolean>(false)

  // Computed Properties
  const isLogin = computed((): boolean => userDetail.value != null)
  const getUserTokens = computed(() => userTokens.value)
  const getUserDetail = computed(() => userDetail.value)
  const getLoading = computed((): boolean => loading.value)
  const getInitLoading = computed((): boolean => initLoading.value)
  const getFullname = computed(() => {
    const firstName = userDetail.value?.first_name ?? ''
    const lastName = userDetail.value?.last_name ?? ''

    return firstName || lastName ? `${firstName} ${lastName}`.trim() : ''
  })
  // Actions - Setters
  const SetLoading = (value?: boolean) => {
    if (value)
      loading.value = value
    else loading.value = !loading.value
  }

  const UpdateUserDetail = (data: Partial<UserAdminType>) => {
    userDetail.value = { ...data } as UserAdminType
  }

  const SetUserTokens = (tokens: AuthenticateTokensType) => {
    if (tokens) {
      userTokens.value = tokens
      clearLocalStorageTokens()
      updateLocalStorageTokens(tokens)
    }
  }
  function updateLocalStorageTokens(tokens: AuthenticateTokensType) {
    localStorage.setItem('authTokens', JSON.stringify(tokens))
  }
  function clearLocalStorageTokens() {
    localStorage.removeItem('authTokens')
  }
  const RefreshToken = useMemoize(
    async () => {
      const tokens = getAuthenticateTokens()
      if (!tokens || !tokens.refresh) {
        clearUserDetail()
        return { tokens: null, status: 401 }
      }

      try {
        const { tokens: refreshedTokens, status } = await RefreshUserToken(
          tokens.refresh,
        )
        if (refreshedTokens) {
          userTokens.value = refreshedTokens
          updateLocalStorageTokens(refreshedTokens)
          return { tokens: refreshedTokens, status }
        }
        else {
          clearUserDetail()
          return { tokens: null, status }
        }
      }
      catch (error) {
        console.error('Error during token refresh:', error)
        clearUserDetail() // Clear session on failure
        return { tokens: null, status: 401 } // Return unauthorized status
      }
    },
    { cache: createSimpleMemoizeExpiringCache(4000) },
  )
  // Actions - Authentication
  const SetUserDetail = useMemoize(
    async () => {
      initLoading.value = true
      if (import.meta.server) {
        initLoading.value = false
        return
      }
      const tokens = getAuthenticateTokens()
      if (!tokens) {
        initLoading.value = false
        return null
      }
      userTokens.value = tokens

      // If the access token is expired, refresh it
      if (isAuthenticateAccessTokenExpired()) {
        try {
          await RefreshToken() // Refresh token
        }
        catch (error) {
          console.error('Error refreshing token:', error)
          initLoading.value = false
          return // Exit if token refresh fails
        }
      }

      try {
        const result = await UserGetCurrentDetail()
        if (result.success) {
          userDetail.value = result.data
        }
        else {
          if (result.status) {
            clearUserDetail()
          }
        }
      }
      catch (error) {
        console.error('Error fetching user detail:', error)
        // Handle error appropriately
      }
      finally {
        initLoading.value = false // Reset loading state
      }
    },
    { cache: createSimpleMemoizeExpiringCache(2000) },
  )
  function clearUserDetail() {
    userTokens.value = null
    userDetail.value = null
    clearLocalStorageTokens()
  }

  const RedirectToLogin = () => {
    const route = useRoute()
    return navigateTo(`/auth?backUrl=${route.fullPath}`)
  }
  const Logout = async () => {
    const tokens = userTokens.value
    if (!tokens)
      return
    loading.value = true
    const result = await UserLogout(tokens.refresh)
    if (result.message)
      toast(result.message)

    if (result.success) {
      // Clear the login data and user data from the store and local storage
      userTokens.value = null
      userDetail.value = null
      clearLocalStorageTokens()

      // Redirect to the login page with the current URL as the backUrl parameter
      await RedirectToLogin()
    }
    loading.value = false
  }

  const Login = async (result: AuthenticateTokensType) => {
    const route = useRoute()
    clearLocalStorageTokens()
    localStorage.setItem('authTokens', JSON.stringify(result))
    SetUserTokens(result)
    await SetUserDetail()
    const backUrl: any = route.query.backUrl || '/'
    return await navigateTo(backUrl)
  }
  // Return Store
  return {
    isLogin,
    getUserTokens,
    getUserDetail,
    getLoading,
    getInitLoading,
    getFullname,
    SetLoading,
    UpdateUserDetail,
    SetUserTokens,
    SetUserDetail,
    Logout,
    Login,
    RedirectToLogin,
    RefreshToken,
  }
})
