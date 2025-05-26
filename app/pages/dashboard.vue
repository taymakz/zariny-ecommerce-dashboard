<script setup lang="ts">
import ProductsCount from '~/components/pages/dashboard/ProductsCount.vue'
import SalesOverview from '~/components/pages/dashboard/SalesOverview.vue'
import TopCategories from '~/components/pages/dashboard/TopCategories.vue'
import UsersCount from '~/components/pages/dashboard/UsersCount.vue'
import UsersGrowth from '~/components/pages/dashboard/UsersGrowth.vue'

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <div>
    <AppLayoutPageContent>
      <div class="grid grid-cols-2 gap-6 pt-6">
        <div class="col-span-2 2xl:col-span-1">
          <UsersGrowth />
        </div>
        <div class="col-span-2 2xl:col-span-1">
          <SalesOverview />
        </div>
        <div class="col-span-2 2xl:col-span-1">
          <TopCategories />
        </div>
        <div class="col-span-2 2xl:col-span-1">
          <div class="space-y-4">
            <UsersCount />
            <ProductsCount />
          </div>
        </div>

      </div>
    </AppLayoutPageContent>
  </div>
</template>
