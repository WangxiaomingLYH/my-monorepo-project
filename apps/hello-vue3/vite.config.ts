import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 引入凤尾css
import tailwindcss from '@tailwindcss/vite'

// 引入让组件name和setup语法糖结合在一起的插件
import VueSetupExtend from "vite-plugin-vue-setup-extend"
// const env = loadEnv(module,)
// https://vite.dev/config/

export default defineConfig({
  // 管理插件的地方
  plugins: [
    vue(),
    vueDevTools(),
    // 调用让组件name和setup语法糖结合在一起的插件
    VueSetupExtend(),
    // 调用凤尾css
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 在 server 里设置端口号 proxy 代理等
  server: {
    // open: true
    proxy: {

    }
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      output: {

      }
    }
  }
})
