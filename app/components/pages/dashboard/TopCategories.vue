<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for type safety
interface BarChartItem {
  name: string
  total: number
}

interface BulletLegendItemInterface {
  name: string
  color: string
}

// State management
const chartData = ref<BarChartItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Dynamic categories
const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  total: {
    name: 'Total Quantity Sold',
    color: '#22c55e',
  },
}))

// Fetch data for top categories
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await ClientApi<BarChartItem[]>('/admin/top-categories/')
    chartData.value = response.data
  } catch (err) {
    error.value = 'Failed to load top categories data'
    console.error('Failed to fetch top categories data:', err)
  } finally {
    isLoading.value = false
  }
})

// X-axis formatter (use category name)
function xFormatter(i: number): string {
  return chartData.value[i]?.name ?? 'Unknown'
}

// Y-axis formatter
function yFormatter(value: number): string {
  return value.toLocaleString()
}

// Header metrics
const totalQuantity = computed(() => {
  if (!chartData.value.length) return '0'
  return chartData.value
    .reduce((sum, item) => sum + (item.total ?? 0), 0)
    .toLocaleString()
})

const topCategory = computed(() => {
  if (!chartData.value.length) return 'N/A'
  return chartData.value[0]?.name ?? 'N/A'
})
</script>

<template>
  <div>
    <Card class="p-6 text-sm">
      <div class="mb-4 flex justify-between border-b pb-4">
        <div>
          <h2 class=" font-medium">Top Selling Categories</h2>
        </div>
        <div class="grid grid-cols-2 gap-6 ">
          <div>
            <p class="mb-1 text-sm text-card-muted">Total Quantity Sold</p>
            <p class="font-medium">{{ totalQuantity }}</p>
          </div>
          <div>
            <p class="mb-1 text-sm text-card-muted">Top Category</p>
            <p class="font-medium">{{ topCategory }}</p>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="w-full h-[250px]">
        <Skeleton class="w-full h-full" />
      </div>
      <div v-else-if="error" class="text-red-500 text-center p-4">
        {{ error }}
      </div>
      <BarChart
        v-else
        :data="chartData"
        :height="250"
        :categories="categories"
        :y-axis="['total']"
        :group-padding="0"
        :bar-padding="0.2"
        :y-num-ticks="4"
        :y-grid-line="true"
        :x-formatter="xFormatter"
        :legend-position="LegendPosition.Top"
      />
    </Card>
  </div>
</template>
