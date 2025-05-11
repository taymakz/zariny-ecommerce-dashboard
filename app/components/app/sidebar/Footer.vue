<script setup lang="ts">
import Single from './link/Single.vue'

const links = [

  {
    to: '/account',
    icon: 'icon-[clarity--administrator-line]',
    label: 'Account',
  },
]
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="border-t" />

    <Single v-for="link in links" :key="link.to" :link />
  </div>
</template>
