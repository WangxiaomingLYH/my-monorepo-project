<script setup lang="ts">
// 自定义组件 通过插槽接受值

import { useAttrs } from 'vue';

const props = defineProps(['message'])
const emit = defineEmits(['addSum'])
const attrs = useAttrs()
</script>

<template>
    <div class="">
        <slot name="default" />
        <h2>父组件传递的数据: {{ props.message }}</h2>
        <h2>父组件传递的数据, 简写: {{ message }}</h2>
        <h2>父组件传递的Attrs: {{ attrs }}</h2>
        <el-button @click="emit('addSum')">触发addSum事件</el-button>
        <el-button @click="console.log(attrs)">log Attrs</el-button>
    </div>
</template>
