<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    color: "red" | "blue"
}>()
const text = ref('默认内容')
function onChangeContent(content: string) {
    text.value = content
}
defineExpose({
    onChangeContent
})
</script>

<template>
    <div class="myComp" :style="{ color: color }">
        {{ text }}
    </div>
</template>

<style scoped lang="scss">
.myComp {
    padding: 30px;
    border: 1px solid #000;

    .red {
        color: red;
    }

    .blue {
        color: blue;
    }
}
</style>