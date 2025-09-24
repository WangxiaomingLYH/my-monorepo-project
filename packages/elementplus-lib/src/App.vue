<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Demo from './components/Demo.vue';


</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <Demo color="red" ref="demo"></Demo>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
