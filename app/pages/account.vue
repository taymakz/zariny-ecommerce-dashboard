<script setup lang="ts">
useHead({
  title: 'Account',
})
</script>

<template>
  <div>
    <AppLayoutPageContent>
      <div class="space-y-4 divide-y">
        <PagesAccountAuth />
        <PagesAccountTheme />
      </div>
    </AppLayoutPageContent>
  </div>
</template>
