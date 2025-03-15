export default defineNuxtRouteMiddleware(async (to) => {
  const email = useCookie('email')

  if (!email.value)
    return navigateTo(`/auth?backUrl=${to.fullPath}`)
  if (!isAuthenticateAccessTokenExpired())
    return

  try {
    await refreshToken()
  }
  catch {
    return navigateTo(`/auth?backUrl=${encodeURIComponent(to.fullPath)}`)
  }
})
