<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { DialogTitle, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle v-bind="forwardedProps" :class="cn('text-lg leading-none font-medium', props.class)">
    <slot />
  </DialogTitle>
</template>
