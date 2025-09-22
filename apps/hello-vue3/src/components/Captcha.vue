<script setup lang="ts">
// 使用 Captcha 做校验

import { ref } from "vue"
import Captcha from 'vue3-captcha';
import type { CaptchaInstance } from 'vue3-captcha'
let value = ref('')
let refCode = ref<CaptchaInstance>(null)
const handleCheck = () => {
    if (refCode.value?.check(value.value)) {
        console.log("check success")
    }
}

</script>

<template>
    <el-row class="w-[200px] p-[30px]">
        <el-col :span="24">
            <Captcha ref="refCode"/>
        </el-col>
        <el-col :span="24">
            <el-input v-model="value" />
            <el-button @click="handleCheck">校验</el-button>
        </el-col>
    </el-row>
</template>