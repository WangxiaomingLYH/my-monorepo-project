// 官网地址：https://content.nuxt.com/
// 配置其他目录地址: https://content.nuxt.com/docs/files/markdown

// content.config
// app/
//   xxx.md
//   yyy/
//     zzz.md
// content/
//   xzxz.md
//   dsad/
//     sadas.md

// Nuxt Content 默认使用 sanitize-html 来对渲染出的 HTML 进行消毒（sanitization）。它会默认移除危险的标签（如 <script>、<iframe>）和属性（如 onerror、onload）

import path from 'node:path'

import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // 这里定义集合
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    readme: defineCollection({
      type: 'page',
      source: {
        cwd: path.resolve(process.cwd(), 'app'), // <- 必须是绝对路径
        include: '**/*.md'                       // 递归匹配 app 下所有 md
        // 可选：prefix: '/app' // 如果希望生成页面路径带 /app 前缀
      }
    })
  },  
})