<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
    </div>
</template>



<!-- 使用插件让组件name和setup语法糖结合在一起，配置插件的地方是vite.config.ts -->
<script lang="ts" setup name="Person123">
// 使用语法糖，可以不用再写setup函数，也不需要手动return值，定义的值可以直接渲染到dom中
let name = "张三"
</script>



<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style>