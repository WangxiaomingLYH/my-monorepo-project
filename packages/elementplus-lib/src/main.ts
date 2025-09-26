import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { vCopy } from "wxm-utils-lib";
import vCopy from './directive/vCopy.ts'

import App from './App.vue'


const app = createApp(App)

app.use(ElementPlus)
app.directive('copy', vCopy);
app.mount('#app')
