<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Button from '~/components/ui/button/Button.vue'
import Card from '~/components/ui/card/Card.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

// Define interface for API response
interface UsersCount {
  confirmed_users: number
  total: number
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

// Computed properties for the new design
const confirmationProgress = computed(() => {
  if (!usersCount.value || usersCount.value.total === 0)
    return 0
  return (usersCount.value.confirmed_users / usersCount.value.total) * 100
})

const confirmedUsers = computed(() => {
  return Number(usersCount.value?.confirmed_users || 0).toLocaleString()
})

const totalUsers = computed(() => {
  return Number(usersCount.value?.total || 0).toLocaleString()
})

const confirmationRate = computed(() => {
  if (!usersCount.value || usersCount.value.total === 0)
    return '0%'
  return `${confirmationProgress.value.toFixed(0)}%`
})

const progressBarColor = computed(() => {
  const progress = confirmationProgress.value
  if (progress >= 0 && progress < 20)
    return 'bg-warning'
  if (progress >= 20 && progress < 40)
    return 'bg-alert'
  if (progress >= 40 && progress < 60)
    return 'bg-info'
  if (progress >= 60)
    return 'bg-success'
  return 'bg-brand' // fallback
})
</script>

<template>
  <div>
    <Card class="p-6">
      <div>
        <h2 class="text-card-muted font-semibold">
          User Confirmation Status
        </h2>

        <div v-if="isLoading" class="mt-4 border-t border-neutral-800 py-4">
          <Skeleton class="w-full h-[88px]" />
        </div>
        <div v-else-if="error" class="mt-4 border-t border-neutral-800 py-4 text-red-500 text-center">
          {{ error }}
        </div>
        <div v-else class="mt-4 border-t border-neutral-800 py-4">
          <div class="space-y-4">
            <div class="space-y-1">
              <h3 class="text-xl font-semibold">
                {{ confirmedUsers }}
              </h3>
            </div>
            <div class="flex items-center justify-between text-sm font-medium text-card-muted">
              <div>{{ confirmationRate }}</div>
              <div>{{ confirmedUsers }} of {{ totalUsers }}</div>
            </div>
            <div class="h-2 rounded-full bg-neutral-100 dark:bg-white/5">
              <div class="h-full rounded-full duration-500" :class="progressBarColor"
                :style="`width: ${confirmationProgress}%;`" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
