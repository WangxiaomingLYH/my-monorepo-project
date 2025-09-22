<script setup lang="ts">
import { gsap } from 'gsap';

const box = ref<null | Document>(null)
const sphere = ref<null | Document>(null)

onMounted(() => {
    if (!sphere.value) return
    const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power1.inOut" }
    });
    timeline
        .to(box.value, {
            duration: 2,
            boxShadow: "0 0 10px 5px rgba(240, 240, 240,.5)",
        })
        .to(sphere.value, {
            duration: 2,
            scale: 1.1,
        }, '<')


    sphere.value.addEventListener("mouseenter", () => {
        timeline.pause();
    })
    sphere.value.addEventListener("mouseleave", () => {
        timeline.play();
    })
})
</script>

<template>
    <div class="">
        <div ref="box" class="flex justify-center items-center w-60 h-60 rounded-full bg-white border">
            <div ref="sphere" class="w-44 h-44 bg-black rounded-full">
            </div>
        </div>
    </div>
</template>