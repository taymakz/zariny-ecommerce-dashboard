<script setup lang="ts">
import UsersGrowth from '~/components/pages/dashboard/UsersGrowth.vue'
import UsersGrowth2 from '~/components/pages/dashboard/UsersGrowth2.vue';

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <div>
    <AppLayoutPageContent>
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6 pt-10">
        <div class="col-span-2">
          <UsersGrowth />
        </div>
        <div class="col-span-2">
          <UsersGrowth2 />
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
