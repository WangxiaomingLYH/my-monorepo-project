<script setup lang="ts">
// 二次封装的 input 组件
import { h, getCurrentInstance, type VNodeRef, useAttrs, useSlots, ref } from "vue";
import { ElInput } from 'element-plus';

const props = defineProps()
const attrs = useAttrs()
const slots = useSlots()


// 方法一
// const instance = getCurrentInstance()
// const changeRef = (inputInstance: Record<string, any>) => {
//     if (!instance) {
//         throw new Error('Component instance is not available. Ensure this is called within a Vue component.')
//     }
//     instance.exposeProxy = inputInstance || {}
// }
// 方法一 END

const exposed = ref<Record<string, any>>({});
const changeRef = (inputInstance: Record<string, any>) => {
    exposed.value = inputInstance || {};
}
defineExpose({
    exposed
});
</script>

<template>
    <div class="">
        <h2>二次封装 input 自定义的内容</h2>
        <component :is="h(ElInput, { ...attrs, ...props, ref: changeRef as VNodeRef }, slots)" />
    </div>
</template>