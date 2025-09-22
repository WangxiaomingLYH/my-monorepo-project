文档更新
# 安装第三方库
1. 安装vuetify: `https://vuetifyjs.com/zh-Hans/getting-started/installation/#section-73b06709987976ee`
2. 安装 vue-router: `https://router.vuejs.org/zh/installation.html`
3. 安装 tailwindcss: `https://tailwindcss.com/docs/installation/using-vite`

# 进程通信

详见各进程目录的 readme 文档


# 打包应用

- 安装: `cnpm install electron-builder -D`

- 配置 package.js 文件

  ```json
  "scripts": {
      "build":"electron-builder"  // 使用 electron-builder 打包, 生成安装包
  },
  "build":{
      "appId":"LYH", // 应用程序唯一标识符
      "win":{
          "icon":"./logo.ico", // 应用图标
          "target":[
              {
                  "target":"nsis", // 指定使用 NSIS 作为安装程序格式
                  "arch":["x64"] // 生成 64 位安装包
              }
          ]
      },
      "nsis":{
          "oneClick":false, // 是否一键安装, 否则显示安装向导
          "perMachine":true, // 允许每台机器安装一次
          "allowToChangeInstallationDirectory": true, // 允许用户自定义安装目录
      }
  }
  ```



# 配置
1. 使用 `D:\DocumentsPersonal\代码\BBB理论\Electron桌面应用\标准electron-vite-vue-ts模板 - 副本` 当作模板
2. 使用 pnpm 作为包管理器
3. 主要配置如下:
    ```ts
    "vue": "^3.4.15",
    "vite": "^5.0.12",
    "typescript": "5.0.4",
    "electron": "^28.2.0",
    "@types/node": "^18.19.9",
    "vue-router": "4",
    "pinia": "^3.0.3",
    "axios": "^1.11.0",
    "vuetify": "^3.9.5",
    "epubjs": "^0.3.93",
    ```
4. 环境变量还是在更目录下, 建议命名规则为 VITE_APP_XXX

# 基础
主要围绕 src 下的三个目录写代码
    - main: 主进程; 就是 main.js, 在主进程中, 相当于是 node 环境
    - renderer: 渲染进程; 相当于浏览器的 js 环境
    - preload: 预加载脚本
        - 在渲染进程中运行, 相当于是浏览器的 js 环境; 但是能够访问部分 node 的api; 相当于插件的 content.js
        - 在根目录文件里创建, 在主进程中的创建窗口环节, 进行配置

# `electron.vite.config.ts` 配置
1. 配置目录简写
    ```ts
    renderer: {
        resolve: {
        alias: {
            '@renderer': resolve('src/renderer/src'),
            '@views': resolve('src/renderer/src/views'),
            '@store': resolve('src/renderer/src/store/modules')
        }
        },
        plugins: [vue()]
    }
    ```
2. 配置跨域问题
    ```ts
    renderer:{
        server: {
            // 代理配置，解决跨域
            proxy: {
                // https://cn.vitejs.dev/config/server-options.html#server-proxy
                '/api': {
                target: 'http://uat.crm.xuexiluxian.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dev-api/, ''),  // 重写路径，将匹配到的路径中的 /api 去掉
                }
            }
        },
    }
    ```