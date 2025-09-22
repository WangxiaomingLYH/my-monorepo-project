<template>
    <div class="person">
        <h2>当前数字为：{{ sum }}</h2>
        <button @click="addSum">sum+1</button>
    </div>
</template>


<script lang="ts" setup name="Person">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue"

let sum = ref(0)
function addSum() {
    sum.value += 1
}

// 创建前后(vue3的setup就是生命周期的中的创建钩子，所以没有创建前和创建完毕的生命周期了，setup()函数即完成了)
console.log("创建完毕");

// 挂载前后
onBeforeMount(() => {
    console.log("挂载前");
})
onMounted(() => {
    console.log("挂载完毕");
})

// 更新前后
onBeforeUpdate(() => {
    console.log("更新前");
})
onUpdated(() => {
    console.log("更新完毕");
})

// 卸载前后
onBeforeUnmount(() => {
    console.log("卸载前");
})
onUnmounted(() => {
    console.log("卸载完毕");
})
</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 10px;
}
</style>