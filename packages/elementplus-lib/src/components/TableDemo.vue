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
import { type TableColumnConfig } from "../lib/Table/extend";
import ButtonGrounp from "../lib/ButtonGroup/ButtonGrounp.vue"
import { ClassButtonOptions, createButtonOptions } from "../lib/ButtonGroup/extend/Class-Options"
import _ from "lodash";


const { total, rows } = TableData

// 携带 row 打开 Dialog 的操作
const dialogVisible = ref(false)
function viewData(rows: Object = {}) {
    dialogVisible.value = true
    const { } = rows

}


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
        },
        events: {
            click(ctx, rows) {
                viewData(rows)
            },
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
        // 配置多选按钮
        {
            type: "selection",
            width: '55',
            fixed: true
        },
        {
            label: 'App Name',
            prop: 'appName',
            sortable: true,
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
                    options: () => getButtonGrounpOptions(initButtonGrounpOptions)
                }
            }
        }
    ]
    return column
})

// 配置 Table 本级的配置项
const tableAttribute = {
    stripe: true,
    border: true,
    onSelectionChange: (val: any) => handleSelectionChange(val)
}

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any[]) => {
    multipleSelection.value = val
}
</script>

<template>
    <h1 style="width: 100%">Table 测试</h1>
    <el-button @click="() => { console.log(multipleSelection, '@multipleSelection') }">
        log选中数据
    </el-button>
    <Table :table-column="tableColumn" :table-data="rows" :table-attribute="tableAttribute" />

    <el-dialog v-model="dialogVisible" title="查看数据">
        <h1>查看数据</h1>

        <template #header>
            替代 title 属性
        </template>

        

        <!-- 这里一定要用到插槽 -->
        <template #footer>
            <el-button @click="dialogVisible = false">
                Cancel
            </el-button>
            <el-button type="primary" @click="dialogVisible = false">
                Confirm
            </el-button>
        </template>
    </el-dialog>
</template>
