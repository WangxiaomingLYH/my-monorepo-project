<script setup lang="ts">
/**
 * 1. 父组件必须传递 v-bind:pagination=Function, 通知父组件重新调用数据
 * 2. 父组件可以传递 v-bind:options=Object<ElPaginationInstance>, 用于展示 total sizes 等
 * 3. 父组件可以通过 v-model:page-size v-model:current-page 传递: pageSize 和 currentPage
 * 4. 分页条对插槽的需求不大, 只有一个默认插槽
 */
import { h, useAttrs, useSlots } from 'vue';
import { ElPagination } from 'element-plus';
import type { ElPaginationProps } from "./Pagination";

defineProps<ElPaginationProps>()

const attrs = useAttrs()
const slots = useSlots()
</script>

<template>
    <component :is="h(ElPagination, { ...attrs }, slots)" v-bind="options" @current-change='pagination'>
    </component>
</template>

<style scoped lang="scss"></style>