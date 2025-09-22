// useGsapLoading.ts
import { onMounted, onBeforeUpdate, ref } from 'vue'
import gsap from 'gsap'

export function useGsapLoading() {
    const loadingRef = ref<HTMLElement | null>(null)
    let mainTimeline: gsap.core.Timeline | null = null

    onMounted(() => {
        console.log('useGsapLoading 的 onMounted 执行了')
        if (!loadingRef.value) return

        gsap.set(loadingRef.value, { y: '100%' })

        // 三段式时间轴
        mainTimeline = gsap.timeline({ paused: true })
            .to(loadingRef.value, {
                y: '0%',
                duration: 0.5,
                ease: 'power4.out'
            }) // 出现
            .to(loadingRef.value, {
                y: '100%',
                duration: 0.5,
                ease: 'power2.in'
            })
    })

    onBeforeUpdate(() => {
        if (mainTimeline) mainTimeline.tweenFromTo(0, 1)
        console.log('useGsapLoading 的 onBeforeUpdate 执行了')
    })

    return {
        loadingRef,
        play: () => {
            mainTimeline?.tweenFromTo(0, 1)
            console.log('play 执行了')
        },
        show: () => {
            console.log('show 执行了')

            mainTimeline?.play(0)
        },
        hide: () => mainTimeline?.play(1),
    }
}
