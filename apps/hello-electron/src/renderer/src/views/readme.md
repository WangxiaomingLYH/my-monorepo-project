1. 在这里存放 路由页面 组件
2. 通过 electron.vite.config.ts 文件，可以配置短路径
```ts
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@view': resolve('src/renderer/src/view'),
      }
    },
    plugins: [vue()]
  }
```