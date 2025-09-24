packages 目录下存放公共库

## 公共库方法的导出方式

1. 直接导出即可
   1. 新建一个 index.ts 文件, 然后在该文件中导出方法
   2. 注意: 自动生成的 package.json 文件中, 入口文件默认是 "main": "index.js"; 直接导出不需要在 package.json 里进行额外配置
   3. 缺点: 可以访问全部路径
      可能需要的是 import { xxx } from "@wxm/shared-utils", 但实际上 import { } from "@wxm/shared-utils/src/isEpty" 也不会报错, 这样外部调用者就能访问全部路径了, 不安全

2. 精细管理可访问路径
   1. 在 package.json 文件中, 配置 exports

   ```json
   "exports": {
       ".": {
           "import": "./index.ts"
       }
   }
   ```

   这样就能限制访问路径了
   import { isEmpty } from 'shared-utils' 等同于 import { isEmpty } from './index.ts'
   此时 import { } from "@wxm/shared-utils/src/isEpty" 就会报错

3. 模块化管理
   1. 更进一步的管理, 创建 src 目录, 精细的管理要导出的方法
   2. 然后在 package.json 里精细的导入导出

   ```json
   "exports": {
     ".": { "import": "./index.ts" },
     "./isEmpty": { "import":"./src/isEmpty.ts" }
   }
   ```

4. 企业开发中, 需要将公共库进行打包. 核心目的是为了模拟这些包作为独立 npm 包发布后的状态, 用于确保整个 Monorepo 的开发体验和最终产出的可靠性

   1. 虽然 pnpm workspace 的软连接机制, 可以让项目直接引用公共库的源码, 但是如果不经过打包步骤, 可能会出现:
      1. 模块格式问题: 公共库使用 TS 或 ES Modules, 而消费方却期望的是 CommonJS 格式
      2. 语法和 poolyfill 问题: 公共库使用了 ?. ?? 等高级 js 语法, 而消费方不支持, 所以需要自动注入必要的 polyfill(高级语法适配化, 类似适配 IE)

   2. 所以不管是什么项目, 都建议使用 vite 进行打包之后使用, 模拟上传到 npm 的状态

   3. 推荐命名方式 @wxm/utils-lib @wxm/ui-lib
      1. **如果 package.json 的 name 属性命名为 @wxm/xxx-lib, 那么即使声明了这是公共, 也会被 npm 认为是私有包, 所以建议使用命名方式为: wxm-xxx-lib**, 当然使用公司的账号就没问题了


## 新建纯 TS 公共库

1. 初始化仓库并修改 name: pnpm init, 然后将 name 属性改为 @wxm/xxx-lib 格式
2. 开发环境安装 vite typescript: `pnpm add -D vite typescript`
3. 初始化 ts 配置: `npx tsc --init`, 会自动生成一份 tsconfig.json 文件

- 需要指定 package.json 的 type 为 ES Modules: `"type": "module"`. 这一步可以解决在 ts 严格模式下, 引入外部包报错的问题
- 因为 vite 不会生成 .d.ts 文件, 所以必须使用 tsc 生成; 但是 tsc 的输出位置不受 vite 控制, 所以需要配置 tsconfig.json 文件, 指定范围, 指定打包后的目录
  ```json
  // tsconfig.json 文件
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
  ```
- 然后在 package.json 文件里配置
  ```json
  "scripts": {
    "build": "vite build && tsc"
  },
  ```

4. 创建 scr/index.ts 文件, 模块化管理要暴露的方法; 创建 src/modules/test.ts 文件, 里面存放着将要暴露的公共方法(方法需要向外暴露)

   ```
   1. src/modules/test.ts 文件
   export function log() {
     console.log("!!!!!!!!!!")
   }
   
   2. scr/index.ts
   // 在 tsconfig.json 中开启了 NodeNext + ESM 模式，这就要求你在 import/export 时写真实的 .js 扩展名，即使你源代码是 .ts
   export { log } from "./modules/test.js"
   ```

