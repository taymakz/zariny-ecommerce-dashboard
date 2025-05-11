import type { Theme } from '~/types/theme'

export function useThemes() {
  const config = useCookie<Theme>('color-theme', {
    default: () => 'violet',
  })

  const theme = computed(() => config.value)

  const themeClass = computed(() => `theme-${theme.value}`)

  function setTheme(themeName: Theme) {
    config.value = themeName
  }

  return {
    themeClass,
    theme,
    setTheme,
  }
}
