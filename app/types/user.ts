export type EntryYearType = 'BEFORE_400' | 'YEAR_401' | 'YEAR_402' | 'YEAR_403'
export type EntryYearSemesterType = 'MEHR' | 'BAHMAN'
export type GenderType = 'MALE' | 'FEMALE'
export type TermNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface UserType {
  id: number
  telegram_username: string
  first_name: string
  last_name: string
  gender: GenderType
  degree: string
  entry_year: EntryYearType
  entry_year_semester: EntryYearSemesterType
  term_number: TermNumberType
  language_code: string
  is_premium: boolean
  verified_student: boolean
  allows_write_to_pm: boolean
  photo_url: string
  banned: boolean
  banned_reason: string
  last_online: Date
  date_joined: Date
  devices: UserDeviceType[]
}
export interface UserCoursesType {
  noted_courses: {
    id: number
    course_index: number
  }[]
  passed_courses: {
    id: number
    course_name: string
  }[]
}
export interface UserDeviceType {
  device_info: string
  created_at: Date
}

export interface UserAdminType {
  id: number
  first_name: string
  last_name: string
}
