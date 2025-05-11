<script setup lang="ts">
import OnlineUsers from './OnlineUsers.vue'
</script>

<template>
  <!-- Header -->
  <div class="mb-4">
    <div class="flex items-center gap-4 px-2 mb-6">
      <img src="/logo.png" alt="Logo" class="size-8  ">

      <div class="flex flex-col items-start gap-1.5">
        <p
          class="bg-gradient-to-bl from-neutral-400 to-neutral-800 dark:from-neutral-300 dark:to-neutral-200 text-sm text-transparent bg-clip-text font-medium">
          Ecommerce Admin Panel
        </p>

        <OnlineUsers />
      </div>
    </div>
    <div class="flex gap-4">
      <NuxtLink to="https://github.com/zariny/ecommerce" external target="_blank"
        class="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground duration-200 uppercase font-mono">
        <i class="icon-[lucide--github] size-4" />
        Backend
      </NuxtLink>
      <NuxtLink to="https://github.com/zariny/ecommerce" external target="_blank"
        class="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground duration-200 uppercase font-mono">
        <i class="icon-[lucide--github] size-4" />
        Admin
      </NuxtLink>
    </div>
  </div>
</template>
