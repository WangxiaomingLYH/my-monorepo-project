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

// 模拟一个异步函数
function promiseFn(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('3 秒过去了')
            resolve('成功')
        }, 3000)
    })
}

//  把点击事件需要的操作封装成一个异步方法
async function searchFn(ctx: Partial<ClassButtonOptions>, rows: Object) {
    ctx.setInnerHTML!('查找中...')
    await promiseFn()
    ctx.setInnerHTML!('查询成功')
}
//  ElButtonGrounp 组件初始化配置项
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
                    // 传递数组, 只能拿到所需要的属性, 此时 supplierName 是 undefined
                    content: [['appId', 'appName'], ({ appId, appName, supplierName }: Record<string, any>) => `应用ID是：${appId}, name 是: ${appName}, supplierName是:${supplierName}`],
                },
                child: {
                    type: ElButton,
                }
            }
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
            label: 'Action',
            prop: 'action',
            child: {
                type: ButtonGrounp,
                props: {
                    // 方案一: 哪个组件传递的事件, 哪个组件执行
                    options: () => getButtonGrounpOptions(initButtonGrounpOptions)
                }
            }
        }
    ]
    return column
})
</script>

<template>
    <Table :table-column="tableColumn" :table-data="rows" />
</template>
