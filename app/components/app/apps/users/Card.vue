<script setup lang="ts">
import type { UsersType } from '~/types/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Badge from '~/components/ui/badge/Badge.vue'
import Card from '~/components/ui/card/Card.vue'

const props = defineProps<{
  item: UsersType
}>()
const last_login = computed(() => useTimeAgo(props.item.last_login))
</script>

<template>
  <Card class="group relative p-4 hover:border-border-lighter duration-200">
    <!-- profile -->
    <div>
      <div class="flex items-center gap-4 mb-3 ">
        <Avatar class="bg-background size-20 border-3  text-2xl z-10 relative">
          <AvatarFallback class="text-card-muted text-xs">
            <i class="icon-[lucide--user] size-10"></i>
          </AvatarFallback>
        </Avatar>
        <div class="z-10 relative ">
          <div class="flex gap-2 mb-1 items-center">
            <p class="text-card-muted text-xs font-sans">
              {{ item.pk }}
            </p>
            <Badge v-if="item.is_staff" variant="success">
              Staff
            </Badge>
            <Badge v-if="!item.is_active" variant="warning">
              Deactive
            </Badge>
          </div>
          <div class="mb-1 line-clamp-1">
            {{ item.email }}
          </div>
        </div>
      </div>

      <NuxtLink :to="`/users/${item.pk}`" class="absolute inset-0" />
      <div class="text-xs text-card-muted items-center">
        <p>
          Last login {{ last_login }}
        </p>
      </div>
    </div>
  </Card>
</template>