5. 配置 vite.config.ts 文件

   1. 前几步完成后, 纯 TS 项目向外暴露方法的功能就做好了, 现在是需要进行打包配置, 并配置 package.json 指向打包后的文件
   2. 配置 vite.config.ts 文件, 主要是使用库模式

     - 库模式是 vite 专门用于构建可复用库的配置模式, 生成可供其他项目应用的代码库, 最终打包结果是 js 模块文件 + 类型声明. 适用于打包工具库和组件库

   3. 下面的配置文件, 将打包后的文件输出到 dist 目录下, 所以还需要在 package.json 文件里指向可访问路径

      1. 可以通过不同的引入方式, 判断要消费者是 ES Modules 还是 Common JS

      2. 添加 "types": "./dist/index.d.ts" 是为了让消费端获取类型声明, 虽然在 build 时会提示该配置项无效

         ```
         // vite.config.ts 文件
         import { defineConfig } from 'vite';
         import path from 'path';
         
         export default defineConfig({
             build: {
                 lib: {
                     entry: path.resolve(__dirname, './src/index.ts'),  // 库的入口文件
                     name: 'WxmUtils',  // 库的全局变量名
                     fileName: (format) => `my-lib.${format}.js`,  //  输出文件名
                     formats: ['es', 'cjs', 'umd'], // 可按需选择格式
                 },
             },
         });
         
         
         // package.json 文件
         "exports": {
           ".": {
             "import": "./dist/my-lib.es.js",
             "require": "./dist/my-lib.cjs.js",
             "types": "./dist/index.d.ts"
           }
         },
         ```

   6. 当然还可以让打包后的文件去掉所有的注释信息, 以及 console.log

      ```
      
      ```

      

6. 此时就能够将该公共库上传到 npm 了, 同时也不会影响本地通过 pnpm workspace 模式直接访问. 发布到 npm, 需要进行如下配置

   1. version 每次发布必须递增版本号; main 指向打包后的 cjs.js 文件作为 CommonJS 入口; module 指向打包后的 .es.js 文件作为 ESModule 入口; type 指向打包后的 .d.ts 文件作为类型定义文件入口; files 只发布打包后的文件, 不包含源码

      ```
      {
        "name": "@wxm/utils-lib",
        "version": "1.0.0",
        "description": "实用工具函数",
        "type": "module",
        "main": "./dist/my-lib.cjs.js",
        "module": "./dist/my-lib.es.js",
        "types": "./dist/index.d.ts",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build": "vite build && tsc"
        },
        "exports": {
          ".": {
            "import": "./dist/my-lib.es.js",
            "require": "./dist/my-lib.cjs.js",
            "types": "./dist/index.d.ts"
          }
        },
        "files": [
          "dist"
        ],
        "keywords": [],
        "author": "wxm",
        "license": "MIT",
        "devDependencies": {
          "typescript": "^5.9.2",
          "vite": "^7.1.7"
        }
      }
      ```

   2. 然后可以运行 npm publish --dry-run, 检查会发布哪些文件

      1. 可以去到 npm 官网申请一个经典令牌, 然后在 monorepo 的根目录里创建一个 .npmmr 文件. 在该文件中使用令牌, 告诉 npm 在当前项目中使用这个 Token 进行身份验证. 还建议在 .npmrc 中添加一行, 确保作用域包默认是公共的(否则会上传失败)

         ```
         //registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
         @wxm:registry=https://registry.npmjs.org/
         ```

      2. 然后需要在 package.json 中添加配置, 声明这是一个公共的包

         ```
           "publishConfig": {
             "access": "public"
           },
         ```

      3. 然后就正常的打包项目, 打包完成后执行命令: `npm publish --access public`

         1. 首次打包可能会失败, 需要执行 npm adduser 信任这台设备. 建议改回 npm 官方源, 否则可能卡在登录这一步
         2. 在打包的过程中发现, **如果 package.json 的 name 属性命名为 @wxm/xxx-lib, 那么即使声明了这是公共, 也会被 npm 认为是私有包, 所以建议使用命名方式为: wxm-xxx-lib** 
         3. 每次打包发布, 版本号都需要增加, 否则会报错

      4. 注意!: 千万不要把 .npmmr 提交到 github 上, 所以需要在项目根目录的 .gitignore 文件里添加配置

         ```
         # 忽略本地 npm 凭证文件
         .npmrc
         ```

         



