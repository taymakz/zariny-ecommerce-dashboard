<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { InputVariants } from '.'

import { cn } from '@/utils/cn'
import { useField } from 'vee-validate'
import { inputVariants } from '.'

type RegexType = 'ONLY_DIGIT' | 'ONLY_ALPHABET' | 'ONLY_DIGIT_ALPHABET'

const props = withDefaults(
  defineProps<{
    defaultValue?: string | number
    class?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    variant?: InputVariants['variant']
    type?: HTMLInputElement['type']
    mode?: RegexType
    label?: string
    name?: string
    dir?: string
    iconPlacement?: 'right' | 'left'
    disabled?: boolean
    readonly?: boolean
    autofocus?: boolean
    withErrorMessage?: boolean
    withIcon?: boolean
    autocomplete?: 'on' | 'off'
  }>(),
  {
    type: 'text',
    variant: 'default',
    autocomplete: 'on',
  },
)
const emits = defineEmits([
  'input',
  'focus',
  'blur',
  'change',
  'focusin',
  'focusout',
  'keydown',
  'keyup',
  'click',
  'submit',
])
const inputRef = ref<HTMLInputElement | null>(null)

function blur() {
  inputRef.value?.blur()
}

defineExpose({
  blur,
})
const regexPatterns: Record<RegexType, RegExp> = {
  ONLY_DIGIT: /^\d*$/,
  ONLY_ALPHABET: /^[a-z]*$/i,
  ONLY_DIGIT_ALPHABET: /^[a-z0-9]*$/i,
}
const modelValue = defineModel<string | number>({ required: false })
const randomId = useId()

// Event handler to validate input based on mode
function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  const currentValue = input.value

  if (props.mode && regexPatterns[props.mode]) {
    const regex = regexPatterns[props.mode]
    if (!regex.test(currentValue)) {
      // Remove invalid characters
      input.value = currentValue.slice(0, -1)
    }
  }
}

const { errorMessage } = useField(props.name || randomId, undefined)
const passwordRevealed = ref(false)
</script>

<template>
  <div class="w-full">
    <div class="relative w-full">
      <!-- Reveal Password Eye icon  -->
      <span
        v-if="
          props.type === 'password'
            && ((modelValue && variant === 'floating-label')
              || variant === 'default')
        "
        :dir
        class="absolute inset-y-0 end-4 z-10 flex items-center justify-center"
      >
        <span
          class="text-foreground-muted flex cursor-pointer items-center justify-center"
          @click="passwordRevealed = !passwordRevealed"
        >
          <LucideEyeOff v-show="!passwordRevealed" :size="20" />
          <LucideEye v-show="passwordRevealed" :size="20" />
        </span>
      </span>
      <!-- Icon -->
      <div
        v-if="withIcon"
        :dir
        class="pointer-events-none absolute inset-y-0 z-10 flex items-center justify-center"
        :class="[
          { 'start-4': !iconPlacement },
          { 'right-4': iconPlacement === 'right' },
          { 'left-4': iconPlacement === 'left' },
        ]"
      >
        <span
          class="text-muted-foreground flex cursor-pointer items-center justify-center"
        >
          <slot name="icon" />
        </span>
      </div>
      <template v-if="variant === 'default'">
        <UiLabel :for="randomId" class="sr-only">
          {{ label }}
        </UiLabel>
        <input
          :id="randomId"
          ref="inputRef"
          v-model="modelValue"
          :name
          :dir
          :disabled
          :placeholder="label"
          :type="passwordRevealed ? 'text' : props.type"
          :class="
            cn(
              inputVariants({ variant }),
              props.class,
              { 'pe-12': props.type === 'password' },
              { 'ps-12': withIcon && !iconPlacement },
              { 'pr-12': withIcon && iconPlacement === 'right' },
              { 'pl-12': withIcon && iconPlacement === 'left' },
            )
          "
          :autocomplete
          @input="handleInput"
          @focus="emits('focus', $event)"
          @blur="emits('blur', $event)"
          @change="emits('change', $event)"
          @focusin="emits('focusin', $event)"
          @focusout="emits('focusout', $event)"
          @keydown="emits('keydown', $event)"
          @keyup="emits('keyup', $event)"
          @click="emits('click', $event)"
          @submit="emits('submit', $event)"
        >
      </template>
      <template v-else-if="variant === 'floating-label'">
        <label
          :dir="props.dir"
          :for="randomId"
          :class="cn(inputVariants({ variant }), props.class)"
        >
          <input
            :id="randomId"
            ref="inputRef"
            v-model="modelValue"
            :dir
            :name
            :type="passwordRevealed ? 'text' : props.type"
            class="peer"
            :class="[
              { '!pe-12': props.type === 'password' },
              { '!ps-12': withIcon && !iconPlacement },
              { '!pr-12': withIcon && iconPlacement === 'right' },
              { '!pl-12': withIcon && iconPlacement === 'left' },
            ]"
            :autocomplete
            placeholder=""
            :disabled
            @input="handleInput"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
            @change="emits('change', $event)"
            @focusin="emits('focusin', $event)"
            @focusout="emits('focusout', $event)"
            @keydown="emits('keydown', $event)"
            @keyup="emits('keyup', $event)"
            @click="emits('click', $event)"
            @submit="emits('submit', $event)"
          >
          <span
            :class="
              cn(
                'bg-background text-muted-foreground peer-focus:text-primary pointer-events-none absolute top-0 right-2.5 -translate-y-1/2 rounded-lg px-2 py-0.5 text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs',
                labelClass,
              )
            "
          >
            {{ label }}
          </span>
        </label>
      </template>
    </div>
    <p v-if="withErrorMessage" class="text-warning mt-3 h-5 text-sm">
      <span v-show="errorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>
