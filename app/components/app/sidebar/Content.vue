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
  {
    to: '/users',
    icon: 'icon-[mynaui--users-group]',
    label: 'Users',
  },
  {
    to: '/groups',
    icon: 'icon-[mdi--shield-account-outline]',
    label: 'Groups',
  },
  {
    to: '/products',
    icon: 'icon-[mage--box]',
    label: 'Products',
  },
  {
    to: '/categories',
    icon: 'icon-[mage--tag]',
    label: 'Categories',
  },
  {
    to: '/stockrecords',
    icon: 'icon-[mage--archive]',
    label: 'Stock Records',
  },
  {
    to: '/baskets',
    icon: 'icon-[mage--shopping-cart]',
    label: 'Baskets',
  },
  {
    to: '/orders',
    icon: 'icon-[carbon--cics-transaction-server-zos]',
    label: 'Orders',
  },
]
</script>

<template>
  <div class="flex flex-col flex-1 gap-1 overflow-y-auto overflow-x-hidden">
    <Link v-for="link in links" :key="link.to" :link />
  </div>
</template>
