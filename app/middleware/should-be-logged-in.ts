import FetchApi from '~/composables/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const email = useCookie('email')

  if (!email.value)
    return navigateTo(`/auth?backUrl=${to.fullPath}`)
  if (!isAuthenticateAccessTokenExpired())
    return

  const result = await FetchApi('refresh/', {
    method: 'HEAD',
  })
  if (!result.ok) {
    return navigateTo(`/auth?backUrl=${encodeURIComponent(to.fullPath)}`)
  }
})
