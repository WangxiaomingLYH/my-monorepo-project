<script setup lang="ts">
import gsap from "gsap";
import readableStream from "./readable-stream.vue";
import indexDB from "./indexDB.vue";

const tween = ref<gsap.core.Tween | null>(null);

onMounted(() => {
  tween.value = gsap.to(".box", {
    duration: 1,
    repeat: -1,
    yoyo: true,
    stagger: 0.2,
    scale: 0.1,
    paused: true, // 不要自动执行
  });
});

const btnFn = () => {
  console.log("动画开始执行");
  console.log(tween.value, "@tween");
  tween.value?.play();
};
</script>

<template>
  <div class="container w-full p-3">
    <indexDB></indexDB>
    <readable-stream></readable-stream>
    <testing-demo-stream-reader></testing-demo-stream-reader>
    <testing-demo-file-slice></testing-demo-file-slice>
    <testing-demo-request></testing-demo-request>
    <testing-demo-javascript></testing-demo-javascript>
    <!-- <v-btn @click="btnFn">开始动画</v-btn>
    <div
      v-for="item in 100"
      :key="item"
      class="box w-1 h-1 bg-[#0ae448]"
      :data-index="item"
    ></div> -->
  </div>
</template>
