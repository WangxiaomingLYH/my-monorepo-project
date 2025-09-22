<script setup lang="ts">
import page1 from './page1.vue';
import page2 from './page2.vue';

// v-auto-animate
const jump = ref(false)
let page = computed(() => {
    return jump.value ? page2 : page1
})

// ------------------------------------- gsap ---------------------
// composables(hooks) 模块化
const { loadingRef, show, hide } = useGsapLoading()
</script>

<template>
    <div class="">
        <v-divider class="border-opacity-100 my-8" :thickness="2">
            <template #default>
                <div class="font-black">
                    使用 gsap 在组件跳转时的动画效果(hooks模块化)
                </div>
            </template>
        </v-divider>
        <v-btn @click="show">显示</v-btn>
        <v-btn @click="hide">隐藏</v-btn>
        <!-- 加入 GSAP 控制滑动 -->
        <div class="relative overflow-hidden">
            <component :is="page" @click="jump = !jump" />
            <div ref="loadingRef"
                class="loading absolute inset-0 w-full h-full bg-black text-3xl flex justify-center items-center">
                加载中...
            </div>
        </div>

        <v-divider class="border-opacity-100 my-8" :thickness="2">
            <template #default>
                <div class="font-black">
                    使用 v-auto-animate 在组件跳转时的动画效果
                </div>
            </template>
        </v-divider>
        <div v-auto-animate>
            <component :is="page" @click="jump = !jump" />
        </div>
    </div>
</template>