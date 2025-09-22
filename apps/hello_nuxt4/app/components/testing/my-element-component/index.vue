<script setup lang="ts">
import myForm from "./my-form.vue";

// 自定义 TextField 组件
import myTextField from "./my-text-field.vue";
const modelValue = ref("你好");
const textFieldRef = useTemplateRef("textFieldRef");

setTimeout(() => {
  textFieldRef.value?.custom;
  console.log(textFieldRef.value?.custom, "@textFieldRef.value?.custom");
  console.log(textFieldRef.value, "@textFieldRef.value");
  console.log(textFieldRef.value?.modelValue, "@textFieldRef.value.modelValue");
}, 1000);
// 自定义 TextField 组件 end ----------------
</script>

<template>
  <div class="">
    <h2>自定义测试组件</h2>
    <v-divider :thickness="2" class="border-opacity-100">Form 组件</v-divider>
    <my-form></my-form>

    <v-divider :thickness="2" class="border-opacity-100"
      >单行文本输入组件</v-divider
    >
    <my-text-field
      clearable
      label="Label"
      v-model="modelValue"
      ref="textFieldRef"
    >
      <template v-slot:prepend>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          I'm a tooltip
        </v-tooltip>
      </template>
    </my-text-field>
  </div>
</template>

<style scoped lang="scss"></style>
