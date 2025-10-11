<script setup lang="ts">
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