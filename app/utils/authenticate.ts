export function isAuthenticateAccessTokenExpired(): boolean {
  return !useCookie('expiry_date').value
}
