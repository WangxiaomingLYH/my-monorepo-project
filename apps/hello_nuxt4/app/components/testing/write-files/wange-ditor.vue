<script setup lang="ts">
/**
 * 富文本组件: 官网地址`https://www.wangeditor.com/v5/for-frame.html`
 * pnpm add @wangeditor/editor-for-vue@next
 * typescript还需要安装: pnpm add @wangeditor/editor 用于解决类型报错问题
 * 配置 wangeditor.d.ts 文件, 解决导入 Editor, Toolbar 报错问题
 * 
 * 使用 defineModel API实现父子组件双向绑定, 该API需要vue 3.4+
 * 图片为base64 格式
 */

import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import type { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'


// 工具栏配置： https://www.wangeditor.com/v5/toolbar-config.html
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
        'insertVideo',  // 排除插入视频功能
        'codeBlock',    // 排除代码块功能
        // 'code'          // 排除行内代码功能（如果需要）
    ]
}
// 编辑器配置项: https://www.wangeditor.com/v5/editor-config.html
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {  // 自定义上传图片地址， 改为base64版本
            base64: true,
            base64LimitSize: 10 * 1024 * 1024, // 5m
            // 禁用服务器上传
            server: '',
            fieldName: ''
        }
    }
}
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 使用 defineModel 实现父子组件的双向通信， 用于得到编译器的html
const valueHtml = defineModel()
// 模式 是否默认 default：默认模式 simple：简洁模式
const mode = ref('simple')


// 编辑器创建时回调
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})



const logHtml = () => {
    console.log(valueHtml.value, "@valueHtml.value")
}
// 打印当前菜单选项
const logMenus = () => {
    if (!editorRef.value) return

    // 方法1: 获取所有菜单键
    const allMenuKeys = editorRef.value.getAllMenuKeys()
    console.log('所有菜单键:', allMenuKeys)
}
</script>

<template>
    <client-only>
        <v-sheet rounded :elevation="4" border class="w-full h-screen">
            <v-btn @click="logHtml">打印输入的html内容</v-btn>
            <v-btn @click="logMenus">打印菜单选项</v-btn>
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </v-sheet>
    </client-only>
</template>

<style scoped lang="less"></style>