<script lang="ts" setup>
import { useAttrs } from "vue";
import RecursiveComponent from "../RecursiveComponent/RecursiveComponent.vue";
import { type Props } from "./extend/index"

// 通过 useProp 获取绑定的属性
const attr = useAttrs()
const props = defineProps<Props>()

</script>

<template>
    <el-table :data="tableData" v-bind="attr">
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
