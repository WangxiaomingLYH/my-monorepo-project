<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { onMounted, useTemplateRef, computed } from 'vue';

const props = defineProps(['FormAttributes', 'FormItems'])
const FormValue: { [key: string]: any } = defineModel()
const formInstance = useTemplateRef<FormInstance>('formRef')

const items = computed(() => props.FormItems.filter((item: { isHide?: boolean }) => !item.isHide))

// 导出表单方法
defineExpose({
    // 表单校验方法
    validate<T>(...args: T[]) {
        // 这里可以携带参数, 具体更具项目而定
        return formInstance.value?.validate()
    },
    resetFilelds<T>(...args: T[]) {
        return formInstance.value?.resetFields()
    }
})
</script>

<template>
    <el-form ref="formRef" v-bind="FormAttributes" :model="FormValue">
        <el-row>
            <el-col v-for="(item, index) in items" :key="index" :span="item.span || 24">
                <el-form-item :label="item.label" :prop="item.key">
                    <component :is="item.type" v-bind="item.props" v-model="FormValue[item.key]"></component>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<style scoped lang="scss"></style>