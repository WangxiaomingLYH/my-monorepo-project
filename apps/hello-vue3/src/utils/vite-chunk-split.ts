/**
 * vite 的分包策略
 * 创建自动化 manualChunks 函数
 * @param options 配置项
 */
export function createAutoChunkSplit(options?: {
    mergeThresholdKB?: number
    customSplit?: Record<string, string>
}) {
    const { mergeThresholdKB = 100, customSplit = {} } = options || {}

    const smallPackages = new Set<string>()
    const bigPackages = new Set<string>()

    return function manualChunks(id: string) {
        if (!id.includes('node_modules')) return

        const match = id.match(/node_modules\/(?:\.pnpm\/)?(@?[^/]+)(?:\/([^/]+))?/)
        if (!match) return

        const scope = match[1]
        const name = match[2]
        const pkgName = name ? `${scope}/${name}` : scope

        // ✅ 优先使用用户配置的 customSplit
        if (pkgName in customSplit) return customSplit[pkgName]

        // ✅ 特殊处理体积较小的库（合并）
        const smallPkgList = [
            'dayjs',
            'mitt',
            'pinia',
            'qs',
            'axios',
            '@vueuse/core',
            'nprogress'
        ]
        if (smallPkgList.includes(pkgName)) {
            return 'vendor/common'
        }

        // ✅ 特殊处理体积大的库（强制独立）
        const bigPkgList = [
            'element-plus',
            'echarts',
            'lodash',
            'ant-design-vue'
        ]
        if (bigPkgList.includes(pkgName)) {
            return `vendor/${pkgName}`
        }

        // ✅ 默认按包名拆
        return `vendor/${pkgName}`
    }
}
