<script setup lang="ts">
const request = indexedDB.open("myDataBase", 1);

request.onupgradeneeded = function (event: any) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains("users")) {
    db.createObjectStore("users", { keyPath: "id" });
  }
};

request.onsuccess = function (event: any) {
  const db = event.target.result;
  console.log("数据库打开成功");
};

request.onerror = function (event) {
  console.error("数据库打开失败", event);
};
</script>

<template>
  <div class="">
    <v-divider>Index DB 测试</v-divider>
    <h1>Index DB</h1>
  </div>
</template>

<style scoped lang="scss"></style>
