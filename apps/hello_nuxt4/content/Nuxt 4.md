---
# 基础属性
title: Nuxt4 的基本使用
author: WXM
description: 学习 Nuxt 4 的核心特性
---

在 md 文件顶部，可以对该文档的 SEO 进行配置, 使用 `---` 进行隔离
## 模块
1. [官网地址](https://nuxt.com/modules)
2. 建议，一定一定一定要去官网查看安装方式，不要相信任何第三方的说法！！！自己去看

## 目录
[目录参考地址](https://nuxt.com/docs/4.x/guide/directory-structure/app/assets)

1. app 目录，类似 vue 的src
2. assets：css样式文件
3. components：组件目录，nuxt 会自动导入
   - components / base / foo / Button.vue  ===> `<BaseFooButton />`
   - 动态导入组件：前缀添加 Lazy：components / base / foo / Button.vue  ===> `<LazyBaseFooButton />`
4. composables：类似 vue 的 hooks
    ```ts
    composables / useFoo.ts
    export const useFoo = () => {
    return useState('foo', () => 'bar')
    }
    
    const foo = useFoo()
    ```

## nuxt content `@nuxt/content`
1. 安装：`https://content.nuxt.com/docs/getting-started/installation`

## i18n `@nuxtjs/i18n`
1. 使用方法：`https://next.i18n.nuxtjs.org/docs/getting-started/usage`
2. 注意：
    - 配置文件储放目录是： 根目录下：i18n / locales / en.json || zhHans.json，一定不要少了 i18n
    - 切换语言是通过切换域名的方式实现的！！！
    - 参考如下的默认配置下
        ```ts
        i18n: {
            locales: [
                { code: 'en', name: 'English', file: 'en.json',dir:'ltr' },
                { code: 'zhHans', name: '简体中文', file: 'zhHans.json',dir:'ltr' },
            ]
        }
        ```
3. 默认情况下，NUXT I18N模块试图通过检测浏览器的语言将用户重定向到其首选语言。这是由 detectBrowserLanguage 选项，参考：`https://next.i18n.nuxtjs.org/docs/guide/browser-language-detection`

## vuetify
1. 安装参考：`https://vuetifyjs.com/zh-Hans/getting-started/installation/#section-624b52a85b8988c5`

## 环境变量
1. 使用 vite 语法，需额外配置 （个人推荐）
    - 配置 nuxt.config.ts 文件，设置环境变量公共前缀
        ```ts
            export default defineNuxtConfig({
                vite: {
                    envPrefix:'NUXT_PUBLIC_'  // 设置环境变量可读取的公共前缀
                },
            })
        ```
    - 在 ts 文件中使用
        ```ts
            const DEFAULT_LOCALE = import.meta.env.NUXT_PUBLIC_DEFAULT_LOCALE
        ```
2. 使用 nuxt 官方推荐的 useRuntimeConfig() 方法
    - 只能在如下中使用：
        1. Vue 组件的 <script setup>
        2. Nuxt 插件 (plugins/xxx.ts)
        3. 中间件 (middleware/xxx.ts)
        4. 服务端 API (server/api/xxx.ts)
    - 需要在 nuxt.config.ts 文件里进行显示声明
        ```ts
            runtimeConfig: {
                public: {
                    baseURL: process.env.NUXT_PUBLIC_BASE_URL
                }
            },
        ```
        ```ts
            const { public: config } = useRuntimeConfig();
            console.log(config.baseURL,"@config.baseURL"); // 直接读取 NUXT_PUBLIC_BASE_URL
        ```

## scss
1. `pnpm add -D sass-embedded`

## 展示组件
1. 只能展示全局组件，vuetify 的组件不能用
<NuxtWelcome />