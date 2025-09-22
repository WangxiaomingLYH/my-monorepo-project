<script setup lang="ts">
const modelValue = ref<File | undefined>(undefined);
const formDataChunks = ref<{ index: number; formData: FormData }[]>([]);

function sliceFile() {
  console.log(modelValue.value, "@上传的文件 modelValue");
  const { fileName, chunkList } = fileSlice(modelValue.value!, 3)!;
  console.log(chunkList, "@切片后文件组成的数组 chunkList");
  const result = wrapChunksToFormData(chunkList, fileName);
  formDataChunks.value = result;
  console.log(result, "@包装成 FormData 对象后的数组 result");
  console.log(
    formDataChunks.value,
    "@包装成 FormData 对象后的数组 formDataChunks.value"
  );

  const requestConfigs = result.map(({ index, formData }) => ({
    url: "/api/upload",
    options: {
      method: "POST",
      body: formData,
    },
    meta: { index }, // 加上 index，便于重试日志追踪
  }));
}

// 切片方法
interface FileChunk {
  index: number;
  chunk: Blob;
  size: number;
  start: number;
  end: number;
}

interface FileSliceResult {
  fileName: string;
  fileSize: number;
  fileType: string;
  chunkTotal: number;
  chunkList: FileChunk[];
}

function fileSlice(file: File, maxSize: number = 5): FileSliceResult | void {
  if (maxSize <= 0) return console.error("分片大小不能小于0");

  // 传入的文件总大小
  const fileSize = file.size;
  // 每个分片文件的大小
  const fileSliceSize = maxSize * 1024 * 1024;
  // 需要切分的块数, 向上取整
  const chunkTotal = Math.ceil(fileSize / fileSliceSize);
  // 存储每一个切片信息的数组
  const chunkList: FileChunk[] = [];
  // 目标切片文件在数组中的索引

  for (let index = 0; index < chunkTotal; index++) {
    const start = index * fileSliceSize;
    // 边界保护, 当剩余文件大小不足 fileSliceSize 时
    const end = Math.min(fileSliceSize * (index + 1), fileSize);
    const chunk = file.slice(start, end);
    chunkList.push({
      index,
      chunk,
      size: end - start,
      start,
      end,
    });
  }

  // while 写法, fileSlice 函数是一个同步请求, 而且非常快, 所以不需要考虑生成多个工作函数, 推荐使用 for 循环
  // let targetIndex = 0;
  // while (targetIndex < chunkTotal) {
  //   let currentIndex = targetIndex++;
  //   const start = currentIndex * fileSliceSize;
  //   // 边界保护, 当剩余文件大小不足 fileSliceSize 时
  //   const end = Math.min(fileSliceSize * (currentIndex + 1), fileSize);
  //   const chunk = file.slice(start, end);
  //   chunkList.push({
  //     index: currentIndex,
  //     chunk,
  //     size: end - start,
  //     start,
  //     end,
  //   });
  // }

  return {
    fileName: file.name,
    fileSize,
    fileType: file.type,
    chunkTotal,
    chunkList,
  };
}
// 切片方法 end --------------------------------

// 包装成 FormData 对象方法
function wrapChunksToFormData(
  chunkList: FileChunk[],
  fileName: string
): { index: number; formData: FormData }[] {
  if (!Array.isArray(chunkList)) {
    throw new TypeError("wrapChunksToFormData: chunkList 必须是一个数组.");
  }

  if (chunkList.length === 0) {
    throw new Error("wrapChunksToFormData: chunkList 不能为空.");
  }

  if (typeof fileName !== "string" || fileName.trim() === "") {
    throw new TypeError("wrapChunksToFormData: fileName 必须是个非空字符串.");
  }
  const total = chunkList.length;
  return chunkList.map((chunk, index) => {
    if (
      typeof chunk.index !== "number" ||
      !(chunk.chunk instanceof Blob) ||
      typeof chunk.size !== "number" ||
      typeof chunk.start !== "number" ||
      typeof chunk.end !== "number"
    ) {
      console.warn(
        `wrapChunksToFormData: Invalid chunk at index ${index}`,
        chunk
      );
      throw new Error(`Invalid chunk structure at index ${index}`);
    }

    if (chunk.index < 0 || chunk.index >= total) {
      throw new RangeError(
        `wrapChunksToFormData: Invalid chunk index: ${chunk.index}`
      );
    }

    if (chunk.size <= 0 || chunk.start < 0 || chunk.end <= chunk.start) {
      throw new Error(
        `wrapChunksToFormData: Invalid chunk size or range at index ${chunk.index}`
      );
    }
    const formData = new FormData();
    formData.append("file", chunk.chunk, `${fileName}.part${chunk.index}`); // 切片文件本体
    formData.append("index", chunk.index.toString()); // 该切片是第几个切片
    formData.append("total", total.toString()); // 共有多少切片
    formData.append("size", chunk.size.toString()); // 当前切片的大小
    formData.append("start", chunk.start.toString()); // 当前切片在原始文件中的起始字节位置
    formData.append("end", chunk.end.toString()); // 当前切片在原始文件中的结束字节位置
    formData.append("fileName", fileName); // 原始文件的完整名称
    return {
      index: chunk.index,
      formData,
    };
  });
}
// 包装成 FormData 对象方法 end --------------------------------

// 并发上传
import { utilsConcurrencyRequest } from "~/utils/HandlingLargeFiles/concurrencyRequest";
async function emitFile() {
  const requestConfigs = formDataChunks.value.map(({ index, formData }) => ({
    url: "/api/hello",
    options: {
      method: "POST",
      body: formData,
    },
    meta: { index }, // 加上 index，便于重试日志追踪
  }));
  const uploadResults = await utilsConcurrencyRequest(
    requestConfigs,
    4, // 最大并发数
    3 // 每个切片最多重试 3 次
  );
  console.log(uploadResults, "@uploadResults");
}
// 并发上传 end --------------------------------
</script>

<template>
  <div>
    <v-divider :thickness="3"> 大文件切片功能测试 </v-divider>
    <v-file-input
      label="大文件上传"
      v-model="modelValue"
      show-size
      counter
    ></v-file-input>
    <v-btn @click="sliceFile">切片并包装成 FormData 对象后打印</v-btn>
    <v-btn @click="emitFile"
      >根据 FormData 对象数组生成请求配置项, 发送并发请求</v-btn
    >
  </div>
</template>

<style scoped lang="scss"></style>
