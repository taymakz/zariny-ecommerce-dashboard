<script setup lang="ts">
import type { LinkType } from '../Content.vue'
import Nested from './Nested.vue'
import Single from './Single.vue'

const { link } = defineProps<{
  link: LinkType
}>()
const authStore = useAuthenticateStore()

function haveAccess() {
  if (!link.onlySuperUser)
    return true
  if (authStore.isSuperuser)
    return true
  return false
}
</script>

<template>
  <div v-if="haveAccess()">
    <Single v-if="!link.children" :link />
    <Nested v-else :link />
  </div>
</template>
