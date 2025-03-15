import type { AuthenticateTokensType } from '~/types/authenticate'
import type { UserAdminType } from '~/types/user'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import FetchApi from '~/composables/api'
import { UserLogout } from '~/services/user'
import {
  isAuthenticateAccessTokenExpired,
} from '~/utils/authenticate'
import { createSimpleMemoizeExpiringCache } from '~/utils/cache'

export const useAuthenticateStore = defineStore('authenticate', () => {
  // State
  const userTokens = ref<AuthenticateTokensType | null>(null)
  const userEmail = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const initLoading = ref<boolean>(true)

  // Computed Properties
  const isLogin = computed((): boolean => userEmail.value != null)
  const getUserTokens = computed(() => userTokens.value)
  const getLoading = computed((): boolean => loading.value)
  const getInitLoading = computed((): boolean => initLoading.value)
  const getUserEmail = computed(() => userEmail.value)
  // Actions - Setters
  const SetLoading = (value?: boolean) => {
    if (value)
      loading.value = value
    else loading.value = !loading.value
  }

  const UpdateUserEmail = (email: string | null) => {
    const email_cookie = useCookie('email')
    email_cookie.value = email
    userEmail.value = email
  }

  const RedirectToLogin = async () => {
    const route = useRoute()
    return await navigateTo(`/auth?backUrl=${route.fullPath}`)
  }
  const Logout = async () => {
    loading.value = true
    const result = await UserLogout()

    if (result.success) {
      toast.warning('Loged Out Successfuly')
      const email_cookie = useCookie('email')
      email_cookie.value = null
      userEmail.value = null
      // Redirect to the login page with the current URL as the backUrl parameter
      await RedirectToLogin()
    }
    loading.value = false
  }

  const Login = async (email: string) => {
    const route = useRoute()
    UpdateUserEmail(email)
    const backUrl: any = route.query.backUrl || '/'
    return await navigateTo(backUrl)
  }
  const InitUser = useMemoize(
    async () => {
      const email_cookie = useCookie('email')
      if (email_cookie.value) {
        if (isAuthenticateAccessTokenExpired()) {
          try {
            await refreshToken()
            UpdateUserEmail(email_cookie.value)
          }
          catch {
            toast.error('Token Expired, please loggin again')
            UpdateUserEmail(null)
            await RedirectToLogin()
          }
        }
        UpdateUserEmail(email_cookie.value)
      }
      initLoading.value = false
    },
    { cache: createSimpleMemoizeExpiringCache(4000) },
  )

  // Return Store
  return {
    isLogin,
    Logout,
    getUserTokens,
    getLoading,
    getInitLoading,
    getUserEmail,
    SetLoading,
    InitUser,
    Login,
    RedirectToLogin,

  }
})
