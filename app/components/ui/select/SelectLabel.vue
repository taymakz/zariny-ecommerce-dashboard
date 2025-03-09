<script setup lang="ts">
import type { SelectLabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { SelectLabel } from 'radix-vue'

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <SelectLabel
    :class="
      cn('py-1.5 pr-2 pl-2 text-right text-sm font-semibold', props.class)
    "
  >
    <slot />
  </SelectLabel>
</template>
