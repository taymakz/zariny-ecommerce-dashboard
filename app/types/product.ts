export interface ProductType {
  id: number
  first_image?: {
    pk: number
    image: string
  }
  title: string
  is_public: boolean
  updated_at: string
}
