<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interface for API response
interface UsersCount {
  confirmed_users: number
  total: number
}

// Define interface for DonutChart labels
interface DonutLabel {
  color: string
  name: string
  value: number
}

// State management
const usersCount = ref<UsersCount | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch data from endpoint
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await ClientApi<UsersCount>('/admin/user-count')
    usersCount.value = response.data
  }
  catch (err) {
    error.value = 'Failed to load users count data'
    console.error('Failed to fetch users count data:', err)
  }
  finally {
    isLoading.value = false
  }
})

// Computed properties for DonutChart
const donutData = computed<DonutLabel[]>(() => {
  if (!usersCount.value)
    return []
  return [
    {
      color: '#22c55e',
      name: 'Confirmed Users',
      value: usersCount.value.confirmed_users,
    },
    {
      color: '#ef4444',
      name: 'Unconfirmed Users',
      value: usersCount.value.total - usersCount.value.confirmed_users,
    },
  ]
})

const confirmationRate = computed(() => {
  if (!usersCount.value || usersCount.value.total === 0)
    return '0%'
  const rate = (usersCount.value.confirmed_users / usersCount.value.total) * 100
  return `${rate.toFixed(1)}%`
})

const confirmedUsers = computed(() => {
  return (usersCount.value?.confirmed_users || '0').toLocaleString() ?? '0'
})

const totalUsers = computed(() => {
  return (usersCount.value?.total || '0').toLocaleString() ?? '0'
})

const lastUpdated = computed(() => {
  return useTimeAgo(new Date())
})
</script>

<template>
  <Card class="p-6 w-full text-sm">
    <div class="mb-4 flex justify-between border-b pb-4 gap-4 flex-col 2xl:flex-row">
      <div>
        <h2 class=" font-medium">
          User Confirmation Status
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-6 text-left ">
        <div>
          <p class="mb-1 text-card-muted">
            Confirmed Users
          </p>
          <p class="font-medium">
            {{ confirmedUsers }}
          </p>
        </div>
        <div>
          <p class="mb-1 text-card-muted">
            Total Users
          </p>
          <p class="font-medium">
            {{ totalUsers }}
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
      <DonutChart :data="donutData.map((i) => i.value)" :height="200" :labels="donutData" :hide-legend="true"
        :radius="0">
        <div class="absolute inset-0 flex items-center justify-center text-center flex-col text-sm">
          <div class="font-medium">
            Confirmation Rate
          </div>
          <div class="text-card-muted">
            {{ confirmationRate }}
          </div>
          <div class="text-sm text-card-muted">
            {{ lastUpdated }}
          </div>
        </div>
      </DonutChart>
    </div>
  </Card>
</template>
