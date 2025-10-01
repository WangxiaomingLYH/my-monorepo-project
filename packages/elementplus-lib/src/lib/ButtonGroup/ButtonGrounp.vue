<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ClassButtonOptions } from "./extend/Class-Options";

// 接收传递的配置项
type Options = Partial<ClassButtonOptions>
const props = defineProps<{
    options: Options[],
    row:Object
}>()


console.log(props.row,"@row")

// 注入事件逻辑: 先 loading=true, 然后等待执行传递的方法, 然后 loading=true
function createButtonEventHandler(classButtonOption: Options) {
    const { click: optionClick } = classButtonOption.events || {}
    return async () => {
        changePropsLoading(true)
        if (optionClick) {
            await optionClick(classButtonOption)
        }
        changePropsLoading(false)
    }
    // 改变 loading 属性方法
    function changePropsLoading(value: boolean = false) {
        classButtonOption.setProps!('loading', value)
    }
}

props.options.forEach((classButtonOption) => {
    classButtonOption.events = {
        click: createButtonEventHandler(classButtonOption)
    }
})
</script>

<template>
    <template v-for="(value, index) in options" :key="index">
        <component :is="ElButton" v-bind="value.props" v-on="value.events || {}">
            <template #default v-if="value.innerHTML">
                {{ value.innerHTML }}
            </template>
        </component>
    </template>
</template>

<style scoped lang="scss"></style>