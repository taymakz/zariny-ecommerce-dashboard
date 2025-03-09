<script setup lang="ts">
import { useStorage } from '@vueuse/core'
// use to minimize or maximize width Sidebar
const minimizeSidebar = useStorage('sidebar-mode', false)
</script>

<template>
  <div class="flex h-screen flex-col">
    <SharedHeader />
    <div class="grow">
      <div class="flex h-full">
        <SharedSidebar :minimize-sidebar />
        <div class="w-full">
          <slot />
        </div>
      </div>
    </div>
    <SharedFooter v-model="minimizeSidebar" />
  </div>
</template>
