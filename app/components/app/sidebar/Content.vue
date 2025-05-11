<script setup lang="ts">
import Link from './link/index.vue'

export interface LinkType {
  to?: string
  icon: string
  label: string
  onlySuperUser?: boolean
  children?: (Omit<LinkType, 'to' | 'children' | 'icon'> & { to: string })[]
}

const links: LinkType[] = [
  {
    to: '/dashboard',
    icon: 'icon-[mage--dashboard-chart]',
    label: 'Dashboard',
  },
]
</script>

<template>
  <div class="flex flex-col flex-1 gap-1 overflow-y-auto overflow-x-hidden">
    <Link
      v-for="link in links"
      :key="link.to"
      :link
    />
  </div>
</template>
