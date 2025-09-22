<script setup lang="ts">
// [xxx].vue 这种写法意味着通配所有的子路由
// 比如: /en/Article/xxx   /Article/yyy  父组件只需要
// router.push({
//     path: routePath + `/${catalogue}`, // 子路由名
//     query: { catalogue, path }
// })

const { query: { catalogue, path } } = useRoute()

const { data } = await useAsyncData(`${catalogue}-${path}`, () => {
    return queryCollection(catalogue as 'content' | 'readme').path(path as string).first()
})

useSeoMeta({
    title: data.value?.title,
    description: data.value?.description
})
definePageMeta({
    layout: "markdown"
})

onMounted(() => {
    console.log(data.value, "@data")
})
</script>

<template>
    <markdown-component-navigation :headings="data?.body.toc"></markdown-component-navigation>
    <content-renderer v-if="data" :value="data" />
    <div v-else>未查找到改文章!</div>
</template>