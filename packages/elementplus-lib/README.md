## 封装一个 ElButtonGrounp 组件

### **思路:**

通过配置项和 v-bind 的方式, 传递 props, 包含 icon type circle loading 等需要的属性

如果有 innerHTML 属性, 就通过 #default 插槽渲染; 通过 v-on(缩写为@) 绑定事件

### **实践问题:**

#### 解决动态修改 loading 属性问题:

1. button 组件需要动态修改 loading 属性, 可以通过 class 内置一个修改属性的方法, 然后给组件绑定该方法

- 步骤:
  1. 创建一个 class 和一个 createClass 实例对象的方法, 接收传递的配置项数据, 通过 reactive 转为响应式对象. 然后进行 class 对象实例化, 返回成一个由 class 实例对象组成的新数组, 用于 ElButtonGrounp 组件渲染. 此时单个的 ElButtonGrounp 组件就渲染完成了.

  2. 表单中往往会渲染多个, 所以还需要解决以下问题

     1. class 的构造函数 createClass 方法, 不能接收同一个配置项, 否则 vue 会将它渲染成同一个组件, 导致 loading 属性被公用

        1. 解决方法: 创建 initButtonGrounpOptions 对象, 通过函数的方式深度克隆(_.cloneDeep)后, 传递给构造函数 createClass

           ```tsx
             function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
                 const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
                 return buttonGrounpOptions
             }
           ```


2. 怎么绑定事件问题: 将需要自定义的事件通过 async 包装成一个异步函数传递给 ElButtonGrounp 组件. 然后 ElButtonGrounp 等待异步组件的执行即可

   1. 由于 ElButtonGrounp 组件是通过 v-on 动态绑定事件的, 所以需要传递的是对象, 也就是 `{ click:()=>{...} }` 格式

      - 在注入事件时, 可以考虑将 loading 属性的变化封装在一起, 然后等待执行父组件传递来的事件, 在调用该事件时, 把配置对象传递过去. 这样就方便父组件精准的对该组件进行额外的配置

      - 注意: 我在 ElButtonGrounp 组件中, 执行父组件传递的事件时, 把当前组件的 class 实例化对象和接收的 row 都当作参数传递了. 所以父组件可以直接使用这些数据(类似与 vue 的父子组件通信---父组件传递方法给子组件, 子组件调用并传递数据, 这样父组件就可以访问子组件的数据了)

        ```tsx
        // 注入事件逻辑: 先 loading=true, 然后等待执行传递的方法, 然后 loading=false
        function createButtonEventHandler(classButtonOption: Options) {
            const { click: optionClick } = classButtonOption.events || {}
            return async () => {
                changePropsLoading(true)
                if (optionClick) {
                    await optionClick(classButtonOption, props.row)
                }
                changePropsLoading(false)
            }
            // 改变 loading 属性方法
            function changePropsLoading(value: boolean = false) {
                classButtonOption.setProps!('loading', value)
            }
        }
        
        props.options.forEach((classButtonOption) => {
            classButtonOption.events = {
                click: createButtonEventHandler(classButtonOption)
            }
        })
        
        
        // 父组件的配置项
        {
            id: 'search',
            innerHTML: '搜索全部数据',
            props: {
                icon: Search,
                type: 'info'
            },
            events: {
                click: (ctx, rows) => searchFn(ctx, rows)
            }
        }
        
        // 注意: 这里使用 async 包装成的异步组件
        async function searchFn(ctx: Partial<ClassButtonOptions>) {
            console.log("Edit")
            console.log(ctx)
            ctx.setInnerHTML!('查找中...')
            await 某一个异步函数()
            ctx.setInnerHTML!('查询成功')
        }
        ```
        

### ElButtonGrounp 实例化流程

1. 创建满足 `Partial<ClassButtonOptions>[]`  类型声明的配置项数组, 并通过函数的方式确保配置项唯一化

   1. 可以传递自定义事件

   ```tsx
   //  1. 创建 ElButtonGrounp 组件初始化配置项
   const initButtonGrounpOptions: Partial<ClassButtonOptions>[] = [
       {
           id: 'search',
           innerHTML: '搜索全部数据',
           props: {
               icon: Search,
               type: 'info'
           },
           // 传递自定义事件
           events: {
               click: (ctx, rows) => searchFn(ctx, rows)
           }
       }
   ]
   
   // 2. 创建深度克隆函数, 确保配置项唯一
   function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
       const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
       return buttonGrounpOptions
   }
   ```

   

2. 将该配置项通过 defineProps 的方式传递给 ElButtonGrounp 组件; 执行流程是:

   1. 先传递给递归调用渲染组件 RecursiveComponent, 这一步需要传递所有属性和 row 给 ElButtonGrounp 组件
   2. 然后渲染 ElButtonGrounp 组件, 这里接收到了所有属性和 row

   ```tsx
   // 1. 配置项传递给 RecursiveComponent 组件, 会透传给 ElButtonGrounp 组件
   {
       label: 'Action',
       prop: 'action',
       child: {
           type: ButtonGrounp,
           props: {
               options: () => getButtonGrounpOptions(initButtonGrounpOptions)
           }
       }
   }
   ```

   

## 封装的 Table 组件

**思路:**

1. 使用配置项的方式生成模板, 用到 component 的 is 属性, 可以很方便的渲染 input select 等组件
2. 但是如果需要渲染嵌套组件, 例如 tooltip 包裹住的 button 组件, 就需要递归渲染, 所以选择把 component 封装成递归组件

**实现方式:**

