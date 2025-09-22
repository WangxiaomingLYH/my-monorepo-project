<script setup lang="ts">
// 分片存储
class ChunkStorage {
    namespace: string
    chunkSize: number
    constructor(namespace = 'chunked_') {
        this.namespace = namespace;
        this.chunkSize = 1024 * 1024 * 3; // 默认3MB每块
    }

    // 存储大数据
    set(key: string, data: string) {
        // 1. 删除旧数据
        this._clearChunks(key);

        // 2. 计算分块数量
        const chunkCount = Math.ceil(data.length / this.chunkSize);
        localStorage.setItem(`${this.namespace}${key}_meta`, JSON.stringify({
            chunkCount,
            totalSize: data.length,
            timestamp: Date.now()
        }));

        // 3. 存储分块
        for (let i = 0; i < chunkCount; i++) {
            const chunk = data.slice(i * this.chunkSize, (i + 1) * this.chunkSize);
            localStorage.setItem(`${this.namespace}${key}_${i}`, chunk);
        }
    }

    // 获取数据
    get(key: string) {
        const meta = JSON.parse(localStorage.getItem(`${this.namespace}${key}_meta`)!);
        if (!meta) return null;

        let result = '';
        for (let i = 0; i < meta.chunkCount; i++) {
            const chunk = localStorage.getItem(`${this.namespace}${key}_${i}`);
            if (!chunk) {
                this._clearChunks(key);
                return null;
            }
            result += chunk;
        }

        return result;
    }

    // 清除数据
    remove(key: string) {
        this._clearChunks(key);
    }

    // 私有方法：清除所有分块
    _clearChunks(key: string) {
        const meta = localStorage.getItem(`${this.namespace}${key}_meta`);
        if (!meta) return;

        const { chunkCount } = JSON.parse(meta);
        localStorage.removeItem(`${this.namespace}${key}_meta`);

        for (let i = 0; i < chunkCount; i++) {
            localStorage.removeItem(`${this.namespace}${key}_${i}`);
        }
    }
}

// 使用示例
const storage = new ChunkStorage();
const bigData = 'a'.repeat(10 * 1024 * 1024); // 10MB数据
storage.set('bigData', bigData);

const retrieved = storage.get('bigData');
console.log(retrieved?.length); // 10485760
</script>

<template>
    <div class="m-auto w-[1200px] p-10">
        <h2>分片存储</h2>
    </div>
</template>

<style scoped lang="less"></style>