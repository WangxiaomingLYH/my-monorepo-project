<script setup lang="ts">
import { utilsConcurrencyRequest } from "~/utils/HandlingLargeFiles/concurrencyRequest";
import type { ApiResponse, ProductItem } from "~~/server/api/data.get";

const responseData = ref<ProductItem[]>([]);
const queryParams = new URLSearchParams({
  page: "1",
  pageSize: "15",
});

async function getLargeDataFn() {
  try {
    // 发送第一次请求, 拿到全部数据条数
    const firstRequest = await fetch(`api/data?${queryParams.toString()}`);
    if (!firstRequest.ok) throw new Error("请求失败");
    const result: ApiResponse = await firstRequest.json();
    const {
      data: {
        items,
        pagination: { totalPages },
      },
    } = result;
    // 保存第一次请求结果
    console.log(items, "items");
    responseData.value.push(...items);
    console.log(responseData.value, "@ responseData.value");

    // 一般是传入数据范围的, 比如请求第 0 条到第 500 条的数据
    // 但是我的接口做了分页, 计算了共有多少页, 所以可以直接使用 totalPages 做循环条件
    // 一般的接口不会做分页, 只会返回数据总量, 所以需要手动计算
    // 循环次数 = Math.ceil(数据总量 / 每次请求多少条), 这里用 做了向上取整操作
    // 循环从 1 开始, 因为第一次请求以及得到了 0 ~ 每次请求多少条 的数据
    // 请求范围左边界 = 每次请求多少条 * 循环次数
    // 请求范围右边界 = Math.min( 每次请求多少条 * (循环次数 + 1), 数据总量 ), 这里做了取最小值操作
    // 然后就可以通过 set() 方法覆盖之前的请求范围参数了

    // 生成后续请求队列
    const chunkList: any[] = [];
    for (let index = 2; index <= totalPages; index++) {
      // 生成新的请求参数, 仅用于请求全部数据, 可以避免数据污染
      const newParams = new URLSearchParams(queryParams.toString());
      newParams.set("page", String(index));
      const chunk = {
        url: `api/data?${newParams.toString()}`,
      };
      chunkList.push(chunk);
    }
    const allData = await utilsConcurrencyRequest(chunkList, 15, 1);
    const results = allData
      .filter((item) => item.status === "fulfilled")
      .map((result: any) => {
        const array = result.data.data.items;
        return array;
      })
      .flat(1);

    console.log(results, "@results");
    responseData.value.push(...results);
    console.log(responseData.value, "@ responseData.value");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <v-divider :thickness="3">自动获取全部分页数据</v-divider>
  <v-btn @click="getLargeDataFn">发送请求</v-btn>
</template>

<style scoped lang="scss"></style>
