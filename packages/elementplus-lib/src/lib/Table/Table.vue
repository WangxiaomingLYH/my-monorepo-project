<script lang="ts" setup>
import { computed, ref, type Component } from "vue";
import mockData from "./extend/mock-data.json";

import RecursiveComponent from "../RecursiveComponent/RecursiveComponent.vue";
import ButtonGrounp from "../ButtonGroup/ButtonGrounp.vue"

import { ElButton, ElTooltip } from "element-plus";

type Child = {
    type: string | Component,
    props?: Record<string, any>
    innerHTML?: string,
    click?: Function,
    child?: Child,
}
interface TableColumnConfig {
    label: string
    prop: string
    width?: string | number
    child?: Child
}

const { rows, total } = mockData

function logA() {
    console.log('AAAAAAA1')
}

async function copyToClipboard(row: any) {
    console.log(row, "@row")
    try {
        await navigator.clipboard.writeText('1');
        console.log('触发了事件')
        console.log('触发了事件')
        console.log('触发了事件')
        console.log('触发了事件1')
    } catch (err) {
        console.error('复制失败:', err)
    }
}

const tableColumn = computed(() => {
    const column: TableColumnConfig[] = [
        {
            label: 'App Name',
            prop: 'appName',
            child: {
                // 封装的子组件, 这里使用 el-button 示例
                // 传递 props 事件等, 插槽就放到封装的子组件中, 以防套娃
                // 事件是不是触发该组件的比较好? 手动的传递过去还需要模板上手动的注册, 如果要设定 click change 事件呢    默认只接受点击事件, 如果需要触发其他事件, 则自定义组件
                type: 'div',
                // 可以通过 copyToClipboard 传递点击事件
                click: logA
            }
        },
        {
            label: 'Id',
            prop: 'appId',
            child: {
                type: ElTooltip,
                props: {
                    effect: "dark",
                    placement: "top",
                    // 通过传递方法的形式, 拿到  row, 然后处理 row
                    content: (row: any, name: string) => `应用ID是：${row.appId}, name 是: ${name}`,
                },
                child: {
                    type: ElButton,
                    props: {
                        link: true,
                        type: 'primary'
                    }
                },
            }
        },
        {
            label: 'Supplier',
            prop: 'supplierName'
        },
        {
            label: 'Currency',
            prop: 'currencyType'
        },
        {
            label: 'Exchange Rate',
            prop: 'appRatio'
        },
        {
            label: 'Exchange Rate',
            prop: 'appRatio',
            child: {
                type: ButtonGrounp,
                click: (rows: object) => {
                    console.log(rows, "rows")
                }
            }
        },
    ]
    return column
})
</script>

<template>
    <el-table :data="rows" style="width: 100%">
        <template v-for="(column, index) in tableColumn" :key="index">
            <el-table-column :prop="column.prop" :label="column.label" :width="column.width">
                <!-- 如果有子项, 就使用递归组件渲染子项; 如果没有子项, 什么都不渲染, 自动展示 prop 值  -->
                <template v-if="column.child" #default="{ row }">
                    <RecursiveComponent :child="column.child" :row="row" :prop-name="column.prop" />
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>
