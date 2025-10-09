<script lang="ts" setup>
import { ElTableColumn } from "element-plus";
import RecursiveComponent from "../RecursiveComponent/RecursiveComponent.vue";
import { type Props } from "./extend/index"

const ElTableColumnAttrs = ElTableColumn.props

defineProps<Props>()

import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log('Table 组件接收到的 $attrs:', attrs)
</script>

<template>
    <el-table :data="tableData" v-bind="tableAttribute">
        <template v-for="(column, index) in tableColumn" :key="index">
            <el-table-column v-bind="column">
                <!-- 如果有子项, 就使用递归组件渲染子项; 如果没有子项, 什么都不渲染, 自动展示 prop 值  -->
                <template v-if="column.child" #default="{ row }">
                    <RecursiveComponent :child="column.child" :row="row" :prop-name="column.prop" />
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>
