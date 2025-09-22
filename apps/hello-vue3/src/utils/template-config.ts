import { ref } from "vue";

export interface ColumnarEchartDataList {
    click: number,
    complete: number,
    completeRate: string | number,
    date: string | number,
}
export interface TemplateConfig {
    ColumnarEchartDataList: Array<ColumnarEchartDataList>
}

export const templateConfig = ref<TemplateConfig | null>(null)

export const loadTemplateConfig = async () => {
    try {
        const response = await fetch("/template-config.json?t=" + Date.now())
        templateConfig.value = await response.json()
        console.log("加载template-config.json文件成功")
    } catch (error) {
        console.error("加载template-config.json文件失败", error)
    }
}