导出公共方法

1. 有个 package.json 文件
2. 在 index.ts 文件中, export 想要导出的方法

方法二:

1. 创建 src 目录, 里面放着要导出的方法
2. 在 index.ts 文件中, 导出想要导出的方法
3. 在 package.json 文件中, 添加以下配置项

```
"exports": {
    ".": {
        "import": "./index.ts"
    }
}
```

exports 是用来 告诉 Node.js / 构建工具 / bundler：
「当别人导入你的包时，可以导入什么，怎么导入」
它控制的是：

你这个包的「对外暴露接口」。

它的含义是：
当别人 import 'shared-utils' 时，实际上等同于导入 ./index.ts
{
"name": "shared-utils",
"exports": {
".": {
"import": "./index.ts"
}
}
}
import { isEmpty } from 'shared-utils' 等同于 import { isEmpty } from './index.ts'

写了 exports 字段，它就会限制别人只能通过定义好的路径访问模块内容, 例如 import { isEmpty } from 'shared-utils/xxx' 这代码会报错

没写 exports 的时候，任何文件都能导入你包里的任何路径（哪怕是私有代码） import { isEmpty } from 'shared-utils/xxx' 就不会报错

"exports": {
".": { "import": "./index.ts" },
"./isEmpty": { "import": "./src/isEmpty.ts" },
"./deepClone": { "import": "./src/deepClone.ts" }
}

导入方式有
import { isEmpty } from 'shared-utils/isEmpty'

共享库里可能包含
常见内容：

类型判断（isEmpty、isNumber、isObject）

深拷贝 / 浅拷贝

日期格式化（formatDate）

路由参数解析

节流 / 防抖

文件下载、Blob 转换

加密解密（如 Base64、AES）

颜色转换（hex ↔ rgba）

正则表达式集合

2. 常量与配置（Constants / Config）

接口状态码常量

项目通用配置（如默认分页大小、接口前缀）

权限列表

枚举定义（UserStatusEnum, GenderEnum）

3. 接口请求封装（API SDK / HTTP 工具）

封装统一的 fetch / axios 请求工具

设置请求拦截器 / 响应拦截器

接口错误处理逻辑统一封装

封装后端 SDK（如调用某一业务系统的接口集）

4. 表单 / 表格工具

通用表单校验器

表格字段格式化器

字段映射（如状态码转文案）

5. 通用组件库（Shared Components）

如果共享库是前端项目，特别是 React、Vue 项目，还可以包含组件：

通用按钮、输入框、弹窗

自定义图标组件

图表组件封装（基于 ECharts、Chart.js 等）

通用布局组件

通用业务组件（如用户选择器、地区选择器）

6. Hooks / Composables（React 或 Vue 项目）

自定义 Hook（如 useDebounce, usePagination, useAuth）

状态管理封装（如 useUserStore）

7. 类型定义（TypeScript 项目）

公共接口类型（如用户信息、分页请求/响应）

类型工具函数（如 PartialDeep<T>、MaybeNull<T>）

DTO（Data Transfer Object）结构

8. 业务模块抽象（可选）

如果多个项目有相似业务逻辑，可以将部分服务封装为模块：

用户模块（如注册登录逻辑）

权限模块

文件上传模块

通知模块（如消息推送、弹窗通知）
