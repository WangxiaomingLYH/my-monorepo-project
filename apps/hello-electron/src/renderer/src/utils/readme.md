1. 二次封装 axios
npm i axios -S
新建 src / utils / request.ts 文件，然后配置
 - 解决跨域问题
    1. 先去 index.html 里，注释掉原有的 meta 标签
    2. 然后去 electron.vite.config.ts 文件的 renderer 里，配置
    ```ts
    server: {
        // 代理配置，解决跨域
        proxy: {
            // https://cn.vitejs.dev/config/server-options.html#server-proxy
            '/api': {
                target: 'http://uat.crm.xuexiluxian.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dev-api/, ''),  // 重写路径，去掉
            }
        }
    },
    ```
    3. 然后在 utils / request.ts 文件里配置
    ```ts
    const baseURL = import.meta.env.VITE_VUE_APP_API_BASEURL
    const instance = axios.create({
        baseURL
    })
    ```