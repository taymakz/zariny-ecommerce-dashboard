import type { AuthenticateTokensType } from '~/types/account/authenticate'

export function getAuthenticateTokens(): AuthenticateTokensType | null {
  const tokens = localStorage.getItem('authTokens')
  try {
    const parsedTokens = JSON.parse(tokens || '') as AuthenticateTokensType
    return parsedTokens.access && parsedTokens.refresh ? parsedTokens : null
  }
  catch {
    return null
  }
}
export function isAuthenticateAccessTokenExpired(exp?: number): boolean {
  // Use the provided `exp` if available; otherwise, retrieve from `getAuthenticateTokens()`
  const accessExp = exp ?? getAuthenticateTokens()?.access_exp
  // If `accessExp` is still undefined, tokens are not available or invalid
  if (!accessExp)
    return true
  // Check if the current time has surpassed `accessExp`
  return Math.floor(Date.now() / 1000) > accessExp
}
