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

  const user = { id: 1, name: "Alice", age: 25 };
  addUser(db, user);
};

request.onerror = function (event) {
  console.error("数据库打开失败", event);
};

function addUser(db: any, user: any) {
  const transaction = db.transaction(["users"], "readwrite");
  const store = transaction.objectStore("users");

  const request = store.add(user);

  request.onsuccess = function () {
    console.log("用户添加成功");
  };

  request.onerror = function (event: any) {
    console.error("添加失败", event);
  };
}
</script>

<template>
  <div class="">
    <v-divider>Index DB 测试</v-divider>
    <h1>Index DB</h1>
    <div draggable="true">1</div>
    <div draggable="true">2</div>
    <div draggable="true">3</div>
    <div draggable="true">4</div>
    <div draggable="true">5</div>
  </div>
</template>

<style scoped lang="scss"></style>
