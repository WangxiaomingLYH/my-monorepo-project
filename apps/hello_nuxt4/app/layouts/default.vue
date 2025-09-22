<script lang="ts" setup>
/**
 * 在 nuxt3 的模板文件中， 是通过 slot 展示使用该模板的内容的。可以将 slot 理解为模板的出口
 * 布局应用参考：https://vuetifyjs.com/zh-Hans/features/application-layout/
 * 1. 使用 AppLink 集中处理路由信息
 */

import { useThemeStore } from "~/store/module/theme"
const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
    <v-app>
        <my-header></my-header>
        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
        <my-footer></my-footer>
    </v-app>
</template>