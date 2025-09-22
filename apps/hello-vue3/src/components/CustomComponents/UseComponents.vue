<script setup lang="ts">
// 使用自定义组件示例

import CustomComponents from "@/components/CustomComponents/CustomComponents.vue";
import { createReusableTemplate } from "@/hooks/useCreateTemplate";
import { ref } from "vue";

const { DefineTemplate, UseTemplate } = createReusableTemplate()



const sum = ref(1)
const add = () => {
    sum.value++
}

const addSum = () => {
    sum.value++
}

</script>

<template>
    <div class="p-[30px]">
        <CustomComponents message="hello CustomComponents" @addSum="addSum" class="CustomComponents">
            <h2>通过插槽自定义组件内容</h2>
        </CustomComponents>
        <el-divider></el-divider>
        <CustomComponents message="hello CustomComponents" @addSum="addSum" class="CustomComponents">
            <h2>通过插槽自定义组件内容2</h2>
        </CustomComponents>
        <el-divider></el-divider>




        <h2>{{ sum }}</h2>
        <el-divider></el-divider>

        <DefineTemplate #default="{ message, onSend, showButton }">
            <h1>DefineTemplate内容</h1>
            <h2>{{ message }}</h2>
            <el-button v-if="showButton" @click="onSend">add Sum</el-button>
        </DefineTemplate>

        <UseTemplate message="hello DefineTemplate" @send="addSum" />
        <el-divider></el-divider>
        <UseTemplate message="hello DefineTemplate11111111" :showButton="true" @send="addSum" />
        <el-divider></el-divider>
        <UseTemplate message="hello DefineTemplate" @send="addSum" />

    </div>
</template>

<style scoped lang="less"></style>