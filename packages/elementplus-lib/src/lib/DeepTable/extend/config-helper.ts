// config-helper.ts
import type { 
  TableConfig, 
  TableColumnConfig, 
  BaseComponentConfig,
  ComponentConfig
} from './types'

export class TableConfigHelper {
  /**
   * 创建按钮配置
   */
  static createButton(config: {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    text?: string
    icon?: string
    size?: 'large' | 'default' | 'small'
    onClick?: (row: any, index: number) => void
    disabled?: boolean | ((row: any, index: number) => boolean)
    loading?: boolean | ((row: any, index: number) => boolean)
  }): BaseComponentConfig {
    return {
      component: 'el-button',
      props: {
        type: config.type,
        size: config.size,
        icon: config.icon,
        disabled: config.disabled,
        loading: config.loading
      },
      dynamicProps: {
        disabled: (row, index) => 
          typeof config.disabled === 'function' 
            ? config.disabled(row, index)
            : config.disabled,
        loading: (row, index) =>
          typeof config.loading === 'function'
            ? config.loading(row, index)
            : config.loading
      },
      on: {
        click: (event, row, index) => config.onClick?.(row, index)
      },
      children: config.text ? [{ component: 'text', props: { text: config.text } }] : []
    }
  }

  /**
   * 创建文本配置
   */
  static createText(text: string): ComponentConfig {
    return {
      component: 'text',
      props: { text }
    }
  }

  /**
   * 创建标签配置
   */
  static createTag(config: {
    type?: 'success' | 'info' | 'warning' | 'danger'
    text?: string | ((row: any, index: number) => string)
    effect?: 'dark' | 'light' | 'plain'
    closable?: boolean
  }): BaseComponentConfig {
    return {
      component: 'el-tag',
      props: {
        type: config.type,
        effect: config.effect,
        closable: config.closable
      },
      dynamicProps: {
        text: (row, index) => 
          typeof config.text === 'function' 
            ? config.text(row, index)
            : config.text
      }
    }
  }

  /**
   * 创建 Tooltip 包裹的组件
   */
  static createTooltipWrapper(config: {
    tooltipContent: string | ((row: any, index: number) => string)
    content: ComponentConfig
    placement?: string
    effect?: 'dark' | 'light'
  }): BaseComponentConfig {
    return {
      component: 'el-tooltip',
      props: {
        placement: config.placement || 'top',
        effect: config.effect || 'dark'
      },
      dynamicProps: {
        content: (row, index) => 
          typeof config.tooltipContent === 'function'
            ? config.tooltipContent(row, index)
            : config.tooltipContent
      },
      children: [config.content]
    }
  }

  /**
   * 创建 Tooltip 包裹的按钮
   */
  static createTooltipButton(config: {
    tooltipContent: string | ((row: any, index: number) => string)
    buttonConfig: BaseComponentConfig
    placement?: string
    effect?: 'dark' | 'light'
  }): BaseComponentConfig {
    return this.createTooltipWrapper({
      tooltipContent: config.tooltipContent,
      content: config.buttonConfig,
      placement: config.placement,
      effect: config.effect
    })
  }

  /**
   * 创建图标按钮
   */
  static createIconButton(config: {
    icon: string
    tooltip?: string | ((row: any, index: number) => string)
    onClick?: (row: any, index: number) => void
    color?: string
    size?: 'large' | 'default' | 'small'
  }): ComponentConfig {
    const buttonConfig = this.createButton({
      icon: config.icon,
      type: 'text',
      onClick: config.onClick,
      size: config.size
    })

    if (config.tooltip) {
      return this.createTooltipButton({
        tooltipContent: config.tooltip,
        buttonConfig
      })
    }

    return buttonConfig
  }

  /**
   * 创建操作列
   */
  static createActionColumn(actions: ComponentConfig[], options?: {
    label?: string
    width?: string | number
    align?: 'left' | 'center' | 'right'
    fixed?: 'left' | 'right'
  }): TableColumnConfig {
    return {
      label: options?.label || '操作',
      width: options?.width || '150px',
      align: options?.align || 'center',
      fixed: options?.fixed,
      render: {
        component: 'div',
        class: 'action-buttons',
        children: actions
      }
    }
  }
}