<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem v-bind="forwardedProps" :class="cn(
    'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
    inset && 'pl-8',
    props.class,
  )
    ">
    <slot />
  </DropdownMenuItem>
</template>
