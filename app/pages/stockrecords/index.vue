<script setup lang="ts">
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[
          { text: 'stock-records' },
        ]" />
      </div>
      <div class="flex items-center justify-between">
        <!-- right -->
        <div>
          <AppLayoutPageTitle>
            Stock Records
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            Track inventory movements and stock history
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center space-y-4">
          <div class="text-6xl">
            📊
          </div>
          <h2 class="text-2xl font-semibold text-muted-foreground">
            Stock Records
          </h2>
          <p class="text-muted-foreground">
            This page is currently in development
          </p>
          <div class="text-sm text-muted-foreground">
            Features coming soon: Stock movements, inventory tracking, audit trails
          </div>
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
