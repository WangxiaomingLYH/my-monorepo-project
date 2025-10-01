import { type Component, reactive, markRaw } from "vue";
import _ from 'lodash'

type Props = {
    circle?: boolean,
    icon?: Component,
    loading?: boolean,
    type?: "" | "text" | "default" | "primary" | "success" | "warning" | "info" | "danger",
    size?: 'large' | 'default' | 'small',
    disabled?: boolean
}
type Events = {
    click?: (ctx: Partial<ClassButtonOptions>) => void | Promise<void>
}

export class ClassButtonOptions {
    id?: string;
    innerHTML?: string;
    props?: Props = {};
    events?: Events = {}

    // 构造函数. Partial: ts 内置泛型工具类型, 让某个类型的所有属性变为可选的
    constructor(init: Partial<ClassButtonOptions>) {
        // icon 是组件, 如果被 reactive 转化为响应式对象, 会有不必要的性能开销. 所以这里使用 markRaw 将对象标记为不可转化为代理, 并返回该对象本身
        if (init.props?.icon) {
            init.props.icon = markRaw(init.props.icon)
        }
        Object.assign(this, init)
    }

    // 修改 props 属性
    // k extends keyof Props: 定义泛型 k, 取值范围是 Props 里所有的 key
    setProps<k extends keyof Props>(key: k, valeu: Props[k]) {
        if (!this.props) this.props = {}
        this.props[key] = valeu
    }

    setInnerHTML(value: string) {
        this.innerHTML || (this.innerHTML = '')
        this.innerHTML = value
    }

    // 万能修改器, 接受使用者传递的方法后, 把 this 传递过去并调用
    // 不安全, 所以不推荐使用
    update(fn: (self: this) => void) {
        fn(this)
    }
}

export function createButtonOptions(
    options: Partial<ClassButtonOptions>[]
): ClassButtonOptions[] {
    // 使用 reactive 让传入的配置项变成响应式数据
    return options.map(option => new ClassButtonOptions(reactive(option)))
}