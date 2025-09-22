<script setup lang="ts">
import gsap from 'gsap'

const loading = ref<HTMLElement | null>(null)
let mainTimeline: gsap.core.Timeline | null = null

onMounted(() => {
    if (!loading.value) return

    gsap.set(loading.value, { y: '100%' })

    mainTimeline = gsap
        .timeline({ paused: true })
        .to(loading.value, {
            y: '0%',
            duration: 0.5,
            ease: 'power4.out'
        })
        // 出现
        .to(loading.value, {
            y: '100%',
            duration: 0.5,
            ease: 'power2.in'
        })
})

onBeforeUpdate(() => {
    console.log('触发了更新事件')
    if (mainTimeline) mainTimeline.tweenFromTo(0, 1)
})
</script>

<template>
    <div ref="loading"
        class="loading absolute inset-0 w-full h-full bg-black text-3xl flex justify-center items-center">
        加载中...
    </div>
</template>

<style scoped lang="scss"></style>