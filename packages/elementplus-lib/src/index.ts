// packages/ui-lib/src/index.ts
import type { App } from 'vue'
import Demo from "./components/Demo.vue";

const components = [Demo]
export {
    Demo
}
export default {
    install(app: App) {
        components.forEach((comp) => {
            app.component(comp.name!, comp)
        })
    }
}
