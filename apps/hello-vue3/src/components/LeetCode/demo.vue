<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

interface ThreeSceneProps {
    backgroundColor?: number
    rotationSpeed?: number
}

const props = withDefaults(defineProps<ThreeSceneProps>(), {
    backgroundColor: 0x1a2a6c,
    rotationSpeed: 0.01
})

const emit = defineEmits<{
    (e: 'cubeClick'): void
    (e: 'sceneReady'): void
}>()

const container = ref<HTMLDivElement | null>(null)

// Three.js相关变量
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial> | null = null
let animationId: number | null = null

onMounted(() => {
    if (container.value) {
        initThreeJS()
        animate()
        window.addEventListener('resize', onWindowResize)
        emit('sceneReady')
    }
})

onUnmounted(() => {
    cleanup()
})

function initThreeJS(): void {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(props.backgroundColor)

    // 创建相机
    camera = new THREE.PerspectiveCamera(
        75,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    )
    camera.position.z = 5

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    renderer.domElement.addEventListener('click', handleCanvasClick)
    container.value.appendChild(renderer.domElement)

    // 创建立方体
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        specular: 0x555555,
        shininess: 30
    })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
}

function onWindowResize(): void {
    if (!container.value || !camera || !renderer) return

    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

function animate(): void {
    if (!scene || !camera || !renderer || !cube) return

    animationId = requestAnimationFrame(animate)

    cube.rotation.x += props.rotationSpeed
    cube.rotation.y += props.rotationSpeed

    renderer.render(scene, camera)
}

function handleCanvasClick(): void {
    emit('cubeClick')
}

function changeCubeColor(color: number): void {
    if (cube) {
        cube.material.color.setHex(color)
    }
}

function cleanup(): void {
    if (animationId) {
        cancelAnimationFrame(animationId)
    }

    if (renderer) {
        renderer.dispose()
        renderer.domElement.removeEventListener('click', handleCanvasClick)
    }

    window.removeEventListener('resize', onWindowResize)

    // 清理Three.js对象
    if (cube) {
        cube.geometry.dispose()
        cube.material.dispose()
    }

    scene = null
    camera = null
    renderer = null
    cube = null
}

// 暴露方法给父组件
defineExpose({
    changeCubeColor
})
</script>

<template>
    <div ref="container" class="three-container" />
</template>

<style scoped>
.three-container {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
}
</style>