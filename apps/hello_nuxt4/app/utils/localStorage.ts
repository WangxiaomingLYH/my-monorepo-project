const getStorage = (target: string) => {
    return JSON.parse(localStorage.getItem(target) || '')
}

const setStorage = <T>(target: string, data: T) => {
    return localStorage.setItem(target, JSON.stringify(data))
}

const removeStorage = (target: string) => {
    localStorage.removeItem(target)
}

export { getStorage, setStorage, removeStorage }