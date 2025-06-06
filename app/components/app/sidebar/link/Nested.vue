<script setup lang="ts">
import type { LinkType } from '../Content.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const { link } = defineProps<{
  link: LinkType
}>()

const route = useRoute()
const defaultValue = ref('')

function isCurrentRoute(link: string) {
  return route.path === link
}

onMounted(() => {
  if (link.children?.some(child => isCurrentRoute(child.to))) {
    defaultValue.value = link.label
  }
})

function haveAccess(children: (Omit<LinkType, 'to' | 'children' | 'icon'> & { to: string })) {
  if (!children.onlySuperUser)
    return true
  return false
}
</script>

<template>
  <Accordion v-model:model-value="defaultValue" type="single" collapsible>
    <AccordionItem :value="link.label">
      <AccordionTrigger class="px-2 py-2.5 rounded-md duration-200">
        <div class="flex items-center gap-3 ">
          <i :class="cn('size-5.5 text-foreground-muted', link.icon)" />
          <p class="text-sm text-foreground/80 duration-200">
            {{ link.label }}
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul class="mr-4.5 flex min-w-0 flex-col gap-1 border-s  border-foreground/40 px-2.5 py-0.5">
          <template v-for="child in link.children" :key="child.to">
            <li v-if="haveAccess(child)">
              <NuxtLink
                :to="child.to"
                :class="cn(
                  'px-2 py-1.5 rounded-md flex items-center gap-3 duration-200',
                  {
                    'bg-gradient-to-l from-primary/20 to-primary/5 dark:from-primary-lighter/20 dark:to-primary-lighter/5':
                      isCurrentRoute(child.to!),
                  },
                  { 'hover:bg-secondary': !isCurrentRoute(child.to!) },
                )"
              >
                {{ child.label }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
