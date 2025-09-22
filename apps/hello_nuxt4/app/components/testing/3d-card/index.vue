<script setup lang="ts">
import gsap from "gsap";

const wrapper = ref<HTMLElement | null>(null);
const character = ref<HTMLImageElement | null>(null);
// 主时间轴
const mainTimeline = gsap.timeline({ paused: true });
const forwardAnim = gsap.timeline();  // 正向动画时间轴

onMounted(() => {
    // 卡片初始状态
    gsap.set(wrapper.value, {
        perspective: 0,
        y: 0,
        rotateX: 0,
        boxShadow: "none",
        border: 1
    });
    // 图片初始状态
    gsap.set(character.value, {
        opacity: 0,
        z: 0,
        y: "0%"
    });

    // 卡片正向动画
    forwardAnim.to(wrapper.value, {
        duration: 0.5,
        perspective: 900,
        y: "-5%",
        rotateX: 25,
        z: 0,
        boxShadow: "2px 35px 32px -8px rgba(0,0,0,0.75)",
        ease: "power2.out"
    });
    // 图片正向动画
    forwardAnim.to(character.value, {
        opacity: 1,
        z: 100,
        y: "-20%",
        duration: 0.5,
        ease: "power2.out"
    });

    // 添加到主时间轴
    mainTimeline.add(forwardAnim);

    wrapper.value?.addEventListener('mouseenter', onEnter)
    wrapper.value?.addEventListener('mouseleave', onLeave)
})
const onEnter = () => {
    // 播放到正向动画结束点
    gsap.to(mainTimeline, {
        // 想象时间轴是一条跑道：time是你想跑到的位置(比如500米处)；duration是你跑这段距离所用的时间(比如0.5秒)
        // 跑道长度(forwardAnim.duration())和你跑步速度(duration)是两个独立变量。
        time: forwardAnim.duration(), // 目标位置：正向动画结束点
        duration: 0.5, // 移动到这个位置要花0.5秒
        ease: "power2.inOut"
    });
};

const onLeave = () => {
    // 反向播放到开始，利用时间轴，怎么来的就怎么回去
    gsap.to(mainTimeline, {
        time: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
};
</script>

<template>
    <!-- 仅保留必要的布局class -->
    <div ref="wrapper" class="w-[270px] h-[545px] relative overflow-hidden bg-black">
    </div>
</template>