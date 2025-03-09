import type { ApiFilterResultType } from '~/types/request'

export function usePaginatedData<T>(
  endpoint: string,
  filters: Record<string, any>,
  take = 50,
) {
  const dataList = ref<T[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const hasMore = ref(true)
  const entityCount = ref<number | null>(null)
  const resultCount = computed(() => dataList.value.length)

  const loadData = async (reset = false) => {
    if (isLoading.value || (!hasMore.value && !reset))
      return

    isLoading.value = true
    try {
      if (reset) {
        dataList.value = []
        page.value = 1
        hasMore.value = true
      }

      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries({ ...filters, page: page.value, take: String(take) })
          .filter(([_, value]) => {
            if (Array.isArray(value))
              return value.length > 0
            return value !== '' && value !== null && value !== undefined
          })
          .map(([key, value]) => [key, String(value)]),
      )

      const queryParams = new URLSearchParams(filteredParams).toString()
      const response = await ClientApi<ApiFilterResultType<T>>(
        `${endpoint}/?${queryParams}`,
      )

      if (entityCount.value === null) {
        entityCount.value = response.data.entity_count
      }

      if (hasMore.value) {
        const newItems: T[] = response.data.data
        dataList.value.push(...newItems)
        page.value++
      }

      if (!response.data.has_next) {
        hasMore.value = false
      }
    }
    catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error)
    }
    finally {
      isLoading.value = false
    }
  }

  // Add refresh function
  const refresh = async () => {
    if (isLoading.value) return
    
    isLoading.value = true
    try {
      page.value = 1
      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries({ ...filters, page: page.value, take: String(take) })
          .filter(([_, value]) => {
            if (Array.isArray(value))
              return value.length > 0
            return value !== '' && value !== null && value !== undefined
          })
          .map(([key, value]) => [key, String(value)]),
      )

      const queryParams = new URLSearchParams(filteredParams).toString()
      const response = await ClientApi<ApiFilterResultType<T>>(
        `${endpoint}/?${queryParams}`,
      )

      // Replace data instead of pushing
      dataList.value = response.data.data
      entityCount.value = response.data.entity_count
      hasMore.value = response.data.has_next
      page.value++
    }
    catch (error) {
      console.error(`Error refreshing data from ${endpoint}:`, error)
    }
    finally {
      isLoading.value = false
    }
  }

  watch(() => filters, () => loadData(true), { deep: true })

  return { 
    dataList, 
    loadData, 
    refresh, // Expose refresh function
    isLoading, 
    hasMore, 
    resultCount, 
    entityCount, 
    page 
  }
}
