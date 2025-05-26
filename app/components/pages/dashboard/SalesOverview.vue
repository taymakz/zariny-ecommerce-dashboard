<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for type safety
interface AreaChartItem {
  date: string
  total: number // Normal period
  prevTotal: number // Previous month
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
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] // e.g., 2025-04-23
}

// Format dates for display (e.g., "Apr 23, 2025")
function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Dynamic categories
const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  total: {
    name: `Normal Period (${formatDisplayDate(normalStart)} - ${formatDisplayDate(normalEnd)})`,
    color: '#22c55e',
  },
  prevTotal: {
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
      `/admin/sales-overview/?start_date=${formatDate(normalStart)}&end_date=${formatDate(normalEnd)}`,
    )
    // Fetch previous month (60 to 30 days ago)
    const resPrev = await ClientApi<AreaChartItem[]>(
      `/admin/sales-overview/?start_date=${formatDate(prevStart)}&end_date=${formatDate(prevEnd)}`,
    )
    // Combine data, assuming both responses cover 30 days
    chartData.value = resNormal.data.map((item, index) => ({
      date: item.date,
      total: Number(item.total) || 0,
      prevTotal: Number(resPrev.data[index]?.total) || 0,
    }))
  }
  catch (err) {
    error.value = 'Failed to load sales data'
    console.error('Failed to fetch sales data:', err)
  }
  finally {
    isLoading.value = false
  }
})

// X-axis formatter (use day index for alignment)
function xFormatter(i: number): string {
  return `Day ${i + 1}`
}

// Y-axis formatter (format as currency)
function yFormatter(value: number): string {
  return `$${value.toLocaleString()}`
}

// Tooltip formatter
function tooltipFormatter(context: { index: number, datasetIndex: number }): string {
  const item = chartData.value[context.index]
  if (!item?.date)
    return 'No data available'
  const date = new Date(item.date)
  const timeAgo = useTimeAgo(date)
  const datasetLabel = context.datasetIndex === 0 ? 'Normal Period' : 'Previous Month'
  const total = context.datasetIndex === 0 ? Number(item.total) || 0 : Number(item.prevTotal) || 0
  return `${datasetLabel} (${timeAgo.value}): $${total.toLocaleString()} in sales`
}
</script>

<template>
  <div>
    <Card class="p-6">
      <div>
        <h2 class="text-card-muted font-semibold">
          Sales Overview
        </h2>

        <div v-if="isLoading" class="mt-4 border-t border-neutral-800 py-4">
          <Skeleton class="w-full h-[276px]" />
        </div>
        <div v-else-if="error" class="mt-4 border-t border-neutral-800 py-4 text-red-500 text-center">
          {{ error }}
        </div>
        <div v-else class="mt-4 border-t border-neutral-800 py-4">
          <AreaChart :data="chartData" :height="220" :categories="categories" :y-axis="['total', 'prevTotal']"
            :y-num-ticks="4" :y-grid-line="true" :curve-type="CurveType.Linear" :legend-position="LegendPosition.Top"
            :x-formatter="xFormatter" :y-formatter="yFormatter" :tooltip-formatter="tooltipFormatter" />
        </div>
      </div>
    </Card>
  </div>
</template>
