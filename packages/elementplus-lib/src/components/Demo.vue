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

// const { total, rows } = TableData
const buttonGrounpOptions: Partial<ClassButtonOptions>[] = [
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
            type: 'info',
        }
    }
]
function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
    const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
    return buttonGrounpOptions
}

const tableColumn = computed(() => {
    const column: TableColumnConfig[] = [
        // {
        //     label: 'App Name',
        //     prop: 'appName',
        //     child: {
        //         // 封装的子组件, 这里使用 el-button 示例
        //         // 传递 props 事件等, 插槽就放到封装的子组件中, 以防套娃
        //         // 事件是不是触发该组件的比较好? 手动的传递过去还需要模板上手动的注册, 如果要设定 click change 事件呢    默认只接受点击事件, 如果需要触发其他事件, 则自定义组件
        //         type: 'div',
        //         // 可以通过 copyToClipboard 传递点击事件
        //         click: logA
        //     }
        // },
        // {
        //     label: 'Id',
        //     prop: 'appId',
        //     child: {
        //         type: ElTooltip,
        //         props: {
        //             effect: "dark",
        //             placement: "top",
        //             // 通过传递方法的形式, 拿到  row, 然后处理 row
        //             content: (row: any, name: string) => `应用ID是：${row.appId}, name 是: ${name}`,
        //         },
        //         child: {
        //             type: ElButton,
        //             props: {
        //                 link: true,
        //                 type: 'primary',
        //                 options: buttonGrounpOptions
        //             },

        //         },
        //     }
        // },
        // {
        //     label: 'Supplier',
        //     prop: 'supplierName'
        // },
        // {
        //     label: 'Currency',
        //     prop: 'currencyType'
        // },
        // {
        //     label: 'Exchange Rate',
        //     prop: 'appRatio'
        // },
        {
            label: 'Exchange Rate',
            prop: 'appRatio',
            child: {
                type: ButtonGrounp,
                props: {
                    options: buttonGrounpOptions
                }
            }
        },
    ]
    return column
})

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
</script>

<template>
    <ButtonGrounp :options="getButtonGrounpOptions(buttonGrounpOptions)"></ButtonGrounp>
    <ButtonGrounp :options="getButtonGrounpOptions(buttonGrounpOptions)"></ButtonGrounp>
    <!-- <Table :table-column="tableColumn" :table-data="rows" /> -->
</template>
