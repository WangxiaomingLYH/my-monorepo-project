<script setup lang="ts">
import { h, reactive, type ComponentInstance } from "vue";
import { ElInput } from "element-plus";

const exposed = reactive({
  a: "wxm",
  logA() {
    console.log(this.a, "@a");
  },
});
function changeRef<T>(instance: T) {
  if (instance) Object.assign(exposed, instance);
}

defineExpose(exposed);
</script>

<template>
  <h2>二次封装 input 组件</h2>
  <component
    :is="h(ElInput, { ...$attrs, ref: changeRef }, $slots)"
  ></component>
</template>
