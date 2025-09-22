import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
    type Theme = 'light' | 'dark'
    const themeCookie = useCookie('vuetify-theme')
    const vuetifyTheme = useTheme()
    const currentTheme = ref<Theme>('light')

    // 初始化主题 - 在模板文件中初始化执行一次
    const initTheme = () => {
        const savedTheme = resolveVuetifyTheme(themeCookie.value as string)
        setTheme(savedTheme)
    }

    // 切换主题
    const setTheme = (newTheme: Theme) => {
        currentTheme.value = newTheme

        // Vuetify 主题切换
        const targetVuetifyTheme = resolveVuetifyTheme(newTheme)
        vuetifyTheme.change(targetVuetifyTheme)

        // 持久化逻辑
        themeCookie.value = newTheme
    }

    // 解析最终使用的主题
    const resolveVuetifyTheme = (theme: string) => {
        if (theme === undefined) return 'light'
        return theme as 'light' | 'dark'
    }
    return { currentTheme, initTheme, setTheme }
})