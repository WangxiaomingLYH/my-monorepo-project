// config-helper.ts
import type {
    TableConfig,
    TableColumnConfig,
    BaseComponentConfig
} from './type'

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
    }): BaseComponentConfig {
        return {
            component: 'el-button',
            props: {
                type: config.type,
                size: config.size,
                icon: config.icon,
                disabled: config.disabled
            },
            dynamicProps: {
                disabled: (row, index) =>
                    typeof config.disabled === 'function'
                        ? config.disabled(row, index)
                        : config.disabled
            },
            on: {
                click: (event, row, index) => config.onClick?.(row, index)
            },
            children: config.text ? [{ component: 'text', props: { text: config.text } }] : []
        }
    }

    /**
     * 创建 Tooltip 包裹的按钮
     */
    static createTooltipButton(config: {
        tooltipContent: string
        buttonConfig: BaseComponentConfig
        placement?: string
    }): BaseComponentConfig {
        return {
            component: 'el-tooltip',
            props: {
                content: config.tooltipContent,
                placement: config.placement || 'top'
            },
            children: [config.buttonConfig]
        }
    }

    /**
     * 创建图标按钮
     */
    static createIconButton(config: {
        icon: string
        tooltip?: string
        onClick?: (row: any, index: number) => void
        color?: string
    }): BaseComponentConfig {
        const buttonConfig = this.createButton({
            icon: config.icon,
            type: 'text',
            onClick: config.onClick
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
    static createActionColumn(actions: BaseComponentConfig[]): TableColumnConfig {
        return {
            label: '操作',
            width: '150px',
            align: 'center',
            render: {
                component: 'div',
                class: 'action-buttons',
                children: actions
            }
        }
    }
}