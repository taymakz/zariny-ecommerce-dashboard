<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for type safety
interface AreaChartItem {
  date: string
  count: number
}

// State management
const chartData = ref<AreaChartItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data with proper typing
onMounted(async () => {
  try {
    isLoading.value = true
    const res = await ClientApi<AreaChartItem[]>('/admin/user-growth/')
    chartData.value = res.data.map(item => ({
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

// X-axis formatter
function xFormatter(i: number): string {
  const item = chartData.value[i]
  if (!item?.date)
    return ''
  const date = new Date(item.date)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Y-axis formatter
function yFormatter(value: number): string {
  return value.toLocaleString()
}

// Tooltip formatter
function tooltipFormatter(context: { index: number }): string {
  const item = chartData.value[context.index]
  if (!item?.date)
    return 'No data available'
  const date = new Date(item.date)
  const timeAgo = useTimeAgo(date)
  return `${timeAgo.value}: ${item.count} new users`
}

// Header metrics
const totalUsers = computed(() => {
  if (!chartData.value.length)
    return '0'
  return chartData.value
    .reduce((sum, item) => sum + (item.count ?? 0), 0)
    .toLocaleString()
})

const growthRate = computed(() => {
  if (chartData.value.length < 2)
    return '0%'
  const last = chartData.value[chartData.value.length - 1]?.count ?? 0
  const secondLast = chartData.value[chartData.value.length - 2]?.count ?? 0
  if (secondLast === 0)
    return '0%'
  const rate = ((last - secondLast) / secondLast) * 100
  return `${rate.toFixed(1)}%`
})

const lastUpdate = computed(() => {
  if (!chartData.value.length)
    return 'N/A'
  const lastDate = new Date(chartData.value[chartData.value.length - 1]?.date ?? '')
  return lastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

// Chart categories
const categories: Record<string, BulletLegendItemInterface> = {
  count: { name: 'New Users', color: '#22c55e' },
}
</script>

<template>
  <div>
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

      <div v-if="isLoading" class="w-full h-[220px]">
        <Skeleton class="w-full h-full" />
      </div>
      <div v-else-if="error" class="text-red-500 text-center p-4">
        {{ error }}
      </div>
      <AreaChart
        v-else
        :data="chartData"
        :height="220"
        :categories="categories"
        :y-axis="['count']"
        :y-num-ticks="4"
        :y-grid-line="true"
        :curve-type="CurveType.Linear"
        :legend-position="LegendPosition.Top"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :tooltip-formatter="tooltipFormatter"
      />
    </Card>
  </div>
</template>