1. 使用 v-for 循环配置项, 使用 component 渲染组件, 使用 v-bind 绑定属性, 通过判断配置项是否有 child 来确认是否需要使用递归调用组件. 使用 `#default={row}`, 解构出当前组件的数据 row, 在使用递归调用租价时, 传递 row
2. 如果需要递归调用, 则通过 props 传递 child row propName 等属性
3. 在递归调用组件中, 还是通过 v-bind 绑定属性, 还是通过判断是否有 child 来确认是否再次递归调用自己. 如果需要, 则还是传递 child row propName 等属性; 如果不需要, 则渲染 innerHTML 或 row[propName]
4. 有些组件如 ElTooltip 需要根据 row 设置 content, 也就是说需要动态获取数据, 这样就需要函数的方式判断传递的 props 是不是方法, 如果是就调用并传递数据
   - 如果选择使用插槽的方式, 则需要在模板中手动写入插槽, 不利于维护
   - 此时的 row 已经透传给了递归组件, 所以可以在递归组件中将数据返回给使用者. 实现方式是使用者传一个函数给递归组件, 递归组件调用该方法, 并传递 row 属性
5. 典型的调用者配置项

```ts
{
    label: 'Id',
    prop: 'appId',
    child: {
        type: ElTooltip,
        props: {
            effect: "dark",
            placement: "top",
            // 通过传递方法的形式, 拿到  row, 然后处理 row
            content: (row: any, name: string) => `应用ID是：${row.appId}, name 是: ${name}`,
        },
        slots: {
            name: 'content'
        },
        child: {
            type: ElButton,
            props: {
                link: true,
                type: 'primary'
            }
        },
    }
},
```

1. 渲染自定义组件
   可以直接通过 v-bind 的方式传递配置项给自定义组件
   然后自定义数组声明一个 definedProps 用于接收
   v-bind（用于传 props）时，如果你没声明，Vue 会退而求其次当成 HTML attr

1. 解决loading状态混乱的问题
   通过 createButtonOptions 生成的 ClassButtonOptions 实例对象组成的数组, 可以通过 props 的方式传递给 RecursiveComponent 组件, 通过 v-bind 自动展开后, 在 ClassButtonOptions 组件中声明 options 是一个 props, 然后就能把 通过 createButtonOptions 生成的 ClassButtonOptions 实例对象组成的数组 传递给 buttongrounp 组件了
   如果遇到了多个列表渲染, buttongrounp 组件引用同一个数组对象会导致状态混乱, 所有该数组对象需要使用函数的方式生成
   函数的方式生成, 如果都是引用同一个静态对象的话, 生成的还是同一个引用对象; 所以需要使用深度克隆的方式, 让引用同一个静态对象的函数, 生成不同的引用地址!!!!!!!!!!!!!!!!!!!!!!

1111111111

太好了，恭喜你成功发布了第一个 TS 工具库 🎉
接下来要做一个基于 **Vue 3.5+ 和 Element Plus** 的组件库，这是非常实际且进阶的目标。下面我会手把手教你如何封装一个**现代化 Vue3 公共组件库**，可以发布到 npm、按需引入、支持类型提示、支持样式隔离等。

---

## 🧱 你要做的是：

### ✅ 构建一个现代化 Vue 3 组件库

**技术栈：**

- Vue 3.5+（Composition API + `<script setup>`）
- Vite 构建
- Element Plus（作为依赖/组件封装基础）
  - TypeScript（组件类型定义）

- 可选：Sass、组件按需加载、自动生成类型文件

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
import { ElButton } from "element-plus";
</script>
```

---

## 📥 第三步：组件库注册入口

```ts
// packages/ui-lib/src/index.ts
import { App } from "vue";
import MyButton from "./components/MyButton.vue";

const components = [MyButton];

export { MyButton };

export default {
  install(app: App) {
    components.forEach((comp) => {
      app.component(comp.name!, comp);
    });
  },
};
```

---

## 🔧 第四步：配置 `vite.config.ts`

```ts
// packages/ui-lib/vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "WxmUi",
      fileName: (format) => `wxm-ui.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
      },
    },
  },
});
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
import Components from "unplugin-vue-components/vite";

plugins: [
  vue(),
  Components({
    dirs: ["src/components"],
    extensions: ["vue"],
    deep: true,
    dts: true,
  }),
];
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
import { createApp } from "vue";
import App from "./App.vue";
import WxmUI from "wxm-ui-lib";

const app = createApp(App);
app.use(WxmUI);
app.mount("#app");
```

或者按需使用：

```ts
import { MyButton } from "wxm-ui-lib";
```

---

## 🎁 你可以进一步支持的功能

- ✅ 支持样式自动导入
- ✅ 组件文档（vitepress / storybook）
- ✅ CI/CD 自动发布（GitHub Actions）
- ✅ 支持 `dark mode` / 样式隔离

---

## ✅ 总结

你现在已经知道了如何从 **纯 TS 工具库** → 过渡到 **Vue3 组件库封装与发布** 的完整流程，关键步骤包括：

| 步骤     | 内容                                 |
| -------- | ------------------------------------ |
| 初始化   | 创建 Vite + Vue3 项目结构            |
| 编写组件 | 使用 TS + `<script setup>` 编写      |
| 注册导出 | 在 `index.ts` 统一导出组件           |
| 构建打包 | 使用 `vite build` 构建               |
| 类型支持 | 用 `tsc` 输出 `.d.ts` 类型文件       |
| 发布配置 | 设置 `package.json` + `exports` 字段 |
| npm 发布 | `npm publish --access public`        |

---

如果你想：

- 自动生成组件文档（vitepress）
- 加上 CSS 预处理器（Sass、Less）
- 配置组件库的 demo playground
- 使用 pnpm + turbo + GitHub Actions 做自动发布流程

我可以继续帮你搭建。是否继续？或者你希望从某个点开始细化？
