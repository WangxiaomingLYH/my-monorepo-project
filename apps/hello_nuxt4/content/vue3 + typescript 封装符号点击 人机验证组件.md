---
title: vue3 + typescript 封装符号点击 人机验证组件
---

项目配置信息如下

```
"vue": "^3.5.12",
"vue3-captcha": "^0.3.4",
"vue3-recaptcha2": "^1.8.0",
"typescript": "~5.6.0",
"element-plus": "^2.9.10",
```


# 正文

在前端开发人机验证功能时, 通常会用到这两个插件

## Google 人机验证
简述: 显式进行人机验证; 使用 reCAPTCHA v2 版本
安装: `npm install vue3-recaptcha2` 
使用: `<vue-recaptcha />`, 代码见`Recaptcha2.vue`

###### **API**:

中文api地址: `https://developers.google.com/recaptcha/docs/display?hl=zh-cn#render_param`

**props** 参数

- `sitekey`: 网站密钥, 可辅助统计通过及未通过验证申请的请求
- `theme`: 主题颜色, `dark light | light`可选, 默认`light``
- ``size`: 大小. `compact  | normal`, 默认`normal`
- hl`: 全称`host language`, 指定验证码的界面语言, 默认根据浏览器语言传递`
- loadingTimeout`: 脚本加载超时时间, 单位为毫秒

**emit** 事件

- `verify`: 验证成功时触发, 可以拿到验证成功后的 token
- `error`: 验证错误时触发, 加载或验证失败时进行的操作
- `expire`: 验证过期时触发, 用户长时间未操作, 会话过期时进行的操作
- `fail`:  根据源码可知, 也是验证失败时触发

![在这里插入图片描述](./images/image-202507011618096716.png)	
**最终效果**:
	![image-20250815181758116](vue3%20+%20typescript%20%E5%B0%81%E8%A3%85%E7%AC%A6%E5%8F%B7%E7%82%B9%E5%87%BB%20%E4%BA%BA%E6%9C%BA%E9%AA%8C%E8%AF%81%E7%BB%84%E4%BB%B6.assets/image-20250815181758116.png)

**优点:** 能够很方便的统计历史验证记录, 网站访问流量等
**缺点:** 国内网络可能会加载很慢

## vue3-captcha 数字验证
简述: 更简洁的数字验证
安装: `npm install vue3-captcha`
使用: `<Captcha ref="refCode" />`, 代码见`Captcha.vue`

###### **API:**

- `check`: 组件实例上的校验方法, 验证成功后触发

- 其他 API 见源码

  ```ts
  
  declare module 'vue3-captcha' {
    export type CaptchaInstance={
      check:Function;
      refresh:Function
    } | null
    type captchaProps={
       width?:number
       height?:number
       borderColor?:string
       bgColor?:string
       failRefresh?:boolean
       clickRefresh?:boolean
    }
     const _default:import("vue").DefineComponent<captchaProps>
     export  default _default
  }
  ```

**最终效果**
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/6177079d87a84b6fbcef849496c2b202.png)

**优点:** 非常简洁
**缺点:** 丑

## 自定义符号点击验证组件

简述: 使用`defineModel`进行父子组件通信(需 vue 3.4+ 版本可用); 自定义样式及 symbol

使用: `<SymbolClickVerify :human="human" />`, 见代码`SymbolClickVerify .vue`

最终效果:

<img src="/images/image-20250701163020517.png" alt="image-20250701163020517" style="zoom:50%;float:left;" />

**props 参数**

`human`: 必传项, 返回验证结果(布尔值)

**常量**

`AREA_WIDTH`: 容器宽度边界

`AREA_HEIGHT`: 容器高度边界

**函数**

`checkSequence`: 检查序列是否正确

`selectSymbol`: 记录用户点击序列

`generateRandomPosition`: 生成随机位置





# 代码

## Recaptcha2.vue

```
<script setup>
// ts 环境下需自己声明 module
import VueRecaptcha from 'vue3-recaptcha2'

// const reCAPTCHALocked = ref(true)
const siteKey = 'XXXXXXXXXXXXXXXXX'

// //获取token发送到后端验证
const onVerify = (token) => {
    console.log('Token:', token) // 发送到后端验证
    // reCAPTCHALocked.value = false
}
// //过期后执行动作
// const recaptchaExpired = () => {

// }

// //失败执行动作
// const recaptchaFailed = () => {

// }
</script>

<template>
    <div class="">
        <vue-recaptcha :sitekey="siteKey" @verify="onVerify" hl="en" @expire="recaptchaExpired"
            @fail="recaptchaFailed" />
    </div>
</template>

<style scoped lang="less"></style>
```

## `Captcha.vue`

```
<script setup lang="ts">
import { ref } from "vue"
import Captcha from 'vue3-captcha';
import type { CaptchaInstance } from 'vue3-captcha'
let value = ref('')
let refCode = ref<CaptchaInstance>(null)
const handleCheck = () => {
    if (refCode.value?.check(value.value)) {
        console.log("check success")
    }
}

</script>

<template>
    <el-row>
        <el-col :span="24">
            <Captcha ref="refCode"/>
        </el-col>
        <el-col :span="24">
            <el-input v-model="value" />
            <el-button @click="handleCheck">校验</el-button>
        </el-col>
    </el-row>
</template>
```

## `SymbolClickVerify`

```
<script setup lang="ts">
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
    const maxAttempts = 1000;
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
```

