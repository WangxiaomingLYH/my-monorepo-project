<script setup lang="ts">
import Versions from './components/Versions.vue'
import { useRouter } from 'vue-router'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')

const router = useRouter()
const btn1 = () => {
  console.log(router.getRoutes(), "@router")
  router.push({ name: 'Reader' })
  console.log(import.meta.env, "@import.meta")
  console.log(import.meta.env.VITE_APP_BASEURL, "@import.meta.env.VITE_APP_BASEURL = /api")
}



const data = {
  name: 'wxm'
}
const saveFileBtn = () => {
  window.electron.ipcRenderer.send("save-file", data)
}

</script>

<template>
  <div>
    <v-toolbar title="Toolbar" density="compact"></v-toolbar>
    <div class="w-10 h-10 bg-black"></div>
  </div>
</template>

<style>
@import "tailwindcss";
</style>