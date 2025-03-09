<script setup lang="ts">
import Link from './Link.vue'

defineProps<{
  minimizeSidebar: boolean
}>()
export interface LinkType {
  icon: string
  title: string
  link: string
}
const links: LinkType[] = [
  { title: 'Dashboard', icon: 'icon-[mage--dashboard-2]', link: '/dashboard' },
  {
    title: 'Account',
    icon: 'icon-[clarity--administrator-line]',
    link: '/auth',
  },
]
</script>

<template>
  <div :class="cn('bg-background flex flex-col border-r duration-100', [
    minimizeSidebar ? 'w-12' : 'w-20',
  ])
    ">
    <Link v-for="(link, index) in links" :key="index" :link :minimize-sidebar />
  </div>
</template>
