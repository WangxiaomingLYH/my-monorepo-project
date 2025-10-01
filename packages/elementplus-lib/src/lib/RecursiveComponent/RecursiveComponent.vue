<script setup lang="ts">
import { computed, type Component } from 'vue'

/**
 * 递归组件:
 *  1. 将配置项传递的事件绑定到父级上 
 */


//  这一块有问题, 类型声明不对
const props = defineProps({
    child: Object,
    row: Object,
    propName: String
})

// console.log(props.child, "@child")
// console.log(props.row, "@row")
// console.log(props.propName, "@propName")


/**
 * 自动解析 props 中的函数值（如 content: (row) => row.appId）
 */
const resolvedProps = computed(() => {
    // 拿到传递的 props, 或置空
    const rawProps = props.child?.props || {}
    const finalProps: Record<string, any> = {}

    for (const key in rawProps) {
        const value = rawProps[key]
        // 拿到传递的 props 的所有属性, 如果是方法, 就执行它, 并传递 row 和 paropName
        finalProps[key] = typeof value === 'function' ? value(props.row) : value
    }
    return finalProps
})
</script>

<template>
    <!-- 如果没有子组件, 就传递 row 给最终渲染的组件; 否则不传递, 因为此时已经有 resolvedProps 方法可以获取到需要的属性了, 再传递会有无谓的性能消耗 -->
    <component :is="child?.type" v-bind="resolvedProps" :row="(child && child.child) ? null : row">
        <template v-if="child && child.child">
            <RecursiveComponent :child="child.child" :row="row" :prop-name="propName" />
        </template>
        <template v-else>
            {{ child?.innerHTML || (row && row[propName!]) }}
        </template>
    </component>
</template>