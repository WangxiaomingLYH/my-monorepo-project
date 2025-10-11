<script setup lang="ts">
import { ref } from "vue";
import Pagination from "../lib/Pagination/Pagination.vue";

// 似乎只需要接受一个 total 和
type Size = "" | "small" | "default" | "large"
// 尽量使用模板上的 v-model 和事件绑定, 而不是把它们放在配置项中
const total = ref(400)
const options = {
    layout: 'total, sizes, prev, pager, next, jumper',
    total: total.value,
    background: true,
    size: 'small' as Size,
}
const pageSize = ref(10)
const currentPage = ref(1)


function onHandleCurrentChange() {
    console.log("handleCurrentChange 执行了")
}
</script>

<template>
    <Pagination :pagination="onHandleCurrentChange" :options="options" v-model:page-size="pageSize"
        v-model:current-page="currentPage"></Pagination>
    <!-- <Pagination :pagination="handleSizeChange" :options="options" v-model:page-size="pageSize" v-model:current-page="currentPage"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
</template>

<style scoped lang="scss"></style>