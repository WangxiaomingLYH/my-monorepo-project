<script setup lang="ts">
import Demo from "@/components/MyComponents/Demo.vue";
import { Table } from "wxm-elementplus-lib";
import dataList from './extend/mock.json'

const { total, rows } = dataList
</script>

<template>
    <div>
        <h1>wxm 公共组件库</h1>
        <Table ></Table>

        <h1>自己封装的组件</h1>
        <Demo></Demo>
    </div>
</template>

<style scoped lang="scss"></style>