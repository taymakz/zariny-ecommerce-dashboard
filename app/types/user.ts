export interface UserAdminType {
  email: string
}
export interface UsersType {
  pk: number
  email: string
  is_staff: boolean
  is_active: boolean
  last_login: Date
}
