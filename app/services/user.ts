import type { AuthenticateTokensType } from '~/types/authenticate'
import type { ApiResponseType } from '~/types/request'
import type { UserAdminType } from '~/types/user'
import FetchApi from '~/composables/api'

const basePrefix = 'users/'

export function UserGetCurrentDetail(): Promise<
  ApiResponseType<UserAdminType>
> {
  return ClientApi(`${basePrefix}current/`)
}
export function UserLogin({
  password,
  username,
}: {
  username: string
  password: string
}): Promise<ApiResponseType<AuthenticateTokensType>> {
  return FetchApi(`${basePrefix}auth/`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  })
}
export function UserLogout(refresh: string): Promise<ApiResponseType<null>> {
  return ClientApi(`${basePrefix}logout/`, {
    method: 'POST',
    body: JSON.stringify({
      refresh,
    }),
  })
}
