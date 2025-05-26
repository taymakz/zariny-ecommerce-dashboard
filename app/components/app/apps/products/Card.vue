<script setup lang="ts">
import type { ProductType } from '~/types/product'
import Badge from '~/components/ui/badge/Badge.vue'
import Card from '~/components/ui/card/Card.vue'

const props = defineProps<{
  item: ProductType
}>()

function getImage(): string {
  return props.item.first_image ? getImageUrl(props.item.first_image.image) : '/images/product/default.png'
}
</script>

<template>
  <Card class="p-0 overflow-hidden relative hover:border-border-lighter duration-300">
    <NuxtLink :to="`/products/${item.id}`" class="absolute inset-0"/>
    <div>
      <!-- image -->
      <div class="w-full h-60 2xl:h-70 bg-secondary-lighter p-4">
        <img :src="getImage()" :alt="item.title" class="rounded-lg w-full h-full object-cover border bg-card">
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <p class="text-xs text-card-muted ">
            # {{ item.id }}
          </p>
          <Badge v-if="item.is_public" variant="success">
            Public
          </Badge>
        </div>
        <p class="mb-4 text-xs text-card-muted">
         Last modify {{ useTimeAgo(item.updated_at) }}
        </p>
        <div class="text-sm  line-clamp-2 h-10 mb-1">
          {{ item.title }}
        </div>
      </div>
    </div>
  </Card>
</template>
