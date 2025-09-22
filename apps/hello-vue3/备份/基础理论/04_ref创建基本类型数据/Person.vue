<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">显示电话</button>
    </div>
</template>


<script lang="ts" setup name="Person">

// 引入ref，谁需要是响应式数据，就给谁用
import { ref } from "vue"

let name = ref("张三"),
    age = ref(18),
    tel = "110"
console.log(name);

function changeName() {
    name.value = "zhang-san"
}
function changeAge() {
    age.value = 22
}
function showTel() {
    alert(tel)
}

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