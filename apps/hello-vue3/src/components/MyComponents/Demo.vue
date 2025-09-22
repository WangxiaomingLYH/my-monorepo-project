<script setup lang="ts">
// 自定义封装 EL Form 组件
import myForm from "@/components/MyComponents/Form.vue";
import { computed, h, ref, useTemplateRef, type Component } from "vue";

interface FormItems {
  label: string;
  key: string | undefined;
  type: string | Component;
  isHide?: boolean;
  placeholder?: string;
  props?: any;
  [key: string]: any;
}

const FormAttributes = {
  labelWidth: "auto",
  size: "small",
  rules: {
    name: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { min: 2, max: 10, message: "姓名长度在2到10个字符", trigger: "blur" },
    ],
    age: [
      { required: true, message: "请输入年龄", trigger: "blur" },
      {
        type: "number",
        min: 0,
        max: 150,
        message: "年龄必须在0到150之间",
        trigger: "blur",
      },
    ],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  },
};
const hideCustom = ref(false);
const FormItems = computed(() => {
  const formItems: FormItems[] = [
    {
      label: "姓名",
      key: "name",
      type: "el-input",
      span: 6,
      props: {
        placeholder: "请输入您的姓名",
      },
    },
    {
      label: "年龄",
      key: "age",
      type: "el-input-number",
      span: 6,
      props: {
        placeholder: "请输入您的年龄",
      },
    },
    {
      label: "性别",
      key: "sex",
      type: "el-select",
      isHide: FormValue.value.name === "男人",
      // 透传选项数据源(https://element-plus.org/zh-CN/component/select.html#select-api)
      props: {
        placeholder: "请选择您的性别",
        options: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
        ],
      },
    },
    {
      label: "日期",
      key: "dataRange",
      type: "el-date-picker",
      props: {
        placeholder: "请选择日期",
        type: "datetime",
        shortcuts: [
          {
            text: "Today",
            value: new Date(),
          },
          {
            text: "Yesterday",
            value: () => {
              const date = new Date();
              date.setDate(date.getDate() - 1);
              return date;
            },
          },
          {
            text: "A week ago",
            value: () => {
              const date = new Date();
              date.setDate(date.getDate() - 7);
              return date;
            },
          },
        ],
      },
    },
    {
      label: "日期范围",
      key: "dataRange2",
      type: "el-date-picker",
      props: {
        type: "datetimerange",
        placeholder: "请选择日期范围",
        startPlaceholder: "Start date",
        endPlaceholder: "End date",
        format: "YYYY-MM-DD HH:mm:ss",
        dateFormat: "YYYY/MM/DD ddd",
        timeFormat: "A hh:mm:ss",
      },
    },
    {
      label: "操作项",
      key: undefined,
      type: "el-button",
      props: {
        type: "primary",
        onclick() {
          console.log("!!!!!!!!!!");
          hideCustom.value = true;
        },
      },
    },
    {
      label: "自定义组件",
      key: "custom",
      type: () => h("div", { class: "text-blue-600/75" }, "自定义组件文本内容"),
      isHide: hideCustom.value,
    },
    {
      label: "二次封装的按钮组",
      key: "custom2",
      type: myButtonGroups,
      isHide: hideCustom.value,
      props: {
        buttonGroupsConfig: buttonGroupsConfig,
        buttonItems: buttonItems.value,
      },
    },
  ];
  return formItems;
});
const FormValue = ref({
  name: undefined,
  age: undefined,
  sex: undefined,
  dataRange: undefined,
});
const formInstance = useTemplateRef("formRef");

const onSubmit = async () => {
  await formInstance.value?.validate();
  console.log("校验成功", FormValue.value);
};
const onReset = async () => {
  formInstance.value?.resetFilelds();
};
// 自定义封装 EL Form 组件 end -------------------------

// 自定义封装 Button 组
import myButtonGroups from "@/components/MyComponents/ButtonGroups.vue";
import { Edit, View, Delete } from "@element-plus/icons-vue";
const buttonGroupsConfig = {
  size: "small",
  type: "info",
};
const buttonItems = computed(() => {
  const items = [
    {
      icon: Edit,
      onClick() {
        console.log("@Edit");
      },
    },
    {
      icon: View,
      onClick() {
        console.log("@View");
      },
    },
    {
      icon: Delete,
      onClick() {
        console.log("@Delete");
      },
      isHide: true,
    },
  ];
  return items;
});
// 自定义封装 Button 组 end -------------------------

// 自定义封装 Table
import myTable from "@/components/MyComponents/Table.vue";
// 自定义封装 Button 组 end -------------------------

// 自定义封装 Table
import myInput from "@/components/MyComponents/Input.vue";
const modelValue = ref("hello word");
const inputRef = useTemplateRef<any>("inputRef");
const changA = () => {
  console.log("!!!");
};
setTimeout(() => {
  inputRef.value.clear();
  inputRef.value.logA();
  console.log(inputRef.value.a, "@inputRef.value.a");
}, 2000);
// 自定义封装 Button 组 end -------------------------
</script>

<template>
  <div class="w-7xl m-auto py-10 border">
    <el-divider>二次封装 El-Form 组件</el-divider>
    <el-button @click="onSubmit" type="primary" size="small" class="mb-2">
      From 提交验证
    </el-button>
    <el-button @click="onReset" type="primary" size="small" class="mb-2">
      Reset
    </el-button>
    <my-Form
      ref="formRef"
      :FormAttributes="FormAttributes"
      :FormItems="FormItems"
      v-model="FormValue"
    ></my-Form>

    <el-divider>二次封装按钮组组件</el-divider>
    <my-button-groups
      :buttonGroupsConfig="buttonGroupsConfig"
      :buttonItems="buttonItems"
    ></my-button-groups>

    <el-divider>二次封装 Table 组件</el-divider>
    <my-table> </my-table>

    <el-divider>二次封装 Input 组件</el-divider>
    <my-input
      placeholder="传递给子组件的 placeholder"
      v-model="modelValue"
      ref="inputRef"
      @changA="changA"
    >
      <template #append> 后置内容 </template>
      <template #prefix> 前置内容 </template>
    </my-input>
  </div>
</template>

<style scoped lang="scss"></style>
