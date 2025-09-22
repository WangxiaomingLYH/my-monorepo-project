// 节流函数，使用方式： const throttleSearch = throttle(search, 500)

export function utilsThrottle<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let last = 0
    return function (this: any, ...args: Parameters<T>) {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, args)
        }
    }
}