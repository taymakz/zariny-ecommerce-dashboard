<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h1 :class="cn('font-medium text-lg', $props.class)">
    <slot />
  </h1>
</template>
