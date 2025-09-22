<template>
    <div>
        <h1>{{ document.title }}</h1>

        <!-- 显示文章内容 -->
        <div v-html="document.body"></div>

        <!-- 自动生成目录 -->
        <ContentTOC :depth="3" />
    </div>
</template>

<script setup>
import { useContent } from '@nuxt/content';
import { useRoute } from 'vue-router';

// 获取当前路由的文档内容
const route = useRoute();
const { document } = await useContent(route.path).fetch();
</script>