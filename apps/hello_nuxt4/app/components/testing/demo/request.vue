<script setup lang="ts">
import { utilsConcurrencyRequest } from "~/utils/HandlingLargeFiles/concurrencyRequest";

const urls = [
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=1",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=2",
    options: { method: "POST" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=3",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=4",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=5",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=6",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=7",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=8",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=9",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=10",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=11",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=12",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=13",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=14",
    options: { method: "GET" },
  },
  {
    url: "/api/hello?tn=75144485_5_dg&ch=2&ie=utf-8&wd=15",
    options: { method: "GET" },
  },
];

interface Urls {
  url: string;
  options?: RequestInit;
}

// 然后就是添加各种边界判断及细节, 比如用户传入空数组; 传入的不是数组; 最大并发数传入 0; 最大并发请求数超过数组长度等
const concurrentRequests = async (urls: Urls[], max: number) => {
  let targetIndex = 0;
  let results: Response[] = [];

  const _request = Array(max)
    .fill(null)
    .map(async () => {
      while (targetIndex < urls.length) {
        const currentIndex = targetIndex;
        targetIndex++;
        const { url, options } = urls[currentIndex]!;
        const res = await fetch(url, options);
        results[currentIndex] = res;
      }
    });
  await Promise.all(_request);
  console.log(results, "@results");
  return results;
};
</script>

<template>
  <div class="">
    <v-divider :thickness="3">并发请求测试</v-divider>
    <v-btn @click="concurrentRequests(urls, 3)">并发请求按钮</v-btn>
    <v-btn @click="utilsConcurrencyRequest(urls, 5)">
      封装好的并发请求按钮</v-btn
    >
  </div>
</template>

<style scoped lang="scss"></style>
