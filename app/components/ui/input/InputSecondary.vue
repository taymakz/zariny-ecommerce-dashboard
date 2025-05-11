<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { useVModel } from '@vueuse/core'
import { useField } from 'vee-validate'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  label?: string
  inputClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  id?: string
  name?: string
  icon?: string
  iconClass?: HTMLAttributes['class']
  withErrorMessage?: boolean

}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
const id = props.id || useId()
const { errorMessage } = useField(props.name || id, undefined)
</script>

<template>
  <div>
    <div class="relative">
      <label :for="id" class="sr-only">
        {{ label }}
      </label>
      <input v-bind="$attrs" :id v-model="modelValue" :class="cn('block w-full appearance-none rounded-lg border  bg-transparent px-2.5 pb-2 pt-2 text-sm focus:border-border-lighter hover:border-border-lighter disabled:hover:border-border disabled:cursor-not-allowed focus:outline-none focus:ring-0 placeholder:text-left  placeholder:duration-200 focus:placeholder:translate-x-3', props.inputClass,
        [icon
          ? 'ps-9' : ''],
      )" :placeholder="label">
      <div v-if="icon"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center pointer-events-none">
        <i :class="cn('size-5 text-foreground-muted', [icon, iconClass])" />
      </div>
    </div>
    <p v-if="withErrorMessage" class="text-warning mt-3 h-5 text-sm">
      <span v-show="errorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>
