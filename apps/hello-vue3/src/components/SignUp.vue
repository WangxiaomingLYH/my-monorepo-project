<script setup lang="ts">
// 封装的 注册功能组件


import { computed, onMounted, ref, toRefs, watch, type PropType } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import SymbolClickVerify from "@/components/SymbolClickVerify.vue"



const props = defineProps<{ signUpRef?: FormInstance, modelData: object, rules?: FormRules }>()
const emit = defineEmits(['send', 'handleRegister'])
const modelData: any = defineModel('modelData')

const disabled = ref(false)
const human = ref<boolean>(false)  // 是否是人类
const dialogVisible = ref<boolean>(false)
const dialogTitle = computed(() => {
    return '邮箱验证'
})
const disabledTime = ref<number>(60)
const { terms, workEmail, verificationCode } = toRefs(modelData.value)

const validate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(terms.value, "@terms")
            if (terms.value) {
                dialogVisible.value = true
            } else {
                ElMessage.warning({
                    showClose: true,
                    type: 'warning',
                    duration: 5000,
                    message: '注册登录即代表已阅读并同意我们的用户协议及隐私政策'
                })
                terms.value = true
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
const sendEmail = () => {
    disabled.value = true
    disabledTime.value = 60
    const intervalId = setInterval(() => {
        if (disabledTime.value <= 0) {
            clearInterval(intervalId)
            disabled.value = false
        }
        disabledTime.value--
    }, 1000)
    emit('send')
}

const handleRegister = () => {
    emit('handleRegister')
    dialogVisible.value = false
}
</script>

<template>
    <div>

        <!-- 通过插槽传递  default 接收 signUpRef form 结构-->
        <slot name="default"></slot>

        <el-row>
            <el-col :span="24" style="display: flex; align-items: center;">
                <!-- 注册的逻辑验证 -->
                <el-checkbox v-model="terms" id="agree" style="margin-right: 10px;" />
                <label for="agree">
                    <!-- 接受 用户同意条款内容 隐私政策 用户协议 -->
                    <div style="display: flex;align-items: center;">
                        <slot name="term"></slot>
                    </div>
                </label>
            </el-col>
            <el-col :span="24">
                <el-button class="register-submit" @click="validate(props.signUpRef)">
                    提交
                </el-button>
            </el-col>
        </el-row>

        <el-dialog v-model="dialogVisible" v-if="dialogVisible" :title="dialogTitle" :width="600">
            <SymbolClickVerify v-model:human="human" v-if="!human" />
            <div v-else style="margin-top: 20px;">
                <h4 style="display: flex;align-items: center;margin-bottom: 10px;margin-right: 5px;">
                    我们将向<strong style="margin: 0 5px;">
                        {{ workEmail }}</strong>
                    <el-button link type="primary" @click="sendEmail" :disabled="disabled" style="margin-left: 30px;">
                        是的, 这是我的邮箱
                    </el-button>
                    <el-badge :value="disabledTime" type="info" :offset="[10, 5]" v-if="disabled"></el-badge>
                </h4>
                <el-input placeholder="输入验证码" v-model="verificationCode" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="handleRegister">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>