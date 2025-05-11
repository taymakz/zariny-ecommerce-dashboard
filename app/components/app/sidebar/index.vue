<script setup lang="ts">
import Content from './Content.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'

const authStore = useAuthenticateStore()
</script>

<template>
  <div class="h-svh w-80 bg-background p-4 flex flex-col overflow-hidden gap-4">
    <template v-if="authStore.isLogin">
      <Header />
      <Content />
      <Footer />
    </template>
    <template v-else>
      <div class="flex items-center justify-center h-full text-sm text-warning/60">
        Login
      </div>
    </template>
  </div>
</template>
