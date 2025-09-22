import { defineStore } from "pinia";

// 1. 推荐使用 uswXxxStory命名
// 2. defineStore()是一个函数，传入的第一个值最好和该文件名称一致
// 3. state是真正存储数据的地方，也是一个函数，需要向外return
// 4. 需要向外暴露，所以要加上 export
// export const useCountStore = defineStore("count", {
//     state() {
//         return {
//             sum: 1
//         }
//     },
//     // 1. getters可以直接拿到state，把它当作参数传入后就能用
//     // 2. 使用第二种写法后，ts会报错，因为没有限制类型。():number就是没有传参后限制类型的
//     getters: {
//         // 第一种写法：
//         // bigSum(state) {
//         //     return state.sum * 10
//         // }
//         // 第一种写法的衍生，使用箭头函数，因为不使用this
//         // bigSum: state => state.sum * 10

//         // 第二种写法：使用this
//         bigSum(): number {
//             return this.sum * 10
//         }
//     }
// })

import { computed, ref } from "vue";
export const useCountStore = defineStore("count", () => {
    // 定义数据，相当于state
    let sum = ref(1)

    // 加工数据，相当于getters
    let bigSum = computed(() => {
        return sum.value * 10
    })

    // 定义方法，相当于actions
    function getTalk() {
        console.log("发生请求");
    }

    // 向外暴露
    return { sum, bigSum, getTalk }
})