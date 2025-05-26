<script setup lang="ts">
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[
          { text: 'categories' },
        ]" />
      </div>
      <div class="flex items-center justify-between">
        <!-- right -->
        <div>
          <AppLayoutPageTitle>
            Categories Management
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            Organize and manage product categories
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center space-y-4">
          <div class="text-6xl">
            📂
          </div>
          <h2 class="text-2xl font-semibold text-muted-foreground">
            Categories Management
          </h2>
          <p class="text-muted-foreground">
            This page is currently in development
          </p>
          <div class="text-sm text-muted-foreground">
            Features coming soon: Category hierarchy, subcategories, category attributes
          </div>
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
