---
title: 小程序概览手册
---

# uniapp

**优点**: 一套代码经过条件编译, 能发布到 ios 安卓 web 小程序

**缺点**: 性能差, 上架可能有问题

## 基础

**条件判断**: 通过条件判断, 可选择不同平台的展示内容; 但是无法精准判断app端(ios 安卓); 可以使用 || 进行逻辑操作

```
<view>
    <!-- #ifdef H5 -->
    <h2>h5展示</h2>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <h2>微信小程序展示</h2>
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <h2>支付宝小程序展示</h2>
    <!-- #endif -->
</view>f
```

**精准设备判断**: 调用 uni 上的 api

```
onLoad() {
	console.log(uni.getSystemInfoSync().platform)   ===> ios android
},
```

###### 目录结构

- `uni.scss`: 是uni-app内置的常用全局样式变量
- `pages.json`: 全局文件, 页面配置 
- `manifest.json`: 全局文件, 应用配置, 关于上架的, 定位 支付权限等 
- `main.js`: 和 vue 项目的类似, 第一个运行的js文件 
- `index.html`: 无需关注 
- `App.vue`: 第一个组件 
- `static`: 静态资源 
- `pages`: 页面 
- `components`: 组件 
- `unpackage`: 打包后的目录 

###### 基础语法

**API地址**
组件文档官网地址: `https://uniapp.dcloud.net.cn/component/view.html`
- `view`: 视图容器, 类似 div
- `scroll-view`: 可滚动视图区域
- `swiper`: 滑块视图容器
- `text`: 文本组件, 有配置的属性api
- `icon`: 图标
- `progress`: 进度条
**表单组件**
- `button`
- `checkbox`
- `editor`: 富文本编辑器
- `form`
- `input`
- `label`
- `picker`: 底部弹起的滚动选择器, 有时间 多列 日期 省市区等
- `radio`
- `slider`: 滑块
- `switch`
- `textarea`: 多行输入框
**路由跳转**
- `navigator`: 页面跳转, 只能跳转本地页面. 目标页面必须在 pages.json 中注册
**其他**
- `image`: 图片
- `map`: 展示地图
**css**

- 尺寸单位: rpx
  * 如果设计图宽度是 750, 测量的元素宽度是300, 在style里写 300rpx 即可
    **js**
    支持绝大多数 ES6语法 和 ES7 的await/ async

###### 生命周期

