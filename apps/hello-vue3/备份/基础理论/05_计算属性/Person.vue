<template>
    <div class="person">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        <span>全名：{{ name }}</span>
        <button @click="changeName">修改名字</button>
    </div>
</template>


<script lang="ts" setup name="Person">
import { ref, computed } from 'vue';
let firstName = ref("张"),
    lastName = ref("三")


// 计算属性
let name = computed({
    get() {
        return firstName.value + lastName.value
    },
    set(val) { // 传入的val是name.value被修改之后的值
        console.log("set函数被触发", val);
    }
})

function changeName() {
    // 通过方法修改name.value
    name.value = "李-四"
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