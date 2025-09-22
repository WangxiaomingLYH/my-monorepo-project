import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia/nuxt', '@nuxt/content', '@nuxtjs/i18n', (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      config.plugins?.push(vuetify({ autoImport: true }))
    })
  },],
  i18n: {
    defaultLocale: import.meta.env.NUXT_PUBLIC_DEFAULT_LOCALE,  // 设置默认值后，路由路径里不带此语言环境选项， 如：http://localhost:3000 || http://localhost:3000/zhHans
    locales: [
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'zhHans', name: '简体中文', file: 'zhHans.ts' },
    ]
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    envPrefix: 'NUXT_PUBLIC_' // 设置环境变量可读取的公共前缀
  },
  content: {  // nuxt content 配置项
    build: {
      markdown: {
        toc: {
          depth: 2, // 深度为2, 包含 h2 h3 标签, 默认排除 h1标签
          searchDepth: 3  // 检索深度
        }
      }
    }
  }
})