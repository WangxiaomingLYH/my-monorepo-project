更目录下的 server 目录
存放 api 地址的

1. 有三个子目录:
 api: 通过 useFetch 访问
 routes: 通过路径访问
 middleware

2. 每个文件都应导出一个定义的默认函数 defineEventHandler() 或者 eventHandler() (别名).

3. 示例
    1. 通过 useFetch 访问 api 下的文件
    ```ts
    server / api / hello.ts 文件
    export default defineEventHandler((event) => {
        return {
            hello: 'nuxt4'
        }
    })

    组件中使用
    const { data } = await useFetch('/api/hello')
    console.log(data)   ===> { hello:'nuxt4' }
    ```

    2. 通过路径访问 routes 下的文件
    ```ts
    server / routes / hello.ts 文件
    export default defineEventHandler((event) => {
        return {
            hello: 'nuxt4'
        }
    })

    通过路径访问 hello
    'http://localhost:3000/hello'  页面将会展示 { hello: 'nuxt4' }  
    ```

    3. 访问中间件的api: 官网地址`https://nuxt.com/docs/4.x/guide/directory-structure/server#server-middleware`

4. useFetch 是基于 fetch() 的封装
    - useFetch(url,options): Ref
        - options:
            - query: 类似 params 参数
            - body: 类似 data 参数
        - 响应的是 Ref 类型的数据
            ```ts
            const { data } = await useFetch('xxx',{
                method: 'POST',
                body: {
                    filename: 'my-article.md',
                    content: content.value
                }
            })
            console.log(data.value, "@data")
            ```
    - 注意: 是响应式依赖, 即会自动追踪 body query 等响应式数据变化, 当数据变化时会自动重新请求


5. $fetch 普通的函数式调用
    - 只能在客户端调用
    - 不追踪依赖, 调用一次只请求一次

6. useAsyncData 在页面或组件中异步加载数据 能够在 服务端渲染 (SSR) 或 客户端渲染 时进行数据获取，并且支持数据缓存和共享
    - 接受两个参数
        - key: 请求的唯一标识
        - 一个返回 Promise 的function
    - 返回一个对象
        - data 响应式数据 
        - error 错误对象
        - pending 布尔值, 请求是否正在进行中
        - refresh 手动触发数据刷新（即重新调用请求）
    - 注意: 
        1. 在 ssr 中会自动缓存