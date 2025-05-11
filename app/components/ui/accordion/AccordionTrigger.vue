<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import {
  AccordionHeader,
  AccordionTrigger,

} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger data-slot="accordion-trigger" v-bind="delegatedProps" :class="cn(
      'flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-sm transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-90',
      props.class,
    )
      ">
      <slot />
      <slot name="icon">
        <ChevronRight
          class="text-foreground-muted pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
