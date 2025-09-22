<script setup lang="ts">
// 我们把文件读取放在主进程 → 通过 base64 发给渲染器，再在渲染器用 epubjs 解析并 renderTo 某个 DOM 节点。epub.js 支持 ArrayBuffer/Blob/URL 的输入方式。这样既满足了渲染器只负责 UI，又规避了直接暴露 fs。

import { ref } from 'vue'
import ePub from 'epubjs'

const viewer = ref<HTMLElement | null>(null)
let rendition: any = null
let book: any = null

function base64ToUint8Array(base64: string) {
    const binary = atob(base64)
    const len = binary.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
}

async function openFile() {
    // 调用 preload 暴露的 API
    // @ts-ignore
    const res = await window.electronAPI.openEpub()
    if (!res) return
    const { data: base64 } = res
    const uint8 = base64ToUint8Array(base64)
    // 方法 A：直接用 ArrayBuffer
    book = ePub(uint8.buffer)
    rendition = book.renderTo(viewer.value!, { width: '100%', height: '100%' })
    rendition.display()
    // 你可以监听 locationChanged 等事件来更新进度
}
console.log(window.api,"@api");
</script>

<template>
    <div class="reader-wrap">
        <button @click="openFile">打开 EPUB</button>
        <div id="viewer" ref="viewer" style="width:100%; height: calc(100vh - 60px);"></div>
    </div>
</template>

<style scoped>
.reader-wrap {
    display: flex;
    flex-direction: column;
}

#viewer {
    border: 1px solid #ddd;
    box-sizing: border-box;
}
</style>