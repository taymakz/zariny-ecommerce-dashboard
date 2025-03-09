// Simple expiring cache for useMemoize
export function createSimpleMemoizeExpiringCache(timeout = 4000) {
  const cache = new Map()

  return {
    get(key: string) {
      const entry = cache.get(key)
      if (entry) {
        return entry.value
      }
      return undefined
    },
    set(key: string, value: any) {
      cache.set(key, { value })
      setTimeout(() => cache.delete(key), timeout) // Automatically delete cache after timeout
    },
    has(key: string) {
      return cache.has(key)
    },
    delete(key: string) {
      cache.delete(key)
    },
    clear() {
      cache.clear()
    },
  }
}
