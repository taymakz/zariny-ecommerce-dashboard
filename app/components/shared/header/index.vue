<script setup lang="ts"></script>

<template>
  <div class="bg-background flex h-12 items-center justify-between border-b px-2">
    <NuxtLink to="/" class="font-condesed hover:bg-secondary rounded-md px-4 py-1 text-sm duration-200 2xl:text-base">
      Admin Panel
    </NuxtLink>
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
