<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const minimizeSidebar = defineModel<boolean>({ required: true })
</script>

<template>
  <div
    class="bg-background z-20 flex h-8 items-center justify-between gap-2 border-t px-2"
  >
    <div class="flex gap-2">
      <div class="flex items-center justify-center">
        <TooltipProvider :delay-duration="0">
          <Tooltip>
            <TooltipTrigger>
              <button
                class="icon-[solar--sidebar-minimalistic-linear] text-foreground-muted hover:text-foreground block size-5 duration-200"
                @click="minimizeSidebar = !minimizeSidebar"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p class="font-sans text-xs">
                {{ minimizeSidebar ? "Maximize" : "Minimize" }} Sidebar
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>
