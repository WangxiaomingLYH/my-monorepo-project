<script setup lang="ts">
import { utilsSliceFile } from "~/utils/HandlingLargeFiles/fileSlice";
import { utilsWrapChunksToFormData } from "~/utils/HandlingLargeFiles/formData";
import { utilsConcurrencyRequest } from "~/utils/HandlingLargeFiles/concurrencyRequest";

const modelValue = ref<File>();

async function sbumit() {
  // 将文件切片
  const { fileName, fileSize, fileType, chunkTotal, chunkList } =
    utilsSliceFile(modelValue.value!, 2);
  const formDataChunks = utilsWrapChunksToFormData(chunkList, fileName);
  const requestConfigs = formDataChunks.map(({ index, formData }) => {
    return {
      url: "/api/hello",
      options: {
        method: "post",
        body: formData,
      },
      meta: { index },
    };
  });
  const result = await utilsConcurrencyRequest(requestConfigs, 5, 1);
  console.log(result, "@result");
}
</script>

<template>
  <v-divider :thickness="3">大文件上传组件</v-divider>
  <v-file-input label="File input" v-model="modelValue"></v-file-input>
  <v-btn @click="sbumit">Submit</v-btn>
</template>

<style scoped lang="scss"></style>
