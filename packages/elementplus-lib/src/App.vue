<script setup lang="ts">
import TableDemo from "./components/TableDemo.vue";
import FromDemo from "./components/FromDemo.vue";
import PaginationDemo from "./components/PaginationDemo.vue";
</script>

<template>
  <div>
    <el-divider>Pagination 组件的二次封装</el-divider>
    <PaginationDemo></PaginationDemo>
    <el-divider>Form 组件的二次封装</el-divider>
    <FromDemo></FromDemo>
    <el-divider>Table 组件的二次封装</el-divider>
    <TableDemo />
  </div>
</template>

<style scoped lang="scss"></style>