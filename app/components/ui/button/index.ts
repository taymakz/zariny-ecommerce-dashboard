import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-brand hover:bg-brand/90 text-white dark:bg-brand/15 dark:text-brand-lighter shadow dark:hover:bg-brand/20',

        outline:
          'border border-input bg-background shadow-sm hover:bg-background/70 hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border hover:border-border-lighter',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        info: 'bg-info hover:bg-info/90 text-white dark:bg-info/15 dark:text-info-lighter shadow dark:hover:bg-info/20',
        success:
          'bg-success hover:bg-success/90 text-white dark:bg-success/15 dark:text-success-lighter shadow dark:hover:bg-success/20',
        alert:
          'bg-alert hover:bg-alert/90 text-white dark:bg-alert/15 dark:text-alert-lighter shadow dark:hover:bg-alert/20',
        warning:
          'bg-warning hover:bg-warning/80 text-white dark:bg-warning/10 dark:text-warning-lighter shadow dark:hover:bg-warning/15',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
