<script setup lang="ts">
const route = useRoute()
const userId = route.params.id
</script>

<template>
  <div>
    <AppLayoutPageHeader>
      <div class="mb-8">
        <AppLayoutPageBreadcrumb :links="[
          { text: 'users', href: '/users' },
          { text: `user #${userId}` },
        ]" />
      </div>
      <div class="flex items-center justify-between">
        <!-- right -->
        <div>
          <AppLayoutPageTitle>
            User Details
          </AppLayoutPageTitle>
          <AppLayoutPageDescription>
            View and manage user information
          </AppLayoutPageDescription>
        </div>
      </div>
    </AppLayoutPageHeader>

    <AppLayoutPageContent>
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center space-y-4">
          <div class="text-6xl">
            👤
          </div>
          <h2 class="text-2xl font-semibold text-muted-foreground">
            User Details
          </h2>
          <p class="text-muted-foreground">
            This page is currently in development
          </p>
          <div class="text-sm text-muted-foreground">
            Features coming soon: User profile, activity history, account management
          </div>
          <div class="text-xs text-muted-foreground mt-4">
            User ID: {{ userId }}
          </div>
        </div>
      </div>
    </AppLayoutPageContent>
  </div>
</template>
