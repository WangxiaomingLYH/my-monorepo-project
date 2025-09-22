<script setup lang="ts">
const string = '一段文本'
const number = 10
const array = [1, 2, 4]
const object = { name: 'wxm' }
const set = new Set()
const map = new Map()
const boolne = false
const undefine = undefined
const function1 = () => {

}

function objectType(item: any) {
    if (item === undefine) return 'undefine'
    if (item === null) return 'null'
    let type = ''
    type = typeof item
    if (type === 'object') {
        type = Object.getPrototypeOf(item).constructor.name
    }

    return type
}

function log() {
    console.log(objectType(string))
    // objectType(number)
    // objectType(array)
    // objectType(null)
}
</script>

<template>
    <v-divider>JS测试按钮</v-divider>
    <v-btn @click="log">JS测试</v-btn>
</template>

<style scoped lang="scss"></style>