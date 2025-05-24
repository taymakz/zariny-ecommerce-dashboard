import tailwindcss from '@tailwindcss/vite'
import { appDescription, appTitle } from './app/constants'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'motion-v/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lucide-icons',
    '@nuxtjs/google-fonts',
    'dayjs-nuxt',
    '@vee-validate/nuxt',
    '@formkit/auto-animate/nuxt',
    './app/modules/shadcn',
    'nuxt-monaco-editor',
    'nuxt-charts',
  ],
  ssr: false,
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      titleTemplate: '%s - Ecommerce',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: 'white',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#222222',
        },
      ],
    },
  },
  css: [
    '~/assets/styles/theme.css',
    '~/assets/styles/app.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      baseApi: '', // Base Api environment variable
    },
  },
  routeRules: {
    '/': { redirect: '/dashboard', appMiddleware: 'should-be-logged-in' },
    '/dashboard': { appMiddleware: 'should-be-logged-in' },

  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    watcher: 'parcel',
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  dayjs: {
    plugins: ['relativeTime', 'timezone'],

  },
  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  googleFonts: {
    families: {
      'Inter': [400, 500],
      'DM Mono': [400, 500],
      'Roboto Condensed': [400, 500],
      'Bad Script': [400, 500],
      'Comfortaa': [400, 500, 600, 700],

    },
  },
})
