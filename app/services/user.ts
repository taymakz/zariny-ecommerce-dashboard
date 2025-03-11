import FetchApi from '~/composables/api'

export function UserLogin({
  password,
  email,
}: {
  email: string
  password: string
}): Promise<Response> {
  return FetchApi('login/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  })
}
export function UserLogout(): Promise<Response> {
  return FetchApi('login/', {
    method: 'DELETE',
    credentials: 'include',
  })
}
