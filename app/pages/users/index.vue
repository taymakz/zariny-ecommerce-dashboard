<script setup lang="ts">
import type { UsersType } from '~/types/user'
import { motion } from 'motion-v'
import Button from '~/components/ui/button/Button.vue'
import InputSecondary from '~/components/ui/input/InputSecondary.vue'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

useHead({
  title: 'Users',
})
const filters = reactive<{
  search: string
}>({
  search: '',
})
const searchValue = ref('')

watchDebounced(
  searchValue,
  () => {
    filters.search = searchValue.value || ''
  },
  { debounce: 500, maxWait: 1000 },
)

const {
  dataList: users,
  isLoading,
  firstInitLoading,
  refresh,
} = usePaginatedData<UsersType>('admin/users', filters, 24, {
  scrollContainer: document.getElementById('main'),
  autoLoadOnMount: true,
})

let intervalId: NodeJS.Timeout | null = null
const autoUpdate = ref(false)
watch(autoUpdate, (newVal) => {
  if (newVal) {
    // Start interval
    intervalId = setInterval(() => {
      refresh()
    }, 40000)
  }
  else {
    // Clear interval
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
})

// Clear interval on unmount (in case it's still running)
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[{ text: 'users' }]" />
      </div>
      <div class="flex items-center justify-between">
        <!-- right -->
        <div>
          <AppLayoutPageTitle>
            Users Management
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            List, Edit and Details
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <!-- Filters -->
      <div class="flex items-center justify-between  mb-10">
        <InputSecondary v-model="searchValue" label="Search..." autocomplete="off" class="max-w-sm w-full"
          icon="icon-[ep--search]" />

        <div class="flex gap-2">
          <Button :variant="autoUpdate ? 'success' : 'outline'" class="border" @click="autoUpdate = !autoUpdate">
            Auto refresh
          </Button>
          <!-- <Filters v-model="filters.type" /> -->
        </div>
      </div>
      <!-- Result -->
      <div class="grid grid-cols-2 2xl:grid-cols-3 gap-6 ">
        <template v-if="firstInitLoading">
          <Skeleton v-for="i in 12" :key="i" class="h-35" />
        </template>
        <template v-else>
          <AnimatePresence>
            <motion.div v-for="item in users" :key="item.pk" layout>
              <AppAppsUsersCard :item />
            </motion.div>
          </AnimatePresence>

          <template v-if="isLoading">
            <Skeleton v-for="i in 3" :key="i" class="h-35" />
          </template>
        </template>
      </div>
      <!-- empty message -->
      <template v-if="!isLoading && users.length === 0">
        <AppLayoutEmptyMessage />
      </template>
    </AppLayoutPageContent>
  </div>
</template>
