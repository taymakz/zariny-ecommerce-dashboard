<script setup lang="ts">
import type { AlertDialogDescriptionProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { AlertDialogDescription } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<
  AlertDialogDescriptionProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn('text-card-muted text-sm', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
