export function isAuthenticateAccessTokenExpired(): boolean {
  const expiry_date = useCookie('expiry_date')

  if (!expiry_date.value)
    return true // If null, consider it expired

  return new Date(expiry_date.value) <= new Date() // Check if expired
}
