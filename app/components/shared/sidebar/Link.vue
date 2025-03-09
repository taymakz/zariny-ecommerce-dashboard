<script setup lang="ts">
import type { LinkType } from './index.vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const { link } = defineProps<{
  link: LinkType
  minimizeSidebar: boolean
}>()
const isCurrentRoute = computed(() => {
  return useRoute().path === link.link
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <NuxtLink :to="link.link" :class="cn(
          'text-foreground-muted hover:bg-secondary  hover:text-foreground relative flex w-full flex-col items-center justify-center gap-2 p-4 duration-200',
          {
            'text-foreground bg-secondary/40 hover:bg-secondary/40':
              isCurrentRoute,
          },
        )
          ">
          <Motion v-if="isCurrentRoute" layout-id="sidebar-link"
            class="bg-brand absolute inset-y-0 left-0 h-full w-0.5 rounded-full" />

          <div :class="link.icon" class="size-5" />
          <p v-if="!minimizeSidebar" class="text-[10px]">
            {{ link.title }}
          </p>
        </NuxtLink>
      </TooltipTrigger>

      <TooltipContent v-if="minimizeSidebar" side="left" hide-when-detached>
        <p>
          {{ link.title }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
