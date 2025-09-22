<script setup lang="ts">
import largeFileUpload from "./large-file-upload.vue";
import largeDataGet from "./large-data-get.vue";
</script>

<template>
  <div class="">
    <large-data-get></large-data-get>
    <large-file-upload></large-file-upload>
    <v-divider>日期范围 组件</v-divider>
    <my-component-vuetify-date-picker></my-component-vuetify-date-picker>
    <v-divider>form 表单组件</v-divider>
    <my-component-vuetify-form></my-component-vuetify-form>
    <v-divider>table 表单组件</v-divider>
    <my-component-vuetify-data-table-server></my-component-vuetify-data-table-server>
    <my-component-vuetify-data-table></my-component-vuetify-data-table>
    <my-component-3d-card></my-component-3d-card>
  </div>
</template>

<style scoped lang="scss"></style>
