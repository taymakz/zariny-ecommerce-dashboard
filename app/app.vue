<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { appDesktopStartMinWidth } from './constants'

const color = useColorMode()
const isDesktop = useMediaQuery(appDesktopStartMinWidth)
useHead({
  bodyAttrs: {
    class: 'overflow-hidden',
  },
})
const authStore = useAuthenticateStore()
authStore.SetUserDetail()
</script>

<template>
  <div vaul-drawer-wrapper>
    <NuxtLayout>
      <NuxtLoadingIndicator :size="3" />
      <AnimatePresence :initial="false">
        <Motion
          v-if="authStore.getInitLoading"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :initial="{ opacity: 0 }"
          class="bg-background fixed inset-0 z-50 flex items-center justify-center"
        >
          <LucideLoader2 class="text-brand size-10 animate-spin" />
        </Motion>
      </AnimatePresence>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
    <!-- Toast -->
    <div class="fixed z-60">
      <ClientOnly>
        <Toaster
          :theme="(color.value as 'dark') || 'light'"
          :position="!isDesktop ? 'top-center' : 'bottom-left'"
          close-button
          rich-colors
          :toast-options="{
            style: {
              padding: '24px 32px',
              fontSize: '14px',
              fontFamily: 'IRANYekan',
            },
            duration: 5000,
          }"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
