<script setup lang="ts">
import type { LinkType } from '../Content.vue';


defineProps<{
  link: LinkType
}>()
const route = useRoute()
function isCurrentRoute(link: string) {
  if (link === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(link)
}

</script>

<template>
  <NuxtLink

    :to="link.to"
    :class="cn('px-2 py-2.5 rounded-md  flex items-center gap-3 duration-200',
               { 'bg-gradient-to-l from-primary/20 to-primary/5 dark:from-primary-lighter/20 dark:to-primary-lighter/5': isCurrentRoute(link.to!) },
               { 'hover:bg-secondary': !isCurrentRoute(link.to!) },
    )"
  >
    <i
      :class="cn('size-5.5 text-foreground-muted duration-200', link.icon,
                 { 'text-brand': isCurrentRoute(link.to!) },
      )"
    />
    <p
      :class="cn('text-sm text-foreground/80 duration-200',
                 { 'text-foreground': isCurrentRoute(link.to!) })"
    >
      {{ link.label }}
    </p>
  </NuxtLink>
</template>
