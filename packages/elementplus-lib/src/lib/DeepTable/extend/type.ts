// types.ts
import { type Component, type VNode, type CSSProperties } from 'vue'

// 基础组件配置
export interface BaseComponentConfig {
    // 组件类型：字符串对应 Element Plus 组件名，对象对应自定义组件
    component: string | Component
    // 组件属性
    props?: Record<string, any>
    // 组件样式
    style?: CSSProperties
    // 类名
    class?: string | string[]
    // 事件处理器
    on?: Record<string, Function>
    // 子组件配置
    children?: ComponentConfig[]
    // 插槽内容
    slots?: Record<string, ComponentConfig | string>
    // 条件渲染
    if?: boolean | ((row: any, index: number) => boolean)
    // 动态属性
    dynamicProps?: Record<string, (row: any, index: number) => any>
}

// 列配置
export interface TableColumnConfig {
    prop?: string
    label: string
    width?: number | string
    minWidth?: number | string
    align?: 'left' | 'center' | 'right'
    // 单元格渲染配置
    render?: ComponentConfig
    // 表头渲染配置
    headerRender?: ComponentConfig
    // 作用域插槽的备选方案
    cellRenderer?: (scope: { row: any; $index: number }) => VNode
}

// 表格配置
export interface TableConfig {
    columns: TableColumnConfig[]
    data: any[]
    // 其他 el-table 属性
    tableProps?: Record<string, any>
    // 加载状态
    loading?: boolean
    // 分页配置
    pagination?: PaginationConfig | false
}