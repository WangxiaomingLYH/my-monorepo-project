<script setup lang="ts">
import { ref } from "vue";

interface Item {
  id: number;
  name: string;
}

/**
 * 
 * 
res.body.getReader()	获取流的读取器（可重复调用 .read() 读取数据块）
TextDecoder.decode()	将 Uint8Array 解码为字符串
stream: true 参数	保留未解码的尾部字节，用于下次继续拼接
buffer	用于缓存未处理的字符，避免 JSON 被截断
JSON.parse()	把每一行字符串转为对象；使用 try/catch 防止解析失败
items.value.push(obj)	Vue 3 中响应式更新表格内容
 */

// 响应式数组：边读边添加
const items = ref<Item[]>([]);
const isLoading = ref(false);

async function loadData() {
  // 启用加载状态，禁用按钮等
  isLoading.value = true;

  // 发起请求，获取返回流（ReadableStream）
  const res = await fetch("/api/large-json-stream");

  // 获取流的读取器，用于逐块读取数据
  const reader = res.body!.getReader();

  // 创建一个 UTF-8 解码器，用于将 Uint8Array 解码成字符串
  const decoder = new TextDecoder("utf-8");

  // 调试输出：查看 reader 和 decoder 对象结构
  console.log(reader, "@reader");
  console.log(decoder, "@decoder");

  // 临时缓冲区，用于拼接未完整的字符串片段
  let buffer = "";

  // 无限读取循环 —— 每次读取一块数据
  while (true) {
    // 从流中读取一块数据：返回 { value, done }
    const { value, done } = await reader.read();

    // 如果 done 为 true，表示流已结束，跳出循环
    if (done) break;

    // 将当前块解码为字符串，并追加到缓冲区中
    // 使用 { stream: true } 表示可能是部分数据（不要强制刷新内部状态）
    buffer += decoder.decode(value, { stream: true });

    /**
     * 我们假设每个 JSON 对象都以换行符 `\n` 分隔
     * 所以查找当前缓冲区中，最后一个换行符的位置
     * - 目的是避免“半行 JSON”被错误解析
     */
    const boundary = buffer.lastIndexOf("\n");

    if (boundary !== -1) {
      // 拿到当前完整的一部分（最后一个换行符之前的内容）
      const chunk = buffer.slice(0, boundary);

      // 剩下的部分可能是未完成的 JSON，保留到下次拼接
      buffer = buffer.slice(boundary + 1);

      // 将完整部分按行拆分
      const lines = chunk.split("\n");

      // 遍历每一行，尝试解析为 JSON 并添加到 items 中
      for (const line of lines) {
        try {
          const obj = JSON.parse(line);
          items.value.push(obj); // Vue 响应式数组更新页面
        } catch (e) {
          console.warn("无法解析 JSON 行:", line);
        }
      }
    }
  }

  // 所有数据加载完毕，关闭 loading 状态
  isLoading.value = false;
}
</script>

<template>
  <v-divider>一边请求, 一边响应 / 渲染示例</v-divider>
  <div>
    <v-btn @click="loadData" :loading="isLoading">加载大数据</v-btn>

    <v-divider class="my-4">数据列表</v-divider>

    <table border="1" cellpadding="4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
