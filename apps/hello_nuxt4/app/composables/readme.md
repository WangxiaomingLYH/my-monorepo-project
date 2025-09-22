---
title: composables目录
---

1. 存放可复用的组合式函数的
2. nuxt3 会自动扫描该目录下的文件，组件中无需手动导入
3. 功能上类似 vue3 的 hooks，推荐命名规则为 useXxx
4. 组件内可以直接使用
5. 和 utils 的区别

```ts
示例
export const useXxx = () => {
    const yyy = ref(0)
    function changYyy(num:number){
        yyy.value = yyy.value + num
    }
    return{
        yyy,
        changYyy
    }
}

组件内
const { yyy,changYyy } = useXxx()
<p>yyy: {{ yyy }}</p>
<button @click="changYyy(3)">+ 3</button>
```