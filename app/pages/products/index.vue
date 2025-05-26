<script setup lang="ts">
import type { ProductType } from '~/types/product'
import { watchDebounced } from '@vueuse/core'
import { motion } from 'motion-v'
import { reactive, ref, watch } from 'vue'
import AppAppsProductsCard from '~/components/app/apps/products/Card.vue'
import AppAppsProductsCardSkeleton from '~/components/app/apps/products/CardSkeleton.vue'
import Button from '~/components/ui/button/Button.vue'
import InputSecondary from '~/components/ui/input/InputSecondary.vue'
import Popover from '~/components/ui/popover/Popover.vue'
import PopoverContent from '~/components/ui/popover/PopoverContent.vue'
import PopoverTrigger from '~/components/ui/popover/PopoverTrigger.vue'
import { usePaginatedData } from '~/composables/search'
import CardSkeleton from '~/components/app/apps/products/CardSkeleton.vue'

const sortOptions = [
  { label: 'Newest', value: '-updated_at' },
  { label: 'Oldest', value: 'updated_at' },
  { label: 'Created (Newest)', value: '-created_at' },
  { label: 'Created (Oldest)', value: 'created_at' },
]

const filters = reactive({
  search: '',
  ordering: '-updated_at',
})
const searchValue = ref('')
const sortValue = ref('-updated_at')
const showSort = ref(false)

watchDebounced(
  searchValue,
  () => {
    filters.search = searchValue.value || ''
  },
  { debounce: 500, maxWait: 1000 },
)
watch(sortValue, (val) => {
  filters.ordering = val
})

const {
  dataList: products,
  isLoading,
  hasMore,
  firstInitLoading,
} = usePaginatedData<ProductType>(
  '/admin/products',
  filters,
  20,
  { scrollContainer: document.getElementById('main'), autoLoadOnMount: true },
)
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[{ text: 'products' }]" />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <AppLayoutPageTitle>
            Products Management
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            Manage product inventory, pricing, and details
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <!-- Filters -->
      <div class="flex items-center justify-between mb-10">
        <div class="flex gap-2 w-full justify-between">
          <InputSecondary v-model="searchValue" label="Search..." autocomplete="off" class="max-w-sm w-full"
            icon="icon-[ep--search]" />
          <Popover v-model:open="showSort">
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-[180px] flex items-center justify-between">
                <span class="truncate">{{sortOptions.find(o => o.value === sortValue)?.label || 'Sort'}}</span>
                <span class="icon-[lucide--chevron-down] ml-2 text-base" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="max-w-[200px] p-0">
              <div class="flex flex-col">
                <button v-for="option in sortOptions" :key="option.value"
                  class="px-4 py-2 text-sm text-left hover:bg-secondary-lighter  w-full"
                  :class="{ 'font-semibold text-brand': sortValue === option.value }"
                  @click="sortValue = option.value; showSort = false">
                  {{ option.label }}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <!-- Result -->
      <div class="grid grid-cols-4 2xl:grid-cols-5 gap-6 ">
        <template v-if="firstInitLoading">
          <CardSkeleton v-for="i in 10" :key="i"  />
        </template>
        <template v-else>
          <AnimatePresence>
            <motion.div v-for="item in products" :key="item.id" layout>
              <AppAppsProductsCard :item />
            </motion.div>
          </AnimatePresence>

          <template v-if="isLoading">
            <CardSkeleton v-for="i in 10" :key="i"  />
          </template>
        </template>
      </div>
      <!-- empty message -->
      <template v-if="!isLoading && products.length === 0">
        <AppLayoutEmptyMessage />
      </template>
      <div v-if="!hasMore && products.length > 0" class="text-center text-foreground-muted py-4 text-xs">
        No more products to load.
      </div>
    </AppLayoutPageContent>
  </div>
</template>
