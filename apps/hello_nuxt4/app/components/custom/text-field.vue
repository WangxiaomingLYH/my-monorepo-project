<script setup lang="ts">
// 会有浏览器警告, 很烦

import type { ComponentInstance } from "vue";
import { VTextField } from "vuetify/components";

type Instance = ComponentInstance<typeof VTextField>;
interface CustomExpose extends Instance {
  custom: string;
  customFunction: Function;
}

const attrs = useAttrs();
const slots = useSlots();
const customExpose = reactive<Partial<CustomExpose>>({
  custom: "自定义属性",
  customFunction() {
    console.log(this.custom, "@custom");
  },
});

function changeRef<T>(instance: T) {
  Object.assign(customExpose, instance);
}

defineExpose(customExpose);
</script>

<template>
  <component :is="h(VTextField, { ...attrs, ref: changeRef }, slots)" />
</template>

<style scoped lang="scss"></style>
