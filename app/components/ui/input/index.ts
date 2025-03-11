import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Input } from './Input.vue'

export const inputVariants = cva(
  'flex w-full rounded-lg border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-300 ',
  {
    variants: {
      variant: {
        'default':
          'text-card-foreground focus:border-border-lighter hover:border-border-lighter placeholder:text-card-muted relative block w-full rounded-lg border px-5 py-2 duration-200 placeholder:text-sm placeholder:duration-200 placeholder:select-none focus:placeholder:translate-x-2 disabled:opacity-50',

        'floating-label':
          'relative block [&_input]:px-4 [&_input]:py-3.5 [&_input]:rounded-lg focus-within:border-primary cursor-text [&_input]:border-none [&_input]:bg-transparent [&_input]:w-full [&_input]:placeholder-transparent [&_input]:focus:border-transparent [&_input]:focus:outline-none [&_input]:outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>
