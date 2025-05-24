<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interface for API response
interface ProductCount {
  instock: number
  total: number
}

// Define interface for DonutChart labels
interface DonutLabel {
  color: string
  name: string
  value: number
}

// State management
const productCount = ref<ProductCount | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data from endpoint
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await ClientApi<ProductCount>('/admin/product-count/')
    productCount.value = response.data
  }
  catch (err) {
    error.value = 'Failed to load product count data'
    console.error('Failed to fetch product count data:', err)
  }
  finally {
    isLoading.value = false
  }
})

// Computed properties for DonutChart
const donutData = computed<DonutLabel[]>(() => {
  if (!productCount.value)
    return []
  return [
    {
      color: '#22c55e',
      name: 'In-Stock Products',
      value: productCount.value.instock,
    },
    {
      color: '#ef4444',
      name: 'Out-of-Stock Products',
      value: productCount.value.total - productCount.value.instock,
    },
  ]
})

const inStockRate = computed(() => {
  if (!productCount.value || productCount.value.total === 0)
    return '0%'
  const rate = (productCount.value.instock / productCount.value.total) * 100
  return `${rate.toFixed(1)}%`
})

const inStockProducts = computed(() => {
  return productCount.value?.instock.toLocaleString() ?? '0'
})

const totalProducts = computed(() => {
  return productCount.value?.total.toLocaleString() ?? '0'
})

const lastUpdated = computed(() => {
  return useTimeAgo(new Date())
})
</script>

<template>
  <Card class="p-6 w-full text-sm">
    <div class="mb-4 flex justify-between border-b pb-4 gap-4 flex-col 2xl:flex-row">
      <div>
        <h2 class="font-medium">
          Product Stock Status
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-6 text-left ">
        <div>
          <p class="mb-1 text-card-muted">
            In-Stock Products
          </p>
          <p class="font-medium">
            {{ inStockProducts }}
          </p>
        </div>
        <div>
          <p class="mb-1 text-card-muted">
            Total Products
          </p>
          <p class="font-medium">
            {{ totalProducts }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="w-full h-[200px]">
      <Skeleton class="w-full h-full" />
    </div>
    <div v-else-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>
    <div v-else class="relative w-50 mx-auto">
      <DonutChart :data="donutData.map((i) => i.value)" :height="200"  :labels="donutData" :hide-legend="true"
        :radius="0">
        <div class="absolute inset-0 flex items-center justify-center text-center flex-col text-sm">
          <div class="font-medium">
            In-Stock Rate
          </div>
          <div class="text-card-muted">
            {{ inStockRate }}
          </div>
          <div class="text-sm text-card-muted">
            {{ lastUpdated }}
          </div>
        </div>
      </DonutChart>
    </div>
  </Card>
</template>
