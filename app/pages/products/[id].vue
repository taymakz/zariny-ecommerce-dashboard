<script setup lang="ts">
const route = useRoute()
const productId = route.params.id
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[
          { text: 'products', href: '/products' },
          { text: `product #${productId}` },
        ]" />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <AppLayoutPageTitle>
            Product Details
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            View and manage product information
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center space-y-4">
          <div class="text-6xl">
            📦
          </div>
          <h2 class="text-2xl font-semibold text-muted-foreground">
            Product Details
          </h2>
          <p class="text-muted-foreground">
            This page is currently in development
          </p>
          <div class="text-sm text-muted-foreground">
            Features coming soon: Product info, stock, pricing, images, activity log
          </div>
          <div class="text-xs text-muted-foreground mt-4">
            Product ID: {{ productId }}
          </div>
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
