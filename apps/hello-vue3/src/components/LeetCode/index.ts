// 1. 给定一个整型参数 n，请你编写并返回一个 counter 函数。这个 counter 函数最初返回 n，每次调用它时会返回前一个值加 1 的值 (n, n+1, n+2，等等)。
const createCounter = (number: number) => {
    // 使用闭包存储数据
    let count = number
    const addCount = () => {
        return count++
    }
    return addCount
}
// 简写
const createCounter2 = (number: number) => {
    // 使用闭包存储数据
    let count = number
    return () => {
        return count++
    }
}
const counter = createCounter(10)
counter() // 10
counter() // 11
counter() // 12


// 2. 请你编写一个异步函数，它接收一个正整数参数 millis ，并休眠 millis 毫秒。要求此函数可以解析任何值。
const sleep = (millis: number) => {
    const promise = new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
    return promise
}

// 3. 请你编写一段代码实现一个数组方法，使任何数组都可以调用 array.last() 方法，这个方法将返回数组最后一个元素。如果数组中没有元素，则返回 -1 。
// declare global {  // 在模板中使用则需要向外暴露全局声明
//     interface Array<T> {
//         last(): T | -1;
//     }
// }
interface Array<T> {
    last(): T | -1;
}

const array = ['1', '2', '3', null]

Array.prototype.last = function () {
    if (this.length === 0) return -1;
    return this[this.length - 1];
};

console.log(array.last(), "Array.prototype")