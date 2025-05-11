export interface ApiResponseType<T> {
  success: boolean
  status: number
  message: string
  data: T
  errors?: object
}

export interface ApiFilterResultType<T> {
  count: number
  next: number | null
  previous: number | null
  results: T[]
}
