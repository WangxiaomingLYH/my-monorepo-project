---
title: layouts目录
---

1. 项目默认使用 default.vue 当作模板文件
2. 自定义模板文件，组件内使用
    ```ts
        definePageMeta({
            layout: '自定义模板名称'
        })
    ```