<script setup lang="ts">
import type { ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { Search } from 'lucide-vue-next'
import { ComboboxInput, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <ComboboxInput v-bind="{ ...forwardedProps, ...$attrs }" auto-focus :class="cn(
      'placeholder:text-card-muted flex h-11 w-full rounded-md bg-transparent py-3 text-right text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )
      " />
    <Search class="ml-2 size-4 shrink-0 opacity-50" />
  </div>
</template>
