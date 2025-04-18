import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-brand hover:bg-brand/90 text-white dark:bg-brand/15 dark:text-brand-lighter border-transparent dark:hover:bg-brand/20',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'text-foreground',

        info: 'bg-info hover:bg-info/90 text-white dark:bg-info/15 dark:text-info-lighter border-transparent dark:hover:bg-info/20',

        success: 'bg-success hover:bg-success/90 text-white dark:bg-success/15 dark:text-success-lighter border-transparent dark:hover:bg-success/20',

        alert: 'bg-alert hover:bg-alert/90 text-white dark:bg-alert/15 dark:text-alert-lighter border-transparent dark:hover:bg-alert/20',

        warning: 'bg-warning hover:bg-warning/90 text-white dark:bg-warning/10 dark:text-warning-lighter border-transparent dark:hover:bg-warning/15',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
