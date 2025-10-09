<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    child: Object,
    row: Object,
    propName: String
})

/**
 * 属性解析逻辑：
 * 1. 数组格式 [字段数组, 转换函数] - 用于需要从row提取特定字段并转换的场景
 *    示例: [['id', 'name'], ({id, name}) => `ID: ${id}, Name: ${name}`]
 *    
 * 2. 函数格式 () => any - 用于生成配置项等不需要row数据的场景
 *    示例: () => getButtonOptions(initOptions)
 *    
 * 3. 其他值 - 直接作为属性值传递
 */
const resolvedProps = computed(() => {
    // 拿到传递的 props, 或置空
    const rawProps = props.child?.props || {}
    const finalProps: Record<string, any> = {}

    for (const key in rawProps) {
        const value = rawProps[key]

        // 如果传递的是数组并第 2 个是方法, 则传递所需要的值
        if (Array.isArray(value) && typeof value[1] === 'function') {
            const [fieldPaths, fn] = value
            const fieldValues: Record<string, any> = {}
            for (const element of fieldPaths) {
                fieldValues[element] = props.row?.[element]
            }
            finalProps[key] = fn(fieldValues)
        }
        // 需要把读取 row 和初始化配置项的方法分开
        else if (typeof value === 'function') {
            finalProps[key] = value()
        }
        // 否则当作普通属性
        else {
            finalProps[key] = value
        }
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