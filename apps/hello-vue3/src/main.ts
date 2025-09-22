
// 引入createApp，用于创建应用
import { createApp } from "vue";
// 引入App，用于App根组件
import App from "./App.vue";
// 引入路由器
import router from "./router/index"
// 引入pinia状态管理（替代vuex）
import store from "./store/index";
// 引入element-plus组件 样式 图标
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局注册依赖函数
import { setupGlobalProvides } from './utils/provide';
// 引入 vuetify
import vuetify from './plugins/vuetify'
// 引入 vuetify 图标库
import '@mdi/font/css/materialdesignicons.css'
// 引入加载模板配置项的方法
import { loadTemplateConfig } from "./utils/template-config";




// 创建一个应用
const app = createApp(App)

const init = async () => {
    await loadTemplateConfig()
}
init()

app.use(store)
// 使用element plus
app.use(ElementPlus, {
    locale: zhCn,
})
// 使用路由器
app.use(router)

// 使用 vuetify
app.use(vuetify)

// 注册全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// 测试自定义指令
app.directive('bigSiz', (element, valeu) => {
    console.log(element);
    console.log(valeu);
})

// 创建应用级别依赖
setupGlobalProvides(app); // 设置全局提供

// 挂载整个应用到app容器中
app.mount("#app")