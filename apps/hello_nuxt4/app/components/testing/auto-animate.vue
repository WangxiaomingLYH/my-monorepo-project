<script setup lang="ts">
const show = ref(false)
const num = ref(0)

const addNum = () => {
    num.value++
}
</script>

<template>
    <div v-auto-animate>
        <h2>11111111111</h2>
        <strong class="dropdown-label" @click="show = !show">
            通过 v-if 的淡入淡出效果
        </strong>
        <p class="dropdown-content" v-if="show">
            宁静的海洋，一大堆灰尘悬挂在阳光下，数十万个星系射电望远镜的第一概念。当天文学家降下来的一片光线后代，在地下室和头盔上的两个幽灵般的白色人物柔和地跳入了意识猎户的剑的百科全书《银河系》中。另一个世界上，虫洞网络的蓬松网络涉及虫洞网络，并提供了漂亮的故事，其中几乎十亿美元，数十亿美元，数十亿美元，数十亿美元.
        </p>


    </div>
    <v-btn @click="addNum">NUM ++：{{ num }}</v-btn>
    <v-card max-width="300">
        <div v-auto-animate>
            <div v-for="value in num" :key="value">{{ value }}</div>
        </div>
    </v-card>
</template>