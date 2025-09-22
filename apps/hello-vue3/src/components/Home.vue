<script lang="ts" setup>
// 根据输入文字，生成可能组合的文本
import { computed, ref } from 'vue';

const inputText = ref('');
const excludeSingleChar = ref(true);
const search = ref('');
const allCombinations = ref<string[]>([]);
const selected = ref<string[]>([]);

const filteredCombinations = computed(() => {
    let result = allCombinations.value;
    // 应用搜索过滤
    if (search.value) {
        result = result.filter(item => item.includes(search.value));
    }
    return result;
});

const generateMultiCharSubsequences = (): void => {
    if (!inputText.value) {
        allCombinations.value = [];
        return;
    }

    const result = new Set<string>();
    const len = inputText.value.length;

    function backtrack(start: number, path: string[]) {
        if ((!excludeSingleChar.value || path.length >= 2) && path.length > 0) {
            result.add(path.join(""));
        }

        for (let i = start; i < len; i++) {
            path.push(inputText.value[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    allCombinations.value = Array.from(result).sort((a, b) =>
        a.length - b.length || a.localeCompare(b)
    );
    selected.value = [];
};

const removeSelected = () => {
    allCombinations.value = allCombinations.value.filter(
        item => !selected.value.includes(item)
    );
    selected.value = [];
};

const copyToClipboard = () => {
    const text = filteredCombinations.value.join('\n');
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('已复制到剪贴板');
        })
        .catch(err => {
            console.error('复制失败:', err);
        });
};

// 初始化时生成一次组合
generateMultiCharSubsequences();
</script>

<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>输入文本</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="inputText" label="输入要生成组合的文本" clearable></v-text-field>
                            <v-checkbox v-model="excludeSingleChar" label="排除单字组合"></v-checkbox>
                            <v-card-actions>
                                <v-btn color="primary" @click="generateMultiCharSubsequences">
                                    <v-icon left>mdi-autorenew</v-icon>
                                    生成组合
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>
                            生成的组合 (共 {{ filteredCombinations.length }} 种)
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line
                                hide-details></v-text-field>
                        </v-card-title>

                        <v-card-text>
                            <v-chip-group v-model="selected" multiple column>
                                <v-chip v-for="(item, index) in filteredCombinations" :key="index" filter :value="item">
                                    {{ item }}
                                </v-chip>
                            </v-chip-group>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="error" @click="removeSelected" :disabled="selected.length === 0">
                                <v-icon left>mdi-delete</v-icon>
                                删除选中项
                            </v-btn>

                            <v-btn color="primary" @click="copyToClipboard">
                                <v-icon left>mdi-content-copy</v-icon>
                                复制结果
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style scoped>
.v-chip {
    margin: 4px;
}
</style>