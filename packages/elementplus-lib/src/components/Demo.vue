<script lang="ts" setup>
import { computed, ref, type Component } from "vue";
import { ElButton, ElTooltip } from "element-plus";
import {
    Check,
    Delete,
    Edit,
    Search,
} from '@element-plus/icons-vue'
import TableData from "./extend/mock.json";
import Table from "../lib/Table/Table.vue";
import { type TableColumnConfig } from "../lib/Table/extend/index";
import ButtonGrounp from "../lib/ButtonGroup/ButtonGrounp.vue"
import { ClassButtonOptions, createButtonOptions } from "../lib/ButtonGroup/extend/Class-Options"
import _ from "lodash";

const { total, rows } = TableData

//  把点击事件需要的操作封装成一个异步方法
function promiseFn(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('3 秒过去了')
            resolve('成功')
        }, 3000)
    })
}

async function searchFn(ctx: Partial<ClassButtonOptions>, rows: Object) {
    console.log("Edit")
    console.log(ctx, "@ctx")
    console.log(rows, "@rows")
    ctx.setInnerHTML!('查找中...')
    await promiseFn()
    ctx.setInnerHTML!('查询成功')
}
// 按钮组配置项
const initButtonGrounpOptions: Partial<ClassButtonOptions>[] = [
    {
        props: {
            circle: true,
            icon: Edit,
            type: 'primary'
        }
    },
    {
        props: {
            circle: true,
            icon: Check,
            loading: true
        }
    },
    {
        props: {
            circle: true,
            icon: Delete,
            type: 'danger'
        },
    },
    {
        id: 'search',
        innerHTML: '搜索全部数据',
        props: {
            icon: Search,
            type: 'info'
        },
        events: {
            click: (ctx, rows) => searchFn(ctx, rows)
        }
    }
]
function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
    const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
    return buttonGrounpOptions
}

// table 列配置项
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
                }
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
                props: {
                    options: () => getButtonGrounpOptions(initButtonGrounpOptions)
                }
            }
        },
    ]
    return column
})
</script>

<template>
    <Table :table-column="tableColumn" :table-data="rows" />
</template>
