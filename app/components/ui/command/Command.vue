<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(),
  {
    open: true,
    modelValue: '',
  },
)

const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxRoot v-bind="forwarded" :class="cn(
    'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
    props.class,
  )
    ">
    <slot />
  </ComboboxRoot>
</template>
