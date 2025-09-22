<script setup lang="ts">
// app-bar：https://vuetifyjs.com/zh-Hans/components/app-bars/#section-4f7f7528
const openDialog = ref(false)
const currentTheme = useCookie('vuetify-theme')
const vImgSrc = computed(() => {
    if (currentTheme.value === 'dark') return '/vuetify-logo-dark.png'
    return '/vuetify-logo-light.png'
})
</script>

<template>
    <div class="MyHeader">
        <v-app-bar class="pl-3 pr-3" :elevation="1">
            <!-- 左侧内容 -->
            <template #prepend>
                <v-img :src="vImgSrc" width="128px"></v-img>
                <div class="px-1"></div>
                <v-btn class="pl-3 text-disabled" @click="openDialog = true">
                    <template #prepend>
                        <v-icon icon="mdi-magnify"></v-icon>
                    </template>
                    bing.com<span class="py-1 px-2 ms-2 rounded text-caption border text-disabled">
                        {{ $t('search') }}
                    </span>
                </v-btn>
            </template>
            <!-- 右侧内容 -->
            <template #append>
                <my-header-nav-menu></my-header-nav-menu>
                <v-divider class="mx-2" vertical></v-divider>
                <my-header-chang-theme></my-header-chang-theme>
                <my-header-locales-list></my-header-locales-list>
            </template>
        </v-app-bar>
        <!-- 检索弹出层 -->
        <my-header-search-dialog v-model:open-dialog="openDialog"></my-header-search-dialog>
    </div>
</template>