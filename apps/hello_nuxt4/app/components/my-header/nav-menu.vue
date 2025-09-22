<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { currentRoute } = useRouter()
const { handleNavigation } = useLangNavigation()
// 支持两种格式的路由配置：
// 1. 有子菜单: { title: string, content: Array<{path: string, label: string}> }
// 2. 无子菜单: { title: string, path: string }
const defaultRouteList = computed(() => {
    return [
        // 无子路由的直接导航项
        {
            title: t('home'),
            path: '/'
        },
        // 有子路由的菜单项
        {
            title: t('docs'),
            path: 'article'
        },
        {
            title: t('component'),
            content: [
                {
                    path: 'Testing',
                    label: t('testing')
                },
                {
                    path: 'MyComponent',
                    label: t('component')
                }
            ]
        },
        {
            title: t('contact'),
            path: 'contact'
        }
    ]
})

// 处理路由路径
const routeList = computed(() => {
    // const prefix = currentRoute.value.path.includes('/en') ? '/en/' : ''

    return defaultRouteList.value.map(item => {
        // 无子路由的情况
        if (!item.content) {
            const path = item.path === '/' ? '' : item.path
            return { ...item, path }
        }

        // 有子路由的情况
        const content = item.content.map(target => {
            const path = target.path
            return { ...target, path }
        })
        return { ...item, content }
    })
})
</script>

<template>
    <template v-for="route in routeList" :key="route.title">
        <!-- 有子菜单的情况 -->
        <v-menu v-if="route.content">
            <template #activator="{ props }">
                <v-btn v-bind="props" variant="flat">
                    <template #append>
                        <v-icon icon="mdi-chevron-down" class="ml-1" />
                    </template>
                    {{ route.title }}
                </v-btn>
            </template>
            <v-list density="compact">
                <v-list-item v-for="item in route.content" :key="item.label" :value="item.label"
                    @click="handleNavigation(item.path)">
                    <v-list-item-title>
                        {{ item.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- 无子菜单的情况 -->
        <v-btn v-else variant="flat" @click="handleNavigation(route.path)">
            {{ route.title }}
        </v-btn>
    </template>
</template>