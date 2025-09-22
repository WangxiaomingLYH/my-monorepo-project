<script setup lang="ts">
import type { ContentCollectionItem, ReadmeCollectionItem } from '@nuxt/content'

const { t } = useI18n()
const { path: routePath } = useRoute()
const router = useRouter()


const { data: article } = await useAsyncData('all-article', () => {
    return queryCollection('content').all()
})
const { data: readme } = await useAsyncData('all-readme', () => {
    return queryCollection('readme').all()
})


// 跳转到文章页
const jump = async (catalogue: 'content' | 'readme', path: string) => {
    const url = router.resolve({
        path: routePath + `/${catalogue}`,
        query: { catalogue, path }
    }).href  // 生成完整 URL

    window.open(url, '_blank') // 在新标签页打开
}

// 修改文章内容, 暂未开发该功能, 需等动态添加文件功能开发完成后
const editContent = ref({})
const openDialog = ref(false)
// 修改内容方法
const editContentBtn = async (catalogue: 'content' | 'readme', path: string) => {
    editContent.value = await getContent(catalogue, path)
    console.log(catalogue, "@catalogue")
    console.log(path, "@path")
    console.log(editContent.value, "@editContent.value")
    // openDialog.value = true
}

// 添加博客文章
import type MarkdownComponentWriteFiles from '~/components/markdown/component/write-files.vue'

const writeFilesRef = ref<InstanceType<typeof MarkdownComponentWriteFiles> | null>(null)
const openBlogDialog = ref(false)
const addBlog = () => {
    openBlogDialog.value = true
    console.log(openBlogDialog.value, "@openBlogDialog.value")
}

</script>

<template>
    <v-row>
        <v-col cols="6">
            <v-card>
                <template #title>
                    {{ t('readme') }}
                </template>
                <v-list :items="readme">
                    <template #title="{ item }">
                        <v-btn variant="plain" @click="jump('readme', item.path)">
                            {{ item.title }}
                        </v-btn>
                        <!-- <v-icon icon="mdi-pencil"></v-icon> -->
                    </template>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card>
                <template #title>
                    {{ t('article') }}
                </template>
                <v-list :items="article">
                    <template #title="{ item }">
                        <v-btn variant="plain" @click="jump('content', item.path)">
                            {{ item.title }}
                        </v-btn>
                        <!-- <v-icon icon="mdi-pencil"></v-icon> -->
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="relative">
        <div class="absolute bottom-10 -right-40">
            <v-btn @click="addBlog" icon="mdi-pen-plus" size="x-large" color="indigo-darken-1" />
        </div>
    </v-row>

    <!-- 添加博客文章 -->
    <v-dialog v-model="openBlogDialog" transition="dialog-bottom-transition" fullscreen class="h-screen">
        <v-toolbar>
            <v-btn icon="mdi-close" @click="openBlogDialog = false"></v-btn>

            <v-toolbar-title>

            </v-toolbar-title>

            <v-toolbar-items>
                <v-btn :text="t('save')" variant="text" @click="writeFilesRef?.saveContent" />
            </v-toolbar-items>
        </v-toolbar>
        <markdown-component-write-files ref="writeFilesRef" />
    </v-dialog>

    <!-- 修改文章 -->
    <v-dialog v-model="openDialog">
    </v-dialog>
</template>