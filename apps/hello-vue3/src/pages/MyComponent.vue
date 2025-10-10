<script setup lang="ts">
import dataList from './extend/mock.json'
import Demo from "@/components/MyComponents/Demo.vue";
import TableDemo from "@/components/MyComponents/TableDemo.vue";

const { total, rows } = dataList
</script>

<template>
    <div>
        <h1>wxm 公共组件库</h1>
        <TableDemo></TableDemo>

        <h1>自己封装的组件</h1>
        <Demo></Demo>
    </div>
</template>

<style scoped lang="scss"></style>