**API**: [uniapp 页面生命周期 API](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)
**页面级**: 在 pages 目录下的文件
支持 vue 组件的生命周期
- `onInit`: 监听页面初始化，其参数同 onLoad 参数
- `onLoad`: 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成. 其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考[示例](https://- uniapp.dcloud.net.cn/api/router.html#navigateto)。
- `onShow`: 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面. 无法接收参数, 如果需调用实时更新接口, 可以在该生命周期中发起请求
- `onReady`: 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发
- `onHide`: 监听页面隐藏
- `onUnload`: 监听页面卸载
- `onResize`: 监听窗口尺寸变化
- `onPullDownRefresh`: 监听用户下拉动作，一般用于下拉刷新
- `onReachBottom`: 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
- `onTabItemTap`: 点击 tab 时触发，参数为Object
- `onShareAppMessage`: 用户点击右上角分享
- `onPageScroll`: 监听页面滚动，参数为Object
- `onNavigationBarButtonTap`: 监听原生标题栏按钮点击事件，参数为Object![img](https://web-ext-storage.dcloud.net.cn/doc/tutorial/uni-app-lifecycle-vue2.jpg)
**组件生命周期**: 非 pages 目录下的文件

注意! 推荐使用 vue3 的 setup语法糖写法, uniapp的生命周期需要从 @dcloudio/uni-app 里引入
```ts
执行顺序为: 
setup 生命周期
onLoad 生命周期
onBeforeMount 生命周期
onMounted 生命周期
onReady 生命周期

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import {onLoad,onReady} from "@dcloudio/uni-app"

const title = ref('hello uniapp')

console.log('setup 生命周期')
onLoad(()=>{
	console.log('onLoad 生命周期')
})
onBeforeMount(()=>{
	console.log('onBeforeMount 生命周期')
})
onMounted(()=>{
	console.log('onMounted 生命周期')
})
onReady(()=>{
	console.log('onReady 生命周期')
})
</script>
```

###### 路由跳转

**注意**: 

- 如果跳转到 tabBar 页, 则只能使用 switchTab 

| 路由方式   | 页面栈表现                        | 触发时机                                                     |
| ---------- | --------------------------------- | ------------------------------------------------------------ |
| 初始化     | 新页面入栈                        | uni-app 打开的第一个页面                                     |
| 打开新页面 | 新页面入栈                        | 调用 API  [uni.navigateTo](https://uniapp.dcloud.net.cn/api/router#navigateto) 、使用组件  [<navigator open-type="navigate"/>](https://uniapp.dcloud.net.cn/component/navigator?id=navigator) |
| 页面重定向 | 当前页面出栈，新页面入栈          | 调用 API  [uni.redirectTo](https://uniapp.dcloud.net.cn/api/router#redirectto) 、使用组件 [<navigator open-type="redirectTo"/>](https://uniapp.dcloud.net.cn/component/navigator?id=navigator) |
| 页面返回   | 页面不断出栈，直到目标返回页      | 调用 API  [uni.navigateBack](https://uniapp.dcloud.net.cn/api/router#navigateback)  、使用组件 [<navigator open-type="navigateBack"/>](https://uniapp.dcloud.net.cn/component/navigator?id=navigator) 、用户按左上角返回按钮、安卓用户点击物理back按键 |
| Tab 切换   | 页面全部出栈，只留下新的 Tab 页面 | 调用 API  [uni.switchTab](https://uniapp.dcloud.net.cn/api/router#switchtab) 、使用组件 [<navigator open-type="switchTab"/>](https://uniapp.dcloud.net.cn/component/navigator?id=navigator) 、用户切换 Tab |
| 重加载     | 页面全部出栈，只留下新的页面      | 调用 API  [uni.reLaunch](https://uniapp.dcloud.net.cn/api/router#relaunch) 、使用组件  [<navigator open-type="reLaunch"/>](https://uniapp.dcloud.net.cn/component/navigator?id=navigator) |

**组件传值**
uni.$emit
uni.$on

###### pages.json 配置

**API**: [pages 及其他配置项地址](https://uniapp.dcloud.net.cn/collocation/pages.html#pages)

- `pages`: 接收 [], 配置页面, 第一个配置项设为首页
- `globalStyle`: 全局样式
- `tabBar`: 
  * 设置底部按钮, 最少2个, 最多5个
  * 当设置 position 为 top 时, 将不会显示 icon
  * tabBar的页面展示过一次后保留在内存中, 再次切换 tabBar 页面, 只会触发每个页面的 onShow , 不会再触发 onLoad
  * 顶部 tabBar 只有微信小程序支持
  * 页面一定要在 pages 里进行配置, 否则不会显示
  * 在 `list` 里配置普通 tabBar
  * 在 `midButton` 里配置中间的加号, 该 API 不能配置路径, 只能通过监视 `uni.onTabBarMidButtonTap` 事件的方式操作逻辑; 该事件一般在 app.vue 的 onLaunch 生命周期中进行配置

**安装 uview plus 组件库**:
安装: 

```tsx
1. 在命令行工具中依次执行:
`npm init -y`  // 初始化项目, 必须要执行
`npm install uview-plus`

2. 在 main.js, 需要在
import uviewPlus from 'uview-plus'
app.use(uviewPlus)
// 推荐在 createSSRApp 内部调用
//	  - 作用范围：插件仅对当前 SSR 应用实例生效，避免全局污染。
//    - SSR 兼容性：如果 uviewPlus 支持 SSR，会正确处理服务端渲染逻辑（如样式提取、避免浏览器 API 调用）。
//    - 激活（hydration）：插件状态会同步到客户端，避免激活不匹配。

3. 在 uni.scss 里导入 uview 组件样式
@import 'uview-plus/theme.scss';

4. 在 pages.json 里配置, 和 pages 配置项同级
"easycom": {
	"autoscan": true,
	// 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
	"custom": {
		"^u--(.*)": "uview-plus/components/u-$1/u-$1.vue",
		"^up-(.*)": "uview-plus/components/u-$1/u-$1.vue",
		"^u-([^-].*)": "uview-plus/components/u-$1/u-$1.vue"
	}
}
```

使用 **easycom** 便捷导入:

- easycom 是自动开启的

- 此时引入组件无需在页面内 import, 也不需要在 components 内声明了
- **是局部引入**



# 开发

## 依赖注入

1. `provide`: 提供; `provide(/* 注入名 */ 'message', /* 值 */ 'hello!')`
2. `inject `: 注入; `inject('message', '这是默认值')`

#### 注意

1. 如果不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的; `Inject()` 同理

2. `inject`是从逐级向上寻找依赖

3. 建议在同一个文件里管理数据源, 所以我会放在 `hooks / provide.js` 中

   ```tsx
   因为第一条和第三条, 所以推荐将 provide 注册为应用级别的. 可以在 provide.js 中创建函数, 在 main.js 中将创建的 app 传入后, 进行注册
   
   1. hooks / provide.js
   import {
   	provide,
   	ref
   } from 'vue'
   
   const activeTab = ref('11111')
   // 创建 provide 的安装函数
   export const setupGlobalProvide = (app) => {
   	app.provide('current', activeTab) // 使用 app 实例的 provide 方法
   }
   
   2. main.js
   
   import {
   	setupGlobalProvide
   } from './hooks/provide.js'
   
   setupGlobalProvide(app)
   ```

   # 常用配置

#### tabBar

```
tabBar  ===> { } 一级配置项
    color: tab 上的文字默认颜色
    selectedColor: tab 上的文字选中时的颜色
    backgroundColor: tab 的背景色

    tabBar > list  ===> [ {} ] 二级配置项
        pagePath: 页面路径，必须在 pages 中先定义
        text: tab 上按钮文字
        iconPath: 图片路径，icon 大小限制为40kb
        selectedIconPath: 选中时的图片路径，icon 大小限制为40kb
```

#### pages

```
pages  ===> [ {} ]  一级配置项
	path: 配置页面路径
	needLogin: 是否需要登录才可访问
	
	pages > style  ===> [ {} ] 二级配置项 用于设置每个页面的状态栏、导航条、标题、窗口背景色等
```

