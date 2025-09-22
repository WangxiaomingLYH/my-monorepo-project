<script setup lang="ts">
function createStreamDataFn() {
    const encoder = new TextEncoder()
    const streamData = new ReadableStream({
        start(controller) {
            for (let index = 0; index < 1000; index++) {
                // 控制器的 enqueye 方法, 将快数据填充到流中
                const chunk = encoder.encode(index.toString())
                // 以字节的方法填充到流中. fetch 只能读取字节流 !
                controller.enqueue(chunk)
            }
            // 控制器的关闭流方法, 填充 1000 块数据后关闭流并通知消费者这是最后一块数据了
            controller.close()
        },
    })
    return streamData;
}

async function log() {
    const stream = createStreamDataFn()

    // 生成读取器, 并锁定该流 getReader: 可读流的实例方法
    const reader = stream.getReader()
    const results = []
    const decoder = new TextDecoder("utf-8");

    while (true) {
        // 读取器的实例方法 read()
        const { done, value } = await reader.read()
        if (done) break
        results.push(decoder.decode(value, { stream: true }))
    }

    console.log(results, "@results")
}

</script>

<template>
    <v-divider>手动创建数据流 ReadableStream</v-divider>
    <v-btn @click="log">开始创建数据并解码数据</v-btn>
</template>

<style scoped lang="scss"></style>
