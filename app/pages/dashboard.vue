<script setup lang="ts">
import SalesOverview from '~/components/pages/dashboard/SalesOverview.vue'
import TopCategories from '~/components/pages/dashboard/TopCategories.vue'
import UsersGrowth from '~/components/pages/dashboard/UsersGrowth.vue'

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <div>
    <AppLayoutPageContent>
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6 pt-10">
        <div class="col-span-2 2xl:col-span-1">
          <UsersGrowth />
        </div>
        <div class="col-span-2 2xl:col-span-1">
          <SalesOverview />
        </div>
        <div class="col-span-2">
          <TopCategories />
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
