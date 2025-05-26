<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Badge from '~/components/ui/badge/Badge.vue'

const authStore = useAuthenticateStore()
const email = authStore.getUserEmail

const route = useRoute()

const isCurrentRoute = computed(() => route.path === '/account')
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="border-t" />
    <p class="text-xs text-foreground-muted text-center">
      Logged in as
    </p>
    <NuxtLink to="/account" :class="cn('flex items-center gap-2 p-1 hover:bg-secondary rounded-md duration-200',
      { 'bg-gradient-to-l hover:bg-gradient-to-l from-primary/20 to-primary/5 dark:from-primary-lighter/20 dark:to-primary-lighter/5': isCurrentRoute },
    )">
      <!-- <Single v-for="link in links" :key="link.to" :link /> -->
      <Avatar class="bg-background size-12 border  text-2xl z-10 relative">
        <AvatarFallback class="text-card-muted text-xs">
         <i class="icon-[lucide--user] size-6"></i>
        </AvatarFallback>
      </Avatar>
      <div class="space-y-0.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <p class="text-xs line-clamp-1 text-foreground/80 upper">
                {{ email }}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {{ email }}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge class="text-xs">
          {{ capitalizeFirstLetter(authStore.getUserRole || '') }}
        </Badge>
      </div>
    </NuxtLink>
  </div>
</template>
