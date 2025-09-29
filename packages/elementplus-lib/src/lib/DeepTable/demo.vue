<!-- 使用示例 -->
<template>
  <AdvancedTable :config="tableConfig" @page-change="handlePageChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdvancedTable from './AdvancedTable.vue'
import { TableConfigHelper } from './config-helper'
import type { TableConfig } from './types'

const tableConfig = ref<TableConfig>({
  data: [
    { id: 1, name: '张三', status: 1, department: '技术部' },
    { id: 2, name: '李四', status: 0, department: '产品部' }
  ],
  columns: [
    {
      prop: 'name',
      label: '姓名',
      width: '120px'
    },
    {
      prop: 'department',
      label: '部门',
      width: '120px'
    },
    {
      prop: 'status',
      label: '状态',
      render: {
        component: 'el-tag',
        dynamicProps: {
          type: (row) => row.status === 1 ? 'success' : 'info',
          text: (row) => row.status === 1 ? '启用' : '禁用'
        }
      }
    },
    TableConfigHelper.createActionColumn([
      TableConfigHelper.createTooltipButton({
        tooltipContent: '编辑用户',
        buttonConfig: TableConfigHelper.createIconButton({
          icon: 'Edit',
          onClick: (row) => handleEdit(row)
        })
      }),
      TableConfigHelper.createTooltipButton({
        tooltipContent: '删除用户',
        buttonConfig: TableConfigHelper.createIconButton({
          icon: 'Delete',
          onClick: (row) => handleDelete(row)
        })
      })
    ])
  ],
  tableProps: {
    stripe: true,
    border: true
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pageSizes: [10, 20, 50],
    layout: 'total, sizes, prev, pager, next, jumper'
  }
})

const handleEdit = (row: any) => {
  console.log('编辑:', row)
}

const handleDelete = (row: any) => {
  console.log('删除:', row)
}

const handlePageChange = (page: number, size: number) => {
  console.log('分页变化:', page, size)
}
</script>