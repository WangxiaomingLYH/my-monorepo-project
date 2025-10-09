import type { Component } from "vue"

export type Child = {
    type: string | Component,
    props?: Record<string, any>
    innerHTML?: string,
    options?: Object
    click?: Function,
    child?: Child,
}
export interface TableColumnConfig {
    label: string
    prop: string
    width?: string | number
    child?: Child
}
export interface Props {
    tableColumn: TableColumnConfig[],
    tableData: any
}