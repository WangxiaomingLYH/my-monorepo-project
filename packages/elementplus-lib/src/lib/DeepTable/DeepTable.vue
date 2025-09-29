<!-- AdvancedTable.vue -->
<template>
    <div class="advanced-table">
        <el-table v-bind="tableProps" :data="tableData" v-loading="loading">
            <template v-for="column in columns" :key="column.prop">
                <el-table-column :prop="column.prop" :label="column.label" :width="column.width"
                    :min-width="column.minWidth" :align="column.align">
                    <!-- 自定义表头 -->
                    <template v-if="column.headerRender" #header="scope">
                        <ComponentRenderer :config="column.headerRender" :row="scope" />
                    </template>

                    <!-- 自定义单元格 -->
                    <template #default="scope">
                        <template v-if="column.render">
                            <ComponentRenderer :config="column.render" :row="scope.row" :index="scope.$index" />
                        </template>
                        <template v-else-if="column.cellRenderer">
                            {{ column.cellRenderer(scope) }}
                        </template>
                        <template v-else>
                            {{ scope.row[column.prop] }}
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <!-- 分页 -->
        <div v-if="pagination" class="pagination-container">
            <el-pagination v-bind="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentRenderer } from './extend/renderer'
import type { TableConfig, TableColumnConfig } from './extend/type'

interface Props {
    config: TableConfig
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'page-change': [page: number, size: number]
    'sort-change': [sort: any]
}>()

const { columns, data, tableProps, loading, pagination } = props.config

const tableData = computed(() => data)

const handleSizeChange = (size: number) => {
    emit('page-change', pagination?.currentPage || 1, size)
}

const handleCurrentChange = (page: number) => {
    emit('page-change', page, pagination?.pageSize || 10)
}
</script>