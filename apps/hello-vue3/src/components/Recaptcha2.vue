<script setup>
//  谷歌人机验证


// ts 环境下需自己声明 module
import VueRecaptcha from 'vue3-recaptcha2'

// const reCAPTCHALocked = ref(true)
const siteKey = '6LfsPzYrAAAAAPt6EwZ0k5dCHfjqZuYuPSL1Gg0M'

// //获取token发送到后端验证
const onVerify = (token) => {
    console.log('Token:', token) // 发送到后端验证
    // reCAPTCHALocked.value = false
}
// //过期后执行动作
// const recaptchaExpired = () => {

// }

// //失败执行动作
// const recaptchaFailed = () => {

// }
</script>

<template>
    <div class="">
        <vue-recaptcha :sitekey="siteKey" @verify="onVerify" hl="en" @expire="recaptchaExpired"
            @fail="recaptchaFailed" />
    </div>
</template>

<style scoped lang="less"></style>