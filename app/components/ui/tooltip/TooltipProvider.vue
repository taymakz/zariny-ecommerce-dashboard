<script setup lang="ts">
import type { TooltipProviderProps } from 'radix-vue'
import { TooltipProvider } from 'radix-vue'

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 100,
  disableHoverableContent: true,
})
</script>

<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>
