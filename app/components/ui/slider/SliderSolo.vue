<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<
  SliderRootProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const model = defineModel<number>('value', { required: true })
// Convert single number model to array for SliderRoot
const modelArray = computed({
  get: () => [model.value], // Wrap in array
  set: ([val]) => {
    if (val !== undefined)
      model.value = val // Update model when array changes
  },
})
</script>

<template>
  <SliderRoot v-bind="forwarded" v-model="modelArray" :class="cn(
    'relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col',
    props.class,
  )
    ">
    <SliderTrack
      class="bg-secondary relative h-1.5 w-full grow overflow-hidden rounded-full data-[orientation=vertical]:w-2">
      <SliderRange class="bg-brand absolute h-full rounded-full data-[orientation=vertical]:w-full" />
    </SliderTrack>
    <SliderThumb
      class="border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>
