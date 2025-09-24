// 按需导出
export { default as Button } from './Button.vue'

// 或者统一暴露为一个安装插件（用于 app.use）
import Button from './Button.vue'
import Modal from './Modal.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('UiButton', Button)
    app.component('UiModal', Modal)
  }
}
