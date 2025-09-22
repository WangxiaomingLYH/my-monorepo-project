---
title: middleware目录
---

注意! 路由跳转时, 在服务端无法触发中间件

1. 存放中间件的，在页面渲染之前或者路由切换过程中执行的函数
2. 一般用来处理路由级别的逻辑，如权限验证、数据预处理、重定向等
3. 根据命名规则，决定触发时机：
    - xxx.global.ts：会自动执行向外暴露的方法，并且在所有路由切换时都会触发
    - yyy.ts：需要显示调用
4. 显示调用中间件的方法
5. definePageMeta 只能用于页面级（即放在 pages/ 目录下的 .vue 文件）单文件组件的 <script> 区块内，不能在普通组件或布局（layout）中使用
```ts
需要在 setup 中执行
definePageMeta( { middleware: 'yyy' } )
```