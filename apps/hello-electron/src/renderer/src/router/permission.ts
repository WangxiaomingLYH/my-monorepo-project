// 导航守卫
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, NavigationGuardNext } from "vue-router";

// 前置守卫
const beforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
    console.log('前置守卫')
    // if (to.path === '/login') {
    //     return
    // }

    // if (!localStorage.getItem('TOKEN')) {
    //     return '/login'
    // }
}

// 后置守卫
const affterEach = () => {
    console.log('后置守卫')
}

export { beforeEach, affterEach }