<script setup lang="ts">
import type { SelectGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { SelectGroup } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<
  SelectGroupProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectGroup :class="cn('w-full p-1', props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>
