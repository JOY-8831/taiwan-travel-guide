// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },
  app: {
    baseURL: '/nuxt-app/',
    buildAssetsDir: 'assets', // Optional: simpler directory structure
  },

  css: [
    '~/assets/css/main.css',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ]
})