import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    dirs: ['src/components'],
    extensions: ['vue'],
    deep: true,
    dts: true
  })],

  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'WxmUi',
      fileName: (format) => `wxm-ui.${format}.js`,
      formats: ['es', 'umd']
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
