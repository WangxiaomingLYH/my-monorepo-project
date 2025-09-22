<template>
    <v-app>
        <v-main>
            <v-container>
                <!-- 题目卡片 -->
                <v-card class="mb-6">
                    <v-card-title class="headline">
                        计数器函数实现
                    </v-card-title>
                    <v-card-text>
                        <p>给定一个整型参数 n，请你编写并返回一个 counter 函数。这个 counter 函数最初返回 n，每次调用它时会返回前一个值加 1 的值 (n, n+1, n+2，等等)。</p>

                        <v-alert type="info" class="mt-4">
                            示例：
                            <pre>const counter = createCounter(10)
  counter() // 10
  counter() // 11
  counter() // 12</pre>
                        </v-alert>
                    </v-card-text>
                </v-card>

                <!-- 代码演示卡片 -->
                <v-card>
                    <v-card-title>
                        代码实现与演示
                    </v-card-title>
                    <v-card-text>
                        <!-- 代码编辑器区域 -->
                        <v-textarea readonly outlined auto-grow value="const createCounter = (number: number) => {
    let count = number
    const addCount = () => {
      return count++
    }
    return addCount
  }" class="code-block mb-4"></v-textarea>

                        <!-- 交互演示区域 -->
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="initialValue" label="初始值" type="number"
                                    outlined></v-text-field>
                                <v-btn color="primary" @click="initCounter" class="mb-4">
                                    初始化计数器
                                </v-btn>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-btn color="success" @click="callCounter" :disabled="!counter" class="mb-4">
                                    调用计数器
                                </v-btn>

                                <v-alert v-if="results.length > 0" type="info">
                                    <div v-for="(result, index) in results" :key="index">
                                        第 {{ index + 1 }} 次调用结果: {{ result }}
                                    </div>
                                </v-alert>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            initialValue: 10,
            counter: null,
            results: []
        }
    },
    methods: {
        initCounter() {
            this.counter = this.createCounter(this.initialValue)
            this.results = []
        },
        callCounter() {
            if (this.counter) {
                this.results.push(this.counter())
            }
        },
        createCounter(number) {
            let count = number
            const addCount = () => {
                return count++
            }
            return addCount
        }
    }
}
</script>

<style>
.code-block textarea {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
}
</style>