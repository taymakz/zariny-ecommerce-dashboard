<script setup lang="ts">
import type { Theme } from '~/types/theme'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const colorMode = useColorMode()

const backgroundThemes = [
  {
    value: 'system',
    label: 'System',
    icon: 'icon-[lucide--monitor]',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'icon-[lucide--moon]',
  },
  {
    value: 'light',
    label: 'Light',
    icon: 'icon-[lucide--sun]',
  },
]

function applyBackgroundTheme(value: string) {
  colorMode.preference = value
}

const backgroundThemeLabel = computed(() => {
  switch (colorMode.preference) {
    case 'system':
      return `System (${colorMode.value === 'dark' ? 'Dark' : 'Light'})`
    case 'dark':
      return 'Dark'
    default:
      return 'Light'
  }
})

const { setTheme, theme, themeClass } = useThemes()

const allColors: { color: Theme, label: string }[] = [
  { color: 'violet', label: 'Violet' },
  { color: 'indigo', label: 'Indigo' },
  { color: 'fuchsia', label: 'Fuchsia' },
  { color: 'pink', label: 'Pink' },
  { color: 'sky', label: 'Sky Blue' },
  { color: 'cyan', label: 'Turquoise' },
  { color: 'emerald', label: 'Emerald Green' },
  { color: 'emerald-hard', label: 'Dark Green' },
  { color: 'orange', label: 'Orange' },
  { color: 'red', label: 'Red' },
  { color: 'yellow', label: 'Yellow' },
  { color: 'lime', label: 'Lime' },
  { color: 'amber', label: 'Amber' },
]

function getColorName(colorValue: Theme): string {
  const found = allColors.find(item => item.color === colorValue)
  return found ? found.label : colorValue
}

watch(theme, () => {
  applyThemeClass()
})

function applyThemeClass() {
  document.body.classList.remove(
    ...allColors.map(color => `theme-${color.color}`),
  )
  document.body.classList.add(themeClass.value)
}

function applyAccentColor(colorValue: Theme) {
  setTheme(colorValue)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-1 p-8">
      <div class="space-y-1">
        <p class="text-lg font-semibold">
          Color
        </p>
        <p class="text-foreground-muted text-sm">
          Customize the website's colors
        </p>
      </div>
    </div>

    <div class="col-span-2 p-8">
      <!-- Background Theme -->
      <div class="mb-8">
        <div class="mb-4 space-y-1">
          <p>Background</p>
          <p class="text-sc-muted text-sm">
            {{ backgroundThemeLabel }}
          </p>
        </div>

        <div class="flex gap-1">
          <div v-for="item in backgroundThemes" :key="item.value">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <button :class="cn(
                    'flex items-center justify-center size-8 rounded-md text-sc-muted hover:text-sc-foreground cursor-pointer transition-all duration-200 ease-in-out',
                    {
                      'bg-brand/10 text-brand-lighter hover:text-brand-lighter': item.value === colorMode.preference,
                    },
                  )" @click="applyBackgroundTheme(item.value)">
                    <span :class="item.icon" class="size-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {{ item.label }}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <!-- Accent Color -->
      <div>
        <div class="mb-4 space-y-1">
          <p>Accent Color</p>
          <p class="text-sc-muted text-sm">
            {{ getColorName(theme) }}
          </p>
        </div>

        <div class="flex flex-wrap">
          <div v-for="color in allColors" :key="color.color">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <div class="flex items-center justify-center rounded-md size-8 duration-300" :class="[
                    `theme-${color.color}`,
                    {
                      'bg-brand-lighter/10 text-brand-lighter hover:text-brand-lighter': theme === color.color,
                    },
                  ]" @click="applyAccentColor(color.color)">
                    <div class="size-4.5 border-brand-lighter border flex items-center justify-center rounded-full">
                      <span v-show="theme === color.color" class="size-1 rounded-full bg-brand-lighter" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {{ color.label }}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
