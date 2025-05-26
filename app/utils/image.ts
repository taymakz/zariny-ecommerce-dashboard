const config = useRuntimeConfig()
export function getImageUrl(name: string) {
  const baseUrl = config.public.baseApi
  return `${baseUrl}${name}`
}
