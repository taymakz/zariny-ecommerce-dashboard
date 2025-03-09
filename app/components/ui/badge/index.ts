import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        'default':
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        'secondary':
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'destructive':
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        'outline': 'text-foreground',

        'glass-primary':
          'border-transparent bg-primary/15 text-brand-lighter hover:bg-primary/20',
        'glass-success':
          'border-transparent bg-success/15 text-success-lighter hover:bg-success/20',
        'glass-alert':
          'border-transparent bg-alert/15 text-alert-lighter hover:bg-alert/20',
        'glass-warning':
          'border-transparent bg-warning/15 text-warning-lighter hover:bg-warning/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
