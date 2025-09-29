// renderer.ts
import { h, resolveComponent, type VNode } from 'vue'
import type { BaseComponentConfig, ComponentConfig } from './type'

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

    const {
      component,
      props = {},
      style,
      class: className,
      on,
      children,
      slots,
      dynamicProps = {}
    } = config

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
    const resolvedComponent = typeof component === 'string'
      ? resolveComponent(component)
      : component

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