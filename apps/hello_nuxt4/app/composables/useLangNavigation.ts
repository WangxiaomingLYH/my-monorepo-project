/**
 * 先判断当前路由路径下, 是否包含 /en, 即当前是否英语环境
 * 根据当前语言环境, 对跳转的路由地址进行前缀添加
 * 
 * 然后根据判断传入的 path 是否带有 /, 没有则自动补全, 提高代码强壮度 
 */

export const useLangNavigation = () => {
    const route = useRoute()
    const handleNavigation = (path: string) => {
        const isEnglish = route.path.startsWith('/en')
        const prefix = isEnglish ? '/en' : ''
        const target = `${prefix}${path.startsWith('/') ? path : `/${path}`}`
        navigateTo(target)
    }
    return { handleNavigation }
}