<template>
    <div class="person">
        <!-- 深度监视 -->
        <h2>姓名：{{ person.name }}</h2>
        <h2>年龄：{{ person.age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changePerson">修改整个人</button>
    </div>
</template>


<script lang="ts" setup name="Person">
// 引入watch
import { ref, watch } from "vue"

let person = ref({
    name: "张三",
    age: 18
})

function changeName() {
    person.value.name += "~"
}
function changeAge() {
    person.value.age += 1
}
function changePerson() {
    person.value = {
        name: "李四",
        age: 99
    }
}
// 监听的是整个person，只有被重新赋值时，才会触发监听
let stopWatch1 = watch(person, (newValue, oldValue) => {
    console.log("浅监听-监听地址", newValue, oldValue);
})
// 深度监听，添加第三个参数，是一个对象，里面放着watch的配置项，deep:true ==> 开启深度监听
let stopWatch3 = watch(person, (newValue, oldValue) => {
    // 修改对象的属性值也会触发，但是newValue和oldValue指向的都是person，所以都是一样的，只有在修改person本身时，newValue和oldValue才会不同
    console.log("深度监听", newValue, oldValue);
}, { deep: true })

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