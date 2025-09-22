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