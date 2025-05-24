<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for type safety
interface AreaChartItem {
  date: string
  count: number // Normal period
  prevCount: number // Previous month
}

interface BulletLegendItemInterface {
  name: string
  color: string
}

// State management
const chartData = ref<AreaChartItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Calculate date ranges dynamically
const today = new Date() // Current date, e.g., 2025-05-22
const normalStart = new Date(today)
normalStart.setDate(today.getDate() - 30) // 30 days ago
const normalEnd = today // Today
const prevStart = new Date(today)
prevStart.setDate(today.getDate() - 60) // 60 days ago
const prevEnd = new Date(today)
prevEnd.setDate(today.getDate() - 30) // 30 days ago

// Format dates as YYYY-MM-DD for API
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] // e.g., 2025-04-23
}

// Format dates for display (e.g., "Apr 23, 2025")
const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Dynamic categories
const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  count: {
    name: `Normal Period (${formatDisplayDate(normalStart)} - ${formatDisplayDate(normalEnd)})`,
    color: '#22c55e',
  },
  prevCount: {
    name: `Previous Month (${formatDisplayDate(prevStart)} - ${formatDisplayDate(prevEnd)})`,
    color: '#3b82f6',
  },
}))

// Fetch data for both periods
onMounted(async () => {
  try {
    isLoading.value = true
    // Fetch normal period (last 30 days)
    const resNormal = await ClientApi<AreaChartItem[]>(
      `/admin/user-growth/?start_date=${formatDate(normalStart)}&end_date=${formatDate(normalEnd)}`
    )
    // Fetch previous month (60 to 30 days ago)
    const resPrev = await ClientApi<AreaChartItem[]>(
      `/admin/user-growth/?start_date=${formatDate(prevStart)}&end_date=${formatDate(prevEnd)}`
    )
    // Combine data, assuming both responses cover 30 days
    chartData.value = resNormal.data.map((item, index) => ({
      date: item.date,
      count: item.count,
      prevCount: resPrev.data[index]?.count ?? 0,
    }))
  } catch (err) {
    error.value = 'Failed to load user growth data'
    console.error('Failed to fetch user growth data:', err)
  } finally {
    isLoading.value = false
  }
})

// X-axis formatter (use day index for alignment)
function xFormatter(i: number): string {
  return `Day ${i + 1}`
}

// Y-axis formatter
function yFormatter(value: number): string {
  return value.toLocaleString()
}

// Tooltip formatter
function tooltipFormatter(context: { index: number; datasetIndex: number }): string {
  const item = chartData.value[context.index]
  if (!item?.date) return 'No data available'
  const date = new Date(item.date)
  const timeAgo = useTimeAgo(date)
  const datasetLabel = context.datasetIndex === 0 ? 'Normal Period' : 'Previous Month'
  const count = context.datasetIndex === 0 ? item.count : item.prevCount
  return `${datasetLabel} (${timeAgo.value}): ${count} new users`
}

// Header metrics for normal period
const totalUsers = computed(() => {
  if (!chartData.value.length) return '0'
  return chartData.value
    .reduce((sum, item) => sum + (item.count ?? 0), 0)
    .toLocaleString()
})

const growthRate = computed(() => {
  if (chartData.value.length < 2) return '0%'
  const last = chartData.value[chartData.value.length - 1]?.count ?? 0
  const secondLast = chartData.value[chartData.value.length - 2]?.count ?? 0
  if (secondLast === 0) return '0%'
  const rate = ((last - secondLast) / secondLast) * 100
  return `${rate.toFixed(1)}%`
})

const lastUpdate = computed(() => {
  if (!chartData.value.length) return 'N/A'
  const lastDate = new Date(chartData.value[chartData.value.length - 1]?.date ?? '')
  return lastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

// Header metrics for previous month
const totalUsersPrev = computed(() => {
  if (!chartData.value.length) return '0'
  return chartData.value
    .reduce((sum, item) => sum + (item.prevCount ?? 0), 0)
    .toLocaleString()
})

const growthRatePrev = computed(() => {
  if (chartData.value.length < 2) return '0%'
  const last = chartData.value[chartData.value.length - 1]?.prevCount ?? 0
  const secondLast = chartData.value[chartData.value.length - 2]?.prevCount ?? 0
  if (secondLast === 0) return '0%'
  const rate = ((last - secondLast) / secondLast) * 100
  return `${rate.toFixed(1)}%`
})

const lastUpdatePrev = computed(() => {
  if (!chartData.value.length) return 'N/A'
  const lastDate = new Date(chartData.value[chartData.value.length - 1]?.date ?? '')
  lastDate.setDate(lastDate.getDate() - 30) // Adjust for previous month
  return lastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>

<template>
  <div>
    <Card class="p-6 text-sm">
      <div class="mb-4 flex  justify-between border-b pb-4">
        <div>
          <h2 class=" font-medium">User Growth Monitoring</h2>
        </div>
        <div class="grid grid-cols-3 gap-6  ">
          <div>
            <p class="mb-1 text-card-muted">Total Users (Normal)</p>
            <p class="font-medium">{{ totalUsers }}</p>
          </div>
          <div>
            <p class="mb-1 text-card-muted">Growth Rate (Normal)</p>
            <p class="font-medium">{{ growthRate }}</p>
          </div>
          <div>
            <p class="mb-1 text-card-muted">Last Update (Normal)</p>
            <p class="font-medium">{{ useTimeAgo(new Date(lastUpdate)) }}</p>
          </div>
          <div>
            <p class="mb-1 text-card-muted">Total Users (Prev)</p>
            <p class="font-medium">{{ totalUsersPrev }}</p>
          </div>
          <div>
            <p class="mb-1 text-card-muted">Growth Rate (Prev)</p>
            <p class="font-medium">{{ growthRatePrev }}</p>
          </div>
          <div>
            <p class="mb-1 text-card-muted">Last Update (Prev)</p>
            <p class="font-medium">{{ useTimeAgo(new Date(lastUpdatePrev)) }}</p>
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
        :y-axis="['count', 'prevCount']"
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
