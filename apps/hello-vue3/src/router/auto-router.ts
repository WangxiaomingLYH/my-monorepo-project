import type { Component } from "vue";
import type { RouteRecordRaw } from 'vue-router'

/**
 * 自动生成路由配置
 */
export const generateAutoRoutes = (redirectNotFoundTo: string = '/'): RouteRecordRaw[] => {
    const pages: Record<string, () => Promise<Component>> = import.meta.glob('../pages/**/*.vue', { eager: false })
    // pages匹配到的值: 
    // { ../pages/About.vue: () => import("/src/pages/About.vue?t=1749190234497") }

    const routes: RouteRecordRaw[] = []

    for (const path in pages) {
        let routePath = path
            .replace('../pages', '')
            .replace(/\.vue$/, '') // pages/User/my.vue  ===> http://localhost:5174/user/my
            .replace(/\[([^\]]+)\]/g, ':$1') // pages/User/[id].vue  ===> http://localhost:5174/user/:123456
            .replace(/_/g, ':')  // pages/User/user_id.vue  ===> http://localhost:5174/user/user:123456
            .replace(/\/:/g, '/:')  // 修正路径格式, 假设路径多产生了冒号  ===> 'user/::id' → 'user/:id'
        /**经过上一步处理, 路由传参规则是: 
         * src/pages/
         *  |--- About.vue
         *  |--- Aboout/
         *          |--- [id].vue  ===> About/:id
         *  |--- user_id   ===> user:id
         */

        // 将index自动转换成根目录
        if (routePath.toLowerCase() === '/index') {
            routePath = ''
        }

        // 这里所有导入的组件都是懒加载
        // pages[path]: ===> () => import("/src/pages/About.vue?t=1749190234497")
        const route: RouteRecordRaw = {
            path: routePath === '' ? '/' : routePath,
            component: pages[path],
            name: routePath.replace(/\//g, '') || 'home',
            props: true  // 启用props接收路由参数
        }

        routes.push(route)
    }

    // 确保静态路由优先于动态路由
    routes.sort((a, b) => {
        const aDynamic = a.path.includes(':')
        const bDynamic = b.path.includes(':')

        if (aDynamic && !bDynamic) return 1
        if (!aDynamic && bDynamic) return -1
        return a.path.split('/').length - b.path.split('/').length
    })

    // 添加未匹配路径重定向（如果配置了redirectNotFoundTo）
    if (redirectNotFoundTo) {
        routes.push({
            path: '/:pathMatch(.*)*',
            redirect: redirectNotFoundTo
        })
    }

    return routes
}