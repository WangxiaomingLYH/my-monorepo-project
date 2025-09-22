<script setup lang="ts">
// 封装的 重置密码组件, 比注册操作逻辑更友好
// 需父组件传递: sendFormDate: 发送表单数据; resendVerification: 重发验证码

import { reactive, ref, watchEffect } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { View, Hide } from '@element-plus/icons-vue';
import SymbolClickVerify from '@/components/SymbolClickVerify.vue';


type FormDate = {
    email: string,
    password: string,
    confirmPassword: string,
    verificationCode: string
}


const human = ref(false)
const formData = ref({} as FormDate)
const openDialog = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(0);
let timer: number | undefined = undefined;
const formRef = ref<FormInstance>();
// 更严格的邮箱验证正则
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rules = reactive<FormRules<FormDate>>({
    email: [
        { required: true, message: 'Please enter your email address', trigger: 'blur' },
        {
            validator: (_, value, callback) => {
                if (emailRegex.test(value)) {
                    callback();
                } else {
                    callback(new Error('Please enter a valid email address'));
                }
            },
            trigger: ['blur', 'change']
        }
    ],
    verificationCode: [
        { required: true, message: 'Please enter the verification code', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input a password', trigger: 'blur' },
        {
            min: 6,
            max: 20,
            message: 'Password length is between 6 and 20 characters',
            trigger: 'blur'
        }
    ],
    confirmPassword: [
        { required: true, message: 'Please enter your password again', trigger: 'blur' },
        {
            validator: (_: unknown, value: string, callback: (error?: Error) => void) => {
                if (value !== formData.value.password) {
                    callback(new Error('The password entered twice is inconsistent'));
                } else {
                    callback();
                }
            },
            trigger: ['blur', 'change']
        }
    ]
});

const emit = defineEmits(["sendFormDate", "resendVerification"])
// 检查所有必填字段是否已填写
const validateRequiredFields = async () => {
    try {
        // 验证所有必填字段
        await formRef.value?.validateField(['firstName', 'lastName', 'email']);
        return true;
    } catch (error) {
        ElMessage.warning('Please complete all required fields');
        return false;
    }
};
const nextClick = async () => {
    const isValid = await validateRequiredFields();
    if (isValid) {
        openDialog.value = true;
    }
}
const sendVerificationCode = async () => {
    // 确保所有必填字段有效
    const isValid = await validateRequiredFields();
    if (!isValid) {
        human.value = false; // 重置人机验证状态
        return;
    }

    // 确保邮箱有效
    if (!emailRegex.test(formData.value.email)) {
        ElMessage.error('Please enter a valid email address');
        human.value = false;
        return;
    }

    // 防止重复发送
    if (countdown.value > 0) return;
    emit('resendVerification', formData.value)
    // 开始倒计时
    countdown.value = 60;
    timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit("sendFormDate", formData.value)
        } else {
            console.log('error submit!', fields)
        }
    })
}


watchEffect(() => {
    if (human.value) {
        openDialog.value = false
        sendVerificationCode()
    }
})
</script>

<template>
    <div class="">
        <el-form :model="formData" label-position="top" label-width="auto" ref="formRef" :rules="rules">
            <el-col v-show="!human">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="formData.email" placeholder="Input Email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nextClick" class="register-submit">
                        Next
                    </el-button>
                </el-form-item>
            </el-col>
            <el-col v-show="human">
                <el-form-item label="VerificationCode" prop="verificationCode">
                    <el-input v-model="formData.verificationCode" placeholder="Input Verification Code">
                        <template #append>
                            <el-button :disabled="countdown > 0" @click="sendVerificationCode" type="primary"
                                size="small">
                                {{ countdown > 0 ? `${countdown}s Resend` : 'Obtain' }}
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                        placeholder="Input Confirm Password">
                        <template #suffix @click="">
                            <el-icon @click="showPassword = !showPassword" style="cursor: pointer;">
                                <component :is="showPassword ? Hide : View"></component>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="confirmPassword">
                    <el-input v-model="formData.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                        placeholder="Input Confirm Password">
                        <template #suffix @click="">
                            <el-icon @click="showConfirmPassword = !showConfirmPassword" style="cursor: pointer;">
                                <component :is="showConfirmPassword ? Hide : View"></component>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm(formRef)" class="register-submit">
                        submit
                    </el-button>
                </el-form-item>
            </el-col>
        </el-form>

        <el-dialog v-model="openDialog">
            <SymbolClickVerify v-model:human="human"></SymbolClickVerify>
        </el-dialog>
    </div>
</template>