<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Button from '~/components/ui/button/Button.vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interfaces for type safety
interface BarChartItem {
  name: string
  total: number
}

// State management
const chartData = ref<BarChartItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const categories = {
  total: { name: 'Total Quantity Sold' },
}

// Fetch data for top categories
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await ClientApi<BarChartItem[]>('/admin/top-categories/')
    chartData.value = response.data
      .sort((a, b) => a.total - b.total)
      .slice(0, 5)
  }
  catch (err) {
    error.value = 'Failed to load top categories data'
    console.error('Failed to fetch top categories data:', err)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Card class="p-6">
    <div>
      <h2 class="text-card-muted font-semibold">
        Top Selling Categories
      </h2>

      <div v-if="isLoading" class="mt-4 border-y border-neutral-800 py-4">
        <Skeleton class="w-full h-[316px]" />
      </div>
      <div v-else-if="error" class="mt-4 border-y border-neutral-800 py-4 text-red-500 text-center">
        {{ error }}
      </div>
      <div v-else class="mt-4 border-y border-neutral-800 py-4">
        <BarChart :data="chartData" :height="260" x-axis="name" :y-axis="['total']" :radius="10"
          :y-formatter="(i) => chartData[i].name" :categories="categories" :legend-position="LegendPosition.Top"
          :orientation="Orientation.Horizontal" />
      </div>
    </div>
  </Card>
</template>
