- 目录
    - components: 功能组件
    - layout: 布局组件
    - pages: 路由组件  ===> 自动注册里面的组件为路由
    - view: 非路由组件

- 功能实现
    - 动态生成路由组件
        - 借助 vite的api `import.mate.glob(string,object)`, 拿到指定目录下的所有组件
            - 为了节省性能, 该api只能接收静态字符串, 意味着 string 不能是由变量定义的
            - 所以动态路由中, 指定的目录位置只能写死
        - 将路由路径重写
        - 自动将index转换成根目录, 并将未匹配上的路由重定向到此(写的方法中可用更改路由地址, 默认是到根目录)
            - 注意!!! 并没有借助 defineAsyncComponent 异步组件api; 因为vue-router已经处理了,只需要 component: ()=>import('@/xxx/xxx') 即可
    - layout模板
        - 创建layout目录, 一般有header main aside
            - 将login 404等不需要使用模板文件的组件, 模板选择自身; 需要模板文件的, 模板都集中在layout/index上
            - 然后通过 router-view component :is 实现在模板文件中展示
            - 还能添加transition keep-alive等

- 安装
    - vuetify
        `npm install vuetify@^3.8.1"`   `npm install @mdi/font`
```ts
    // src/plugins/vuetify.ts
    import { createVuetify } from 'vuetify'
    import * as components from 'vuetify/components'
    import * as directives from 'vuetify/directives'

    export default createVuetify({
    components,
    directives,
    })
```

```ts
    // main.ts
    import vuetify from './plugins/vuetify'
    import '@mdi/font/css/materialdesignicons.css' // 引入图标库

    app.use(vuetify)
```
