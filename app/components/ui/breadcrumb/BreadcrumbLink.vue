<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { Primitive } from 'reka-ui'

const props = withDefaults(
  defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'a',
  },
)
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('hover:text-foreground transition-colors', props.class)">
    <slot />
  </Primitive>
</template>
