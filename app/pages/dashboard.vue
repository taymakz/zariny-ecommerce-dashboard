<script setup lang="ts">
import SalesOverview from '~/components/pages/dashboard/SalesOverview.vue'
import UsersGrowth from '~/components/pages/dashboard/UsersGrowth.vue'

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <div>
    <AppLayoutPageContent>
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6 pt-10">
        <div>
          <UsersGrowth />
        </div>
        <div>
          <SalesOverview />
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
