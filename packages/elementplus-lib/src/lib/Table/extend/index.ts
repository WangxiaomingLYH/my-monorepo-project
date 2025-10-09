import type { Component, ComponentInstance } from "vue"
import { ElTable, ElTableColumn } from "element-plus";

export type Child = {
    type: string | Component,
    props?: Record<string, any>
    innerHTML?: string,
    options?: Object
    click?: Function,
    child?: Child,
}
export type ElTableColumnConfig = Partial<ComponentInstance<typeof ElTableColumn>>
export interface TableColumnConfig extends ElTableColumnConfig {
    child?: Child
}
export type TableAttribute = Partial<ComponentInstance<typeof ElTable>>
export interface Props {
    tableColumn: TableColumnConfig[],
    tableData: any[],
    tableAttribute?: TableAttribute
}