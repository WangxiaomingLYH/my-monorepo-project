<script setup lang="ts">
import { ref } from 'vue'

const editorContent = ref('')

const saveContent = async () => {
    await useFetch('/api/save-content', {
        method: 'POST',
        body: {
            filename: 'my-article.md',
            content: editorContent.value
        }
    })
}




const { data } = await useFetch('/api/hello')
const log = () => {
    const now = new Date()
    const uniqueId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
        now.getDate()
    ).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(
        now.getMinutes()
    ).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`
    console.log(data.value, "@data")
    console.log(uniqueId, "@uniqueId")
}
</script>

<template>
    <div>
        <v-btn @click="log">点击</v-btn>
        <v-divider>文本编辑器, 更适合写 md 文件</v-divider>
        <testing-write-files-my-editor />
        <v-divider>富文本编辑器, 书写的内容将会转换为 HTML</v-divider>
        <testing-write-files-wange-ditor />
    </div>
</template>
