<script setup lang="ts">
import { useThemeStore } from "~/store/module/theme"
const themeStore = useThemeStore()
// 切换主题示例
const toggleTheme = () => {
    const newTheme = themeStore.currentTheme === 'dark' ? 'light' : 'dark'
    themeStore.setTheme(newTheme)
}
</script>

<template>
    <v-btn @click="toggleTheme" prepend-icon="mdi-theme-light-dark">
        light / dark
    </v-btn>
</template>