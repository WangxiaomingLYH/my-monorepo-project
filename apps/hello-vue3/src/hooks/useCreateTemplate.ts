/**
 * 
 * setup() 函数, 第一个参数是 props 第二个参数是 context(上下文对象)
 * context: 
 *  attrs: 非props属性, 非响应式, 包含 class title data-xx 等
 *  slots: 插槽, 包括具名插槽和默认插槽
 *  emit: 用于触发自定义事件
 *  expose: 用于显示暴露的公共属性, 是个函数, 接收配置项
 */
import type { SetupContext } from "vue";
type TemplateRenderFunction = ((props?: any) => {}) | undefined

export function createReusableTemplate() {
    let render: TemplateRenderFunction
    const DefineTemplate = {
        setup(_: any, { slots }: SetupContext) {
            return () => {
                render = slots.default
            }
        }
    }
    const UseTemplate = (props: object) => {
        if (!render) {
            throw new Error('No template defined. Use <DefineTemplate> first.');
        }
        return render(props)
    }
    return { DefineTemplate, UseTemplate }
}