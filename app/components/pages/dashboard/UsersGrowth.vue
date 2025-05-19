<script lang="ts" setup>
import type { LegendPosition } from '~/types/chart' // Assuming chart types are defined
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for better type safety
interface AreaChartItem {
  date: string
  count: number
}

interface ApiResponse<T> {
  data: T
}

// State management
const BarChartData = ref<AreaChartItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data with proper typing
onMounted(async () => {
  try {
    isLoading.value = true
    const res = await ClientApi<AreaChartItem[]>('/admin/user-growth/')
    BarChartData.value = res.data.map(item => ({
      date: item.date,
      count: item.count,
    }))
  }
  catch (err) {
    error.value = 'Failed to load user growth data'
    console.error('Failed to fetch user growth data:', err)
  }
  finally {
    isLoading.value = false
  }
})

// X-axis formatter with type safety
function xFormatter(i: number): string {
  const item = BarChartData.value[i]
  if (!item?.date)
    return ''

  const date = new Date(item.date)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Tooltip formatter with proper typing
function tooltipFormatter(context: { index: number }): string {
  const item = BarChartData.value[context.index]
  if (!item?.date)
    return 'No data available'

  const date = new Date(item.date)
  const timeAgo = useTimeAgo(date)
  return `${timeAgo.value}: ${item.count} new users`
}

// Header metrics with null checks
const totalUsers = computed(() => {
  if (!BarChartData.value.length)
    return '0'
  return BarChartData.value
    .reduce((sum, item) => sum + (item.count ?? 0), 0)
    .toLocaleString()
})

const growthRate = computed(() => {
  if (BarChartData.value.length < 2)
    return '0%'

  const last = BarChartData.value[BarChartData.value.length - 1]?.count ?? 0
  const secondLast = BarChartData.value[BarChartData.value.length - 2]?.count ?? 0

  if (secondLast === 0)
    return '0%'
  const rate = ((last - secondLast) / secondLast) * 100
  return `${rate.toFixed(1)}%`
})

const lastUpdate = computed(() => {
  if (!BarChartData.value.length)
    return 'N/A'

  const lastDate = new Date(BarChartData.value[BarChartData.value.length - 1]?.date ?? '')
  return lastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

// Chart categories with proper typing
const categories: Record<string, { name: string }> = {
  count: { name: 'New Users' },
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="w-full h-[387px]">
      <Skeleton class="w-full h-full" />
    </div>
    <div v-else-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>
    <div v-else>
      <Card class="p-6">
        <div class="mb-4 flex items-center justify-between border-b pb-4">
          <div>
            <h2 class="text-xl font-medium">
              User Growth Monitoring
            </h2>
          </div>

          <div class="grid grid-cols-3 gap-6 text-right">
            <div>
              <p class="mb-1 text-sm text-card-muted">
                Total Users
              </p>
              <p class="font-medium">
                {{ totalUsers }}
              </p>
            </div>
            <div>
              <p class="mb-1 text-sm text-card-muted">
                Growth Rate
              </p>
              <p class="font-medium">
                {{ growthRate }}
              </p>
            </div>
            <div>
              <p class="mb-1 text-sm text-card-muted">
                Last Update
              </p>
              <p class="font-medium">
                {{ useTimeAgo(new Date(lastUpdate)) }}
              </p>
            </div>
          </div>
        </div>

        <BarChart :data="BarChartData" :height="200" :categories="categories" :y-axis="['count']" x-key="date"
          y-key="count" type="area" :y-num-ticks="4" :y-grid-line="true" :x-formatter="xFormatter"
          :tooltip-formatter="tooltipFormatter" :legend-position="LegendPosition.Top" />
      </Card>
    </div>
  </div>
</template>
