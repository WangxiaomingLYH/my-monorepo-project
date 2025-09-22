<script setup lang="ts">
const config = [
    {
        title: '北坡',
        describe: '贡嘎山海拔7556米，呈角峰尖锐、刃脊料峭的巨大金字塔形。由于山体构造、岩性不同，且迎风坡、背风坡降水、光照等条件各不相同，这个“金字塔”的各个面也呈现出了不同的样貌。图为贡嘎山北坡，相比其他方向坡面，西北山脊与东北山脊之间的贡嘎山北坡崖面，是一个近于等腰三角形的坡面。',
        author: '摄影/王建军',
        imageUrl: './images/01.jpg'
    },
    {
        title: '北坡',
        describe: '拉达克，是世界上最崎岖、最荒芜的山地之一。它的海拔在3000—7000米之间，大部分都是人烟稀少的高地，只有在海拔3000米左右的印度河上游附近、在喜马拉雅的冰川融水滋养出的小块绿洲上，拉达克的居民们世世代代繁衍生息，形成了一个个小小的村、镇。',
        author: '摄影/王建军',
        imageUrl: './images/01.jpg'
    },
]
</script>

<template>
    <v-carousel hide-delimiters>
        <v-carousel-item src="./images/01.jpg" cover>
            <v-btn>dianji </v-btn>
        </v-carousel-item>

        <v-carousel-item src="./images/02.jpg" cover></v-carousel-item>

        <v-carousel-item src="./images/03.jpg" cover></v-carousel-item>
    </v-carousel>
</template>

<style scoped lang="scss"></style>