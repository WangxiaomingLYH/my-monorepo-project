<script setup lang="ts">
const { t } = useI18n()

const fileName = ref<string | undefined>(undefined)
const content = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null) // 用来引用 v-textarea
const isFocused = ref(false) // 记录 textarea 是否获取焦点
const snackbar = ref(false)

const saveContent = async () => {
    snackbar.value = false
    console.log('开始执行')
    console.log(fileName.value, "@fileName.value")
    const data = await $fetch('/api/save-content', {
        method: 'POST',
        body: {
            fileName: fileName.value,
            content: content.value
        }
    })
    fileName.value = data.fileName
    snackbar.value = true
    console.log(fileName.value, "@fileName.value")
}

// 监听键盘事件
const handleKeydown = (e: KeyboardEvent) => {
    if (isFocused.value && e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault() // 阻止浏览器默认保存页面
        saveContent()
    }
}

// 生命周期：组件挂载时添加事件监听
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

// 生命周期：组件卸载时移除事件监听
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})

</script>

<template>
    <div>
        <v-card :title="t('startWriting')" :subtitle="t('writingTip')">
            <template #text>
                <v-text-field v-show="fileName" :label="t('filename')" v-model="fileName" readonly></v-text-field>
                <v-textarea :label="t('content')" ref="textareaRef" v-model="content" class="h-full min-h-[60vh]"
                    no-resize @focus="isFocused = true" @blur="isFocused = false" />
            </template>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="2000" color="success" location="top">
            {{ $t('fileSuccess') }}
        </v-snackbar>
    </div>
</template>