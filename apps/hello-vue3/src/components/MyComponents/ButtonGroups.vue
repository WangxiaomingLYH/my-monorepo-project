<script setup lang="ts">
import { computed } from 'vue';

interface ButtonItems {
    icon: String,
    onClick: Function,
    isHide?: Boolean
}

const props = defineProps(['buttonGroupsConfig', 'buttonItems'])

const items = computed(() => {
    const items: ButtonItems[] = props.buttonItems?.filter((item: ButtonItems) => !item.isHide)
    return items
})
</script>

<template>
    <el-button-group v-bind="buttonGroupsConfig">
        <template v-for="(item, index) in items" :key="index">
            <el-button :icon="item.icon" @click="item.onClick"></el-button>
        </template>
    </el-button-group>
</template>

<style scoped lang="scss"></style>