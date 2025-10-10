import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// dts: vite-plugin-dts 会自动把你的 .vue 文件和对应的 defineProps 类型提取出来并生成 .d.ts 文件。
import dts from 'vite-plugin-dts'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src/lib', // 只处理这个目录
      include: ['src/lib'], // 明确包含要生成声明的目录
      // outDir: 'dist/types',   // 类型声明文件输出到 dist/lib 目录
      // copyDtsFiles: true    // 可选，拷贝原始 .d.ts 文件
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'WxmUi',
      fileName: (format) => `wxm-ui.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
