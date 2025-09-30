// renderer.ts
import { h, resolveComponent, type VNode, type Component } from 'vue'
import type { 
  BaseComponentConfig, 
  ComponentConfig, 
  TextComponentConfig, 
  NativeElementConfig 
} from './types'

export class ComponentRenderer {
  /**
   * 渲染组件配置
   */
  static render(config: ComponentConfig, row?: any, index?: number): VNode {
    if (!config) return h('div')
    
    // 条件渲染判断
    if (config.if !== undefined) {
      const shouldRender = typeof config.if === 'function' 
        ? config.if(row, index) 
        : config.if
      if (!shouldRender) return h('div')
    }

    // 处理文本节点
    if (this.isTextConfig(config)) {
      return h('span', config.props?.text || '')
    }

    const {
      component,
      props = {},
      style,
      class: className,
      on,
      children,
      slots,
      dynamicProps = {}
    } = config as BaseComponentConfig

    // 处理动态属性
    Object.keys(dynamicProps).forEach(key => {
      if (typeof dynamicProps[key] === 'function') {
        props[key] = dynamicProps[key](row, index)
      }
    })

    // 处理事件 - 注入行数据
    const processedOn: Record<string, Function> = {}
    if (on) {
      Object.keys(on).forEach(eventName => {
        processedOn[eventName] = (...args: any[]) => {
          // 注入行数据和索引
          return on[eventName](...args, row, index)
        }
      })
    }

    // 解析组件
    const resolvedComponent = this.resolveComponent(component)

    // 处理子节点
    const childrenNodes = this.renderChildren(children, row, index)
    
    // 处理插槽
    const slotNodes = this.renderSlots(slots, row, index)

    return h(
      resolvedComponent,
      {
        ...props,
        style,
        class: className,
        ...processedOn
      },
      {
        default: () => [...childrenNodes, ...slotNodes.default || []],
        ...slotNodes
      }
    )
  }

  /**
   * 判断是否为文本配置
   */
  private static isTextConfig(config: ComponentConfig): config is TextComponentConfig {
    return config.component === 'text'
  }

  /**
   * 解析组件
   */
  private static resolveComponent(component: string | Component): Component | string {
    if (typeof component === 'string') {
      // 如果是原生 HTML 标签，直接返回字符串
      const nativeElements = ['div', 'span', 'button', 'a', 'p', 'i', 'strong', 'em']
      if (nativeElements.includes(component)) {
        return component
      }
      // 否则认为是 Element Plus 组件
      return resolveComponent(component)
    }
    return component
  }

  /**
   * 渲染子组件
   */
  private static renderChildren(
    children: ComponentConfig[] = [], 
    row?: any, 
    index?: number
  ): VNode[] {
    return children.map(child => this.render(child, row, index))
  }

  /**
   * 渲染插槽
   */
  private static renderSlots(
    slots: Record<string, ComponentConfig | string> = {},
    row?: any,
    index?: number
  ): Record<string, () => VNode | VNode[] | string> {
    const result: Record<string, () => VNode | VNode[] | string> = {}
    
    Object.keys(slots).forEach(slotName => {
      const slotConfig = slots[slotName]
      
      if (typeof slotConfig === 'string') {
        result[slotName] = () => slotConfig
      } else {
        result[slotName] = () => this.render(slotConfig, row, index)
      }
    })
    
    return result
  }
}