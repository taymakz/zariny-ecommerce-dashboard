import type { Ref } from 'vue'
import type { ApiFilterResultType } from '~/types/request'
import { toast } from 'vue-sonner'

export function usePaginatedData<T>(
  endpoint: string,
  filters: Record<string, any> = {},
  take = 10,
  options: {
    scrollContainer?: Ref<HTMLElement | null> | HTMLElement | null
    autoLoadOnMount?: boolean
  } = {
      autoLoadOnMount: true,
    },
) {
  const dataList = ref<T[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const hasMore = ref(true)
  const entityCount = ref<number | null>(null)
  const resultCount = computed(() => dataList.value.length)
  const firstInitLoading = ref(options.autoLoadOnMount ?? true)
  const error = ref<string | null>(null)

  const scrollContainer = ref<HTMLElement | null>(
    options.scrollContainer && 'value' in options.scrollContainer
      ? options.scrollContainer.value
      : options.scrollContainer ?? null,
  )

  const loadData = async (reset = false) => {
    if (isLoading.value || (!hasMore.value && !reset)) return

    isLoading.value = true
    error.value = null

    try {
      if (reset) {
        dataList.value = []
        page.value = 1
        hasMore.value = true
        firstInitLoading.value = false
      }

      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries({ ...filters, page: page.value, take: String(take) })
          .filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0
            return value !== '' && value !== null && value !== undefined
          })
          .map(([key, value]) => [key, String(value)]),
      )

      const queryParams = new URLSearchParams(filteredParams).toString()
      const response = await ClientApi<ApiFilterResultType<T>>(`${endpoint}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if the response was successful
      if (!response.success) {
        throw new Error(response.message || 'API request failed')
      }

      if (entityCount.value === 0) {
        entityCount.value = response.data.count
      }

      if (hasMore.value) {
        const newItems: T[] = response.data.results
        dataList.value.push(...newItems)
        page.value++
      }

      // Check if there are more pages based on `next`
      hasMore.value = response.data.next !== null
    } catch (err: any) {
      const errorMessage = err.message || `Error fetching data from ${endpoint}`
      console.error(errorMessage, err)
      error.value = errorMessage
      if (import.meta.client) {
        toast.error(errorMessage)
      }
    } finally {
      isLoading.value = false
    }
  }

  const refresh = async () => {
    if (isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      page.value = 1
      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries({ ...filters, page: page.value, take: String(take) })
          .filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0
            return value !== '' && value !== null && value !== undefined
          })
          .map(([key, value]) => [key, String(value)]),
      )

      const queryParams = new URLSearchParams(filteredParams).toString()
      const response = await ClientApi<ApiFilterResultType<T>>(`${endpoint}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if the response was successful
      if (!response.success) {
        throw new Error(response.message || 'API request failed')
      }

      dataList.value = response.data.results
      entityCount.value = response.data.count
      hasMore.value = response.data.next !== null
      page.value++
    } catch (err: any) {
      const errorMessage = err.message || `Error refreshing data from ${endpoint}`
      console.error(errorMessage, err)
      error.value = errorMessage
      if (import.meta.client) {
        toast.error(errorMessage)
      }
    } finally {
      isLoading.value = false
    }
  }

  const handleScroll = () => {
    if (!scrollContainer.value || isLoading.value || !hasMore.value) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
    const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 500

    if (isCloseToBottom) {
      loadData()
    }
  }

  watch(
    () => filters,
    () => loadData(true),
    { deep: true },
  )

  onMounted(async () => {
    if (options.autoLoadOnMount ?? true) {
      await loadData()
      firstInitLoading.value = false
    }

    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
  })

  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    dataList,
    loadData,
    refresh,
    isLoading,
    hasMore,
    resultCount,
    entityCount,
    page,
    scrollContainer,
    firstInitLoading,
    handleScroll,
    error,
  }
}
