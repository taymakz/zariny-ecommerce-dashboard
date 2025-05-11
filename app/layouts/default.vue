<script setup lang="ts">
</script>

<template>
  <div class="flex h-svh w-full bg-background overflow-hidden">
    <AppSidebar />
    <main id="main" class="relative min-h-svh overflow-y-auto h-full bg-sc-background  rounded-s-4xl border-s  w-full grow">
      <div class="w-full ">
        <slot />
      </div>
    </main>
  </div>
</template>
