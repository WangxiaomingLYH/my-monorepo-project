<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Search,
} from '@element-plus/icons-vue'
import { ElButton } from 'element-plus';
import { ClassButtonOptions, createButtonOptions } from "./extend/Class-Options";


const options: Partial<ClassButtonOptions>[] = createButtonOptions([
    {
        props: {
            circle: true,
            icon: Edit,
            type: 'primary'
        }
    },
    // {
    //     props: {
    //         circle: true,
    //         icon: Check,
    //         loading: true
    //     }
    // },
    // {
    //     props: {
    //         circle: true,
    //         icon: Delete,
    //         type: 'danger'
    //     },
    // },
    // {
    //     id: 'search',
    //     innerHTML: '搜索全部数据',
    //     props: {
    //         icon: Search,
    //         type: 'info',
    //     }
    // }
])


// 给配置项注入点击事件
// 在配置项上, 因为还没有经过 ClassButtonOptions 实例化, 所以拿不到该实例对象
// 需要经过实例化之后, options 变成由 ClassButtonOptions 实例组成的数组 
options.forEach((classButtonOption) => {
    // 此时的 btn 是 ClassButtonOptions 实例化

    // 合并配置项方法
    function mergeEvents(options: object) {
        classButtonOption.events = options
    }

    // 改变 loading 属性
    function changePropsLoading(value: boolean = false) {
        classButtonOption.setProps!('loading', value)
    }

    // 批量添加通用点击方法, 应该需要传递一个异步函数, 直接结束后, loading=false
    mergeEvents({
        click: async () => {
            changePropsLoading(true)
            // 模拟延迟操作, 这里可以直接传入一个 Promise 方法, 等待 then 执行完成后, 再让 loading 属性为 false
            await promiseFn
            changePropsLoading()
        }
    })
    // 单独定义某个方法
    if (classButtonOption.id === 'search') {
        mergeEvents({
            click: () => {
                changePropsLoading(true)
                classButtonOption.setInnerHTML!('loading')
            }
        })
    }
})

//  把点击事件需要的操作封装成一个异步方法
const promiseFn = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 3000)
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