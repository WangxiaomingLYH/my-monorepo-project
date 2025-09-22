<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Person',
    // 使用vue3的setup写法
    setup() {
        // 数据
        let name = "张三"
        let age = 18
        let tel = "110"

        // 函数
        function changeName() {
            name = "zhang-san"
        }
        function changeAge() {
            age += 1
        }
        function showTel() {
            alert(tel)
        }
        // 这里返回的是一个对象，k v一直可以简写
        return { name, age, tel, changeName, changeAge, showTel }
    },

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