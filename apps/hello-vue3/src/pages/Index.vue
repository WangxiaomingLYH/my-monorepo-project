<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { templateConfig } from "@/utils/template-config";

// 1. 富文本编辑器
import Editor from "@/components/Editor.vue";

const valueHtml1 = ref<string>("");
watch(valueHtml1, (newValue) => {
  console.log(newValue, "新的");
});

// 2. Echart 用到的数据
// 模拟传入的数据
import ColumnarEchart from "@/components/ColumnarEchart.vue";

const dataList = computed(() => {
  return templateConfig.value?.ColumnarEchartDataList || [];
});

// 3. 接收传入的图片 base64版
import uploadImg from "@/components/UploadImg.vue";

const base64FileData = ref<string>("");
watch(base64FileData, (newValue) => {
  console.log(newValue, "base64");
});

// 4. 自定义封装注册组件
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import SignUp from "@/components/SignUp.vue";

const signUpRef = ref<FormInstance>();
const registerForm = ref({
  workEmail: "",
  verificationCode: "",
  terms: false,
});
const rules = ref<FormRules>({
  email: [
    {
      required: true,
      message: "Please input your email address",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please input a valid email address",
      trigger: ["blur", "change"],
    },
  ],
});
const send = () => {
  ElMessage.success("发送邮箱验证码操作");
};
const handleRegister = () => {
  ElMessage.success("提交注册操作");
};

// 5. 重置密码组件
import ResetPassword from "@/components/ResetPassword.vue";
type FormDate = {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
};
const resendVerification = (formData: FormDate) => {
  // 重新发送验证码
  const { email } = formData || {};
  console.log(formData, "@data");
  // xxx发送邮件(email)
};
const sendFormDate = (formData: FormDate) => {
  // 提交表单数据
  console.log(formData, "@formData");
  // xxx提交数据(formData)
};
</script>

<template>
  <div class="">
    <el-divider content-position="left">
      <h1 class="font-bold text-2xl">重置密码</h1>
    </el-divider>
    <div class="w-[1440px] m-auto">
      <ResetPassword
        @resendVerification="resendVerification"
        @sendFormDate="sendFormDate"
      ></ResetPassword>
    </div>

    <el-divider content-position="left">
      <h1 class="font-bold text-2xl">注册</h1>
    </el-divider>
    <div class="w-[1440px] m-auto">
      <el-button
        @click="console.log(registerForm, '@registerForm')"
        class="mb-[20px]"
      >
        查看数据
      </el-button>
      <SignUp
        @send="send"
        @handleRegister="handleRegister"
        :signUpRef="signUpRef"
        v-model:modelData="registerForm"
        :inline="true"
        label-position="top"
      >
        <el-form ref="signUpRef" :rules="rules" :model="registerForm">
          <el-form-item label="邮箱" prop="workEmail">
            <el-input
              placeholder="请输入您的邮箱"
              v-model="registerForm.workEmail"
            />
          </el-form-item>
        </el-form>

        <template #term>
          <span>
            注册登录即代表已阅读并同意我们的
            <router-link to="" style="color: blue">用户协议</router-link>
            及
            <router-link to="" style="color: blue">隐私政策</router-link>
          </span>
        </template>
      </SignUp>
    </div>

    <el-divider content-position="left">
      <h1 class="font-bold text-2xl">富文本编辑器组件</h1>
    </el-divider>
    <div class="w-[1440px] m-auto">
      <Editor v-model:HTML="valueHtml1"></Editor>
    </div>

    <el-divider content-position="left">
      <h1 class="font-bold text-2xl">Echart柱状图</h1>
    </el-divider>
    <div class="w-[1440px] m-auto">
      <ColumnarEchart :dataList="dataList" />
    </div>

    <el-divider content-position="left">
      <h1 class="font-bold text-2xl">上传</h1>
    </el-divider>
    <div class="w-[1440px] m-auto">
      <uploadImg v-model:base64FileData="base64FileData"></uploadImg>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
