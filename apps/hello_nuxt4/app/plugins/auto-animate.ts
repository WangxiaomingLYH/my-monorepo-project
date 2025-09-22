/**
 * 使用插件注册自定义指令，在组件中 v-auto-animate
 * 1. 当元素从 DOM 中添加或移除时，会自动应用淡入淡出效果
 *  - 也就是 v-if
 * 2. 当元素在 DOM 中移动位置时，会平滑过渡到新位置
 *  - 如列表重新排序
 * 3. 新增元素可能伴随轻微缩放效果
 * 4. 只能应用到子级组件，也就意味着必须用 v-auto-animate 包裹住子元素
 */

// <v-card max-width="300">
// <div v-auto-animate>
//     <div v-for="value in num" :key="value">{{ value }}</div>
// </div>
// </v-card>

import { defineNuxtPlugin } from '#app'
import autoAnimate from '@formkit/auto-animate'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('auto-animate', {
        mounted(el, binding) {
            autoAnimate(el, binding.value || {})
        }
    })
})

/**
 * defineNuxtPlugin：定义一个 nuxt 插件
 *  - nuxtApp：nuxt 提供的上下文对象，包含 vue 应用实例和其他 nuxt 功能
 *  - nuxtApp.vueApp.directive()：在 vue 应用上注册一个自定义指令
 *  - mounted：vue 自定义指令的钩子，当绑定的元素挂载到 DOM 时触发
 *      - el：指令绑定的元素
 *      - binding：指令的​​绑定值​​（如 <div v-auto-animate="{ duration: 500 }"> 中的 { duration: 500 }）
 * autoAnimate：接收两个参数，第一个是 DOM 元素，第二个是一个配置项
 *  - duration：动画持续时间，单位 ms
 *  - easing：动画曲线 easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | ({} & string);
 *  - disrespectUserMotionPreference：忽略用户偏好，开启动画效果
 */

/**
 * v-auto-animate="{ duration: 800, easing: 'ease-in-out' }"：淡入淡出动画，组件内容会在 800ms 内逐渐淡入或淡出，ease-in-out 缓动会让过渡更加平滑
 * v-auto-animate="{ duration: 600, easing: 'ease-in-out' }"：
 */