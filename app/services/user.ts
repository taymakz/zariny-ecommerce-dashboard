import type { ApiResponseType } from '~/types/request'
import type { UserRoleType } from '~/types/user'

export function UserLogin({
  password,
  email,
}: {
  email: string
  password: string
}): Promise<ApiResponseType<{
  email: string
}>> {
  return FetchApi('login/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  })
}
export function UserLogout(): Promise<ApiResponseType<null>> {
  return ClientApi('login/', {
    method: 'DELETE',
    credentials: 'include',
  })
}
export function UserGetRole(): Promise<ApiResponseType<{ roles: UserRoleType[] }>> {
  return ClientApi('admin/myrole/', {
    credentials: 'include',
  })
}
