<template>
    <div class="person">
        <h2>数字：{{ sum }}</h2>
        <button @click="changeSum">点击+1</button>
    </div>
</template>


<script lang="ts" setup name="Person">
// 引入watch
import { ref, watch } from "vue"

let sum = ref(0)

function changeSum() {
    sum.value += 1
}

// watch是一个函数，里面最少有两个值，一个是被监视的数据，一个是回调函数
let stopWatch = watch(sum, (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if (sum.value > 10) {
        stopWatch.stop()
    }
})
console.log(stopWatch);


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