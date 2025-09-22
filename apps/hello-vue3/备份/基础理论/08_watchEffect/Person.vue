<template>
    <div class="person">
        <h2>当水温达到50 或者水位达到 80时，向服务器发送请求</h2>
        <h2>当前水温：{{ temp }}度</h2>
        <h2>当前水位：{{ height }}cm</h2>
        <button @click="changTemp">加温度</button>
        <button @click="changHeight">加水位</button>
        <button></button>
    </div>
</template>


<script lang="ts" setup name="Person">
import { ref, watch, watchEffect } from "vue"
let temp = ref(0),
    height = ref(0)
function changTemp() {
    temp.value += 10
}
function changHeight() {
    height.value += 10
}

// 普通的watch
// watch([temp, height], (value) => {
//     let [newTemp, newHeight] = value
//     if (newTemp >= 50 || newHeight >= 80) {
//         console.log("向服务器发送请求");
//     }
// })

// watchEffect
watchEffect(() => {  // 立即执行
    if (temp.value >= 50 || height.value >= 80) {  // 当逻辑中被监听的数据发生变化时，watchEffect被调用
        console.log("向服务器发送请求");
    }
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