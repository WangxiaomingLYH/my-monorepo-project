<script setup lang="ts">
const dateRange = ref([])

const log = () => {
    console.log(dateRange.value, "@dateRange")
}
</script>

<template>
    <v-btn @click="log">点击</v-btn>
    <v-date-picker v-model="dateRange" multiple="1"></v-date-picker>
</template>

<style scoped lang="scss"></style>