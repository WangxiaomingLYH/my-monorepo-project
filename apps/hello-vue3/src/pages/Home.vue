<script setup lang="ts">
import demo from '@/components/LeetCode/demo.vue';
import { ref } from 'vue'

interface ColorOption {
    name: string
    value: number
}

const rotationSpeed = ref<number>(0.01)
const sceneBackground = ref<number>(0x1a2a6c)

const colorOptions: ColorOption[] = [
    { name: '绿色', value: 0x00ff00 },
    { name: '红色', value: 0xff0000 },
    { name: '蓝色', value: 0x0000ff },
    { name: '黄色', value: 0xffff00 },
    { name: '紫色', value: 0xff00ff }
]

const backgroundOptions: ColorOption[] = [
    { name: '深蓝', value: 0x1a2a6c },
    { name: '深紫', value: 0x4a154b },
    { name: '深绿', value: 0x1b4332 },
    { name: '深灰', value: 0x333333 }
]

function handleCubeClick(): void {
    console.log('立方体被点击了！')
}

function handleSceneReady(): void {
    console.log('Three.js场景已准备就绪')
}

function changeSpeed(speed: number): void {
    rotationSpeed.value = speed
}

function changeBackgroundColor(color: number): void {
    sceneBackground.value = color
}
</script>

<template>
    <div class="app">
        <header>
            <h1>Vue 3.4 + TypeScript + Three.js</h1>
            <p>使用Vite构建的现代化3D应用</p>
        </header>

        <main>
            <div class="scene-section">
                <demo :rotation-speed="rotationSpeed" :backgroundColor="sceneBackground"
                    @cube-click="handleCubeClick" @scene-ready="handleSceneReady" />
            </div>

            <div class="controls-section">
                <div class="control-group">
                    <h3>旋转速度控制</h3>
                    <div class="button-group">
                        <button @click="changeSpeed(0.02)">加速 (2x)</button>
                        <button @click="changeSpeed(0.01)">正常速度</button>
                        <button @click="changeSpeed(0.005)">减速 (0.5x)</button>
                        <button @click="changeSpeed(0)">停止</button>
                    </div>
                </div>

                <div class="control-group">
                    <h3>背景颜色</h3>
                    <div class="button-group">
                        <button v-for="option in backgroundOptions" :key="option.value"
                            @click="changeBackgroundColor(option.value)"
                            :style="{ backgroundColor: '#' + option.value.toString(16) }">
                            {{ option.name }}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.app {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px 0;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
}

header p {
    opacity: 0.8;
    font-size: 1.1rem;
}

.scene-section {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
}

.controls-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.control-group {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    backdrop-filter: blur(10px);
}

.control-group h3 {
    margin-bottom: 15px;
    text-align: center;
    color: #fff;
}

.button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
}

button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}
</style>