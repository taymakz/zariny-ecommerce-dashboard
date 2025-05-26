<script setup lang="ts">
import type { ProductType } from '~/types/product'
import { reactive } from 'vue'
import AppAppsProductsCard from '~/components/app/apps/products/Card.vue'
import AppAppsProductsCardSkeleton from '~/components/app/apps/products/CardSkeleton.vue'
import { usePaginatedData } from '~/composables/search'

const filters = reactive({})
const {
  dataList: products,
  isLoading,
  hasMore,
  error,
  firstInitLoading,
} = usePaginatedData<ProductType>(
  '/admin/products?ordering=-updated_at',
  filters,
  16,
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
        <!-- right -->
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
      <div class="grid grid-cols-4 2xl:grid-cols-5 gap-6">
        <template v-if="firstInitLoading">
          <AppAppsProductsCardSkeleton v-for="i in 12" :key="i" />
        </template>
        <template v-else>
          <template v-if="error">
            <div class="text-red-500 text-center py-8">
              {{ error }}
            </div>
          </template>
          <template v-else-if="products.length === 0">
            <div class="text-center py-8 text-muted-foreground">
              No products found.
            </div>
          </template>
          <template v-else>
            <AppAppsProductsCard v-for="product in products" :key="product.id" :item="product" />
            <template v-if="isLoading && products.length > 0">
              <AppAppsProductsCardSkeleton v-for="i in 3" :key="i" />
            </template>
          </template>
        </template>
      </div>
      <div v-if="!hasMore && products.length > 0" class="text-center text-muted-foreground py-4 text-xs">
        No more products to load.
      </div>
    </AppLayoutPageContent>
  </div>
</template>
