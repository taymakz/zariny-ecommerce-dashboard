<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<
  SwitchRootProps & { class?: HTMLAttributes['class'] }
>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot v-bind="forwarded" :class="cn(
    'peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-brand data-[state=unchecked]:bg-card inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  )
    ">
    <SwitchThumb :class="cn(
      'bg-background pointer-events-none block h-5 w-5 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:ltr:translate-x-5 data-[state=unchecked]:ltr:translate-x-0 data-[state=unchecked]:rtl:-translate-x-5 [state=checked]:rtl:translate-x-0',
    )
      " />
  </SwitchRoot>
</template>
