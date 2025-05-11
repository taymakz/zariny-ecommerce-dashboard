export default defineNuxtRouteMiddleware(async (to) => {
  const email = useCookie('email')

  if (!email.value)
    return navigateTo(`/account?backUrl=${to.fullPath}`)
  if (!isAuthenticateAccessTokenExpired())
    return

  try {
    await refreshToken()
  }
  catch {
    return navigateTo(`/account?backUrl=${encodeURIComponent(to.fullPath)}`)
  }
})
