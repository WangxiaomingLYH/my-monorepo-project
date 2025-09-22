<script setup lang="ts">
/**
 * 封装的人机验证组件
 * 双向绑定 human , 验证通过后为 true
 */

import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';


// 类型定义
type SymbolType = string;
type Position = {
    x: number;
    y: number;
    rotation: number;
};
type SymbolData = {
    text: SymbolType;
    x: number;
    y: number;
    rotation: number;
};
type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type Status = 'success' | 'error' | '';

defineProps({
    human: {
        type: Boolean,
        required: true
    }
})


// 使用符号替代文字
const symbolsList = ['⬛', '⬜', '🔶', '🔷', '🌟', '✨', '🍉', '🍇', '🍓', '🍋', '🍌', '⚡', '⛄', '⛔', '⭕', '❌', '💥', '💢', '💦', '💧',];

// 定义常量
const SYMBOL_COUNT = 5;
const SYMBOL_SIZE = 90;
const AREA_WIDTH = 500;  // 容器宽度边界
const AREA_HEIGHT = 250;  // 容器高度边界
const ROTATION_RANGE = 0;

// 响应式数据
const targetSequence = ref<string>('');
const selectedSymbols = ref<SymbolType[]>([]);
const symbols = ref<SymbolData[]>([]);
const status = ref<Status>(''); // 'success', 'error', or ''
const isHuman = defineModel('human')


// 碰撞检测
const isOverlapping = (rect1: Rect, rect2: Rect): boolean => {
    return !(
        rect1.x + rect1.width <= rect2.x ||
        rect2.x + rect2.width <= rect1.x ||
        rect1.y + rect1.height <= rect2.y ||
        rect2.y + rect2.height <= rect1.y
    );
};

// 生成随机位置
const generateRandomPosition = (existingPositions: Position[]): Position => {
    const maxAttempts = 10000;
    let attempts = 0;
    let position;
    let overlapping;

    do {
        if (attempts >= maxAttempts) {
            console.warn("无法生成不重叠的位置，使用重叠位置");
            break;
        }

        overlapping = false;
        position = {
            x: Math.floor(Math.random() * (AREA_WIDTH - SYMBOL_SIZE)),
            y: Math.floor(Math.random() * (AREA_HEIGHT - SYMBOL_SIZE)),
            rotation: Math.floor(Math.random() * (ROTATION_RANGE * 2 + 1)) - ROTATION_RANGE
        };

        // 创建假想区域用于碰撞检测
        const rect1 = {
            x: position.x,
            y: position.y,
            width: SYMBOL_SIZE,
            height: SYMBOL_SIZE
        };

        // 检测是否与其他符号重叠
        for (const existing of existingPositions) {
            const rect2 = {
                x: existing.x,
                y: existing.y,
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE
            };

            if (isOverlapping(rect1, rect2)) {
                overlapping = true;
                break;
            }
        }

        attempts++;
    } while (overlapping);

    return position!;
};



// 选择符号
const selectSymbol = (symbol: SymbolType): void => {
    if (selectedSymbols.value.includes(symbol)) {
        // 如果已选择，取消选择
        selectedSymbols.value = selectedSymbols.value.filter(s => s !== symbol);
    } else {
        // 添加到已选择列表
        selectedSymbols.value = [...selectedSymbols.value, symbol];
    }

    checkSequence();
};

// 检查序列
const checkSequence = () => {
    if (selectedSymbols.value.length === SYMBOL_COUNT) {
        const userSequence = selectedSymbols.value.join('');

        if (userSequence === targetSequence.value) {
            status.value = 'success';
            ElMessage.success('验证正确！');
            isHuman.value = true
        } else {
            status.value = 'error';
            isHuman.value = false
            ElMessage.error('顺序错误，请重试');
            setTimeout(resetSelection, 1000);
        }
    }
};

// 重置选择
const resetSelection = () => {
    selectedSymbols.value = [];
    status.value = '';
};

// 重新生成符号
const changeImage = () => {
    resetSelection();
    generateSymbols();
};

// 生成符号
const generateSymbols = () => {
    const newSymbols = [];
    const positions = [];

    // 随机选择符号
    const selectedSymbols: SymbolType[] = [];
    while (selectedSymbols.length < SYMBOL_COUNT) {
        const randomSymbol = symbolsList[Math.floor(Math.random() * symbolsList.length)];
        if (!selectedSymbols.includes(randomSymbol)) {
            selectedSymbols.push(randomSymbol);
        }
    }

    // 生成位置
    for (const symbol of selectedSymbols) {
        const position = generateRandomPosition(positions);
        positions.push(position);

        newSymbols.push({
            text: symbol,
            x: position.x,
            y: position.y,
            rotation: position.rotation
        });
    }

    symbols.value = newSymbols;
    targetSequence.value = selectedSymbols.join('');
};

// 初始化
onMounted(() => {
    isHuman.value = false
    generateSymbols();
});
</script>

<template>
    <div class="">
        <el-card>
            <template #header>
                请按照顺序点击: <span class="sequence">{{ targetSequence }}</span>
            </template>

            <div class="verification-area">
                <div v-for="(symbol, index) in symbols" :key="index" class="symbol-container"
                    :class="{ selected: selectedSymbols.includes(symbol.text) }" :style="{
                        left: symbol.x + 'px',
                        top: symbol.y + 'px',
                        transform: `rotate(${symbol.rotation}deg)`
                    }" @click="selectSymbol(symbol.text)">
                    <span>{{ symbol.text }}</span>
                    <span v-if="selectedSymbols.includes(symbol.text)" class="order-number">
                        {{ selectedSymbols.indexOf(symbol.text) + 1 }}
                    </span>
                </div>
            </div>
            <template #footer>
                <!-- <el-button @click="resetSelection">重置</el-button> -->
                <el-button @click="changeImage" type="primary" :disabled="human" link>看不清? 换一张图</el-button>
            </template>
        </el-card>
    </div>
</template>

<style scoped>
.verification-area {
    position: relative;
    width: 100%;
    height: 250px;
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 25px;
    border: 1px solid #e0e6ed;
}

.symbol-container {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 24px;
    user-select: none;
}

.symbol-container.selected {
    background: rgba(52, 152, 219, 0.3);
    border-radius: 50%;
}

.order-number {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
</style>