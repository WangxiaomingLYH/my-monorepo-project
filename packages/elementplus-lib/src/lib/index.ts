import type { App } from "vue";
import Table from "./Table/Table.vue";

// 命名导出, 允许用户按需导入单个文件: `import { Table } from '自定义组件库'`
export {
    Table
}

const components = [Table]

// 默认导出全局组件注册方法. 当用户使用 app.use('自定义组件库') 时, 会自动调用 install 方法, 将所有组件注册为全局组件
export default {
    install(app: App) {
        components.forEach(component => {
            component.name && app.component(component.name, component)
        })
    }
}