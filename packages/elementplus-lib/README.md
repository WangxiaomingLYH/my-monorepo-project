1111111111


太好了，恭喜你成功发布了第一个 TS 工具库 🎉
接下来要做一个基于 **Vue 3.5+ 和 Element Plus** 的组件库，这是非常实际且进阶的目标。下面我会手把手教你如何封装一个**现代化 Vue3 公共组件库**，可以发布到 npm、按需引入、支持类型提示、支持样式隔离等。

---

## 🧱 你要做的是：

### ✅ 构建一个现代化 Vue 3 组件库

**技术栈：**

* Vue 3.5+（Composition API + `<script setup>`）
* Vite 构建
* Element Plus（作为依赖/组件封装基础）
  * TypeScript（组件类型定义）

* 可选：Sass、组件按需加载、自动生成类型文件

---

## 📦 项目结构（建议采用 Monorepo）

```
your-ui-lib/
├── packages/
│   └── ui-lib/                      # 组件库本体
│       ├── src/
│       │   ├── components/
│       │   │   └── MyButton.vue
│       │   ├── index.ts             # 组件注册入口
│       │   └── styles/              # 公共样式
│       ├── package.json             # 子包，npm 发布点
│       └── vite.config.ts
├── .npmrc
├── .gitignore
├── README.md
└── tsconfig.json                    # 根 ts 配置
```

---

## 🚀 第一步：初始化项目

```bash
npm init vue@latest your-ui-lib
# 选择：Vue + TypeScript + Vite + Pinia（可选）
```

或者直接搭建 monorepo + packages/ui-lib 子包结构。

---

## 📁 第二步：在 `packages/ui-lib` 中添加组件

创建第一个组件：

```vue
<!-- packages/ui-lib/src/components/MyButton.vue -->
<template>
  <el-button type="primary">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>
```

---

## 📥 第三步：组件库注册入口

```ts
// packages/ui-lib/src/index.ts
import { App } from 'vue'
import MyButton from './components/MyButton.vue'

const components = [MyButton]

export {
  MyButton
}

export default {
  install(app: App) {
    components.forEach((comp) => {
      app.component(comp.name!, comp)
    })
  }
}
```

---

## 🔧 第四步：配置 `vite.config.ts`

```ts
// packages/ui-lib/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
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
```

---

## 🧾 第五步：配置组件库的 `package.json`

```json
{
  "name": "wxm-ui-lib",
  "version": "0.1.0",
  "main": "./dist/wxm-ui.umd.js",
  "module": "./dist/wxm-ui.es.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/wxm-ui.es.js",
      "require": "./dist/wxm-ui.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "peerDependencies": {
    "vue": "^3.5.0",
    "element-plus": "^2.5.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.2.0",
    "element-plus": "^2.5.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "vue": "^3.5.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---

## ✨ 第六步：支持类型定义文件（`.d.ts`）

运行 TypeScript 生成 `.d.ts`：

```bash
tsc --emitDeclarationOnly
```

确保在 `tsconfig.json` 中：

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "skipLibCheck": true,
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve"
  },
  "include": ["src"]
}
```

---

## 🛠 第七步：按需引入支持（可选）

使用 `unplugin-vue-components` 实现按需导入：

```bash
npm install -D unplugin-vue-components
```

配置 `vite.config.ts`：

```ts
import Components from 'unplugin-vue-components/vite'

plugins: [
  vue(),
  Components({
    dirs: ['src/components'],
    extensions: ['vue'],
    deep: true,
    dts: true
  })
]
```

---

## 🚀 发布到 npm（和之前 TS 库一样）

```bash
npm run build
npm publish --access public
```

---

## 🧪 使用方式（在其他项目中）

```bash
npm install wxm-ui-lib
```

然后在 `main.ts` 中使用：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import WxmUI from 'wxm-ui-lib'

const app = createApp(App)
app.use(WxmUI)
app.mount('#app')
```

或者按需使用：

```ts
import { MyButton } from 'wxm-ui-lib'
```

---

## 🎁 你可以进一步支持的功能

* ✅ 支持样式自动导入
* ✅ 组件文档（vitepress / storybook）
* ✅ CI/CD 自动发布（GitHub Actions）
* ✅ 支持 `dark mode` / 样式隔离

---

## ✅ 总结

你现在已经知道了如何从 **纯 TS 工具库** → 过渡到 **Vue3 组件库封装与发布** 的完整流程，关键步骤包括：

| 步骤     | 内容                               |
| ------ | -------------------------------- |
| 初始化    | 创建 Vite + Vue3 项目结构              |
| 编写组件   | 使用 TS + `<script setup>` 编写      |
| 注册导出   | 在 `index.ts` 统一导出组件              |
| 构建打包   | 使用 `vite build` 构建               |
| 类型支持   | 用 `tsc` 输出 `.d.ts` 类型文件          |
| 发布配置   | 设置 `package.json` + `exports` 字段 |
| npm 发布 | `npm publish --access public`    |

---

如果你想：

* 自动生成组件文档（vitepress）
* 加上 CSS 预处理器（Sass、Less）
* 配置组件库的 demo playground
* 使用 pnpm + turbo + GitHub Actions 做自动发布流程

我可以继续帮你搭建。是否继续？或者你希望从某个点开始细化？
