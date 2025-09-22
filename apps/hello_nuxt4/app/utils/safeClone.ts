/**
 * 安全深拷贝对象，防止循环引用和过深嵌套导致的性能问题或栈溢出
 * 
 * @param obj - 需要拷贝的对象或数组
 * @param seen - 用于记录已经访问过的对象，防止循环引用（内部使用 WeakSet）
 * @param maxDepth - 最大递归深度，超过该深度将直接返回原对象，防止过深嵌套
 * @param currentDepth - 当前递归深度（内部使用），初始调用无需传递
 * @returns 返回安全拷贝后的对象或数组
 */
export function utilsSafeClone(
    obj: any,
    seen = new WeakSet(),
    maxDepth = 5,
    currentDepth = 0
): any {
    // 1. 如果不是对象或数组，直接返回原值（基本类型无需拷贝）
    if (!obj || typeof obj !== 'object') return obj

    // 2. 避免循环引用：如果对象已经被访问过，直接返回原对象
    if (seen.has(obj)) return obj

    // 3. 防止递归过深：超过 maxDepth 则不再递归，直接返回原对象
    if (currentDepth >= maxDepth) return obj

    // 4. 将当前对象加入 seen 集合，防止循环引用
    seen.add(obj)

    // 5. 如果是数组，递归拷贝每一项
    if (Array.isArray(obj)) {
        return obj.map(item => utilsSafeClone(item, seen, maxDepth, currentDepth + 1))
    }

    // 6. 如果是对象，递归拷贝每个属性
    const result: Record<string, any> = {}
    for (const key in obj) {
        // 使用递归，同时 depth +1
        result[key] = utilsSafeClone(obj[key], seen, maxDepth, currentDepth + 1)
    }

    // 7. 返回拷贝后的对象
    return result
}
