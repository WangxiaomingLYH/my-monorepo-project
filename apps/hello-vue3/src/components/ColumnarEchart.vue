<script setup lang="ts">
/**
 * 封装的 Echart 表
 * npm install echarts
 * 数据由父组件通过 props 传递
 * 父组件传递的数据必须满足接口 DataList
 */

import * as echarts from 'echarts';
import { computed, nextTick, ref, watch } from 'vue';
import type { ColumnarEchartDataList } from "@/utils/template-config";
const chart = ref()
const props = defineProps({
    // 父组件传入数据列表
    dataList: {
        type: Array<ColumnarEchartDataList>,
        required: true
    }
})

const barWidth = 8
// 柱状图文字配置, 可使用i18n进行国际化
let legendData = computed(() => {
    // return ["点击量", "成功量", "成功率"]
    return ["Clicks", "Success", "Success rate"]
});
const yAxisName = computed(() => {
    return {
        firstName: '数量',
        lastName: "成功率"
    }
})
// 拿到x轴展示基数
const getxAxisData = computed(() => {
    const xAxisData = props.dataList.map((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return {
            week: `${year}${month}${day}`,
            moon: `${month}${day}`,
        };
    })
    if (props.dataList.length > 7) {
        return xAxisData.map((item) => {
            return item.moon
        })
    } else {
        return xAxisData.map((item) => {
            return item.week
        })
    }
})
// 拿到左侧y轴展示基数 (右侧y轴成功率 0 ~ 100)

// 拿到点击量数据
const firstColumn = props.dataList.map((item) => {
    return item.click
})
// 拿到成功量数据
const lastColumn = props.dataList.map((item) => {
    return item.complete
})
// 拿到成功率数据
const firstLine = props.dataList.map((item) => {
    return (Number(item.completeRate) * 100)
})

// 配置项
const option = computed(() => {
    return {
        backgroundColor: "#1b2735",
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params: Array<any>) {
                let str = params[0].name + ":";
                params.forEach((item) => {
                    if (item.componentSubType === "bar") {
                        str += `<br/>${item.seriesName}：${item.value}`;
                    } else if (item.seriesName === "成功率" || item.seriesName === "Success rate") {
                        str += `<br/>${item.seriesName}：${item.value.toFixed(2)}%`; // 显示成功率，保留两位小数
                    }
                });
                return str;
            },
        },
        legend: {
            icon: 'rect',
            right: "3%",
            top: '3%',
            itemWidth: 7, // 设置宽度
            itemHeight: 7, // 设置高度
            itemGap: 15, // 设置间距
            textStyle: { //图例文字的样式
                color: '#89BFE5',
                fontSize: 12
            }
        },
        grid: {
            top: '30%',
            left: '5%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            //坐标轴
            type: 'category',
            axisLabel: {
                color: '#C5DFFB',
                fontWeight: 500,
                fontSize: '12',
                interval: 0, // 强制显示所有标签
            },
            data: getxAxisData.value,  // 动态更新
        },
        yAxis: [
            {
                type: 'value',
                name: yAxisName.value.firstName,
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                    },
                },
            },
            {
                type: 'value',
                name: yAxisName.value.lastName,
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}%',
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            // 第一个柱子 左侧贴图
            {
                name: legendData.value[0],
                type: 'bar',
                barGap: "0%",
                barWidth: barWidth,
                itemStyle: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: 'rgba(4, 169, 255, 1)'
                    // }, {
                    //     offset: 1,
                    //     color: 'rgba(4, 169, 255,0)'
                    // }])
                    color: "rgba(11, 83, 128)"
                },
                data: firstColumn
            },
            // 第一个柱子 右侧贴图
            {
                name: legendData.value[0],
                type: 'bar',
                barGap: "0%",
                barWidth: 10,
                itemStyle: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: 'rgba(0, 67, 123, 1)'
                    // }, {
                    //     offset: 1,
                    //     color: 'rgba(0, 67, 123, 0)'
                    // }])
                    color: 'rgba(2, 143, 224)'
                },
                data: firstColumn,
                tooltip: {
                    show: false
                },
            },
            // 第一个柱子, 顶部贴图
            {
                name: legendData.value[0],
                type: "pictorialBar",
                symbolSize: [20, 6],
                symbolOffset: [-9, -4],
                symbolPosition: "end",
                symbol: "diamond",
                z: 12,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(4, 166, 251, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(2, 131, 197, 1)'
                    }])
                },
                tooltip: {
                    show: false
                },
                data: firstColumn
            },

            // 第二个柱子 左侧贴图
            {
                name: legendData.value[1],
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(4, 255, 169, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(4, 255, 169, 0)'
                    }])
                },
                data: lastColumn
            },
            // 第二个柱子 右侧贴图
            {
                type: 'bar',
                barWidth: 10,
                barGap: 0,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(4, 135, 91, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(4, 135, 91, 0)'
                    }])
                },
                data: lastColumn,
                tooltip: {
                    show: false
                },
            },
            // 第二根柱子, 顶部贴图
            {
                type: "pictorialBar",
                symbolSize: [20, 6],
                symbolOffset: [9, -4],
                symbolPosition: "end",
                symbol: "diamond",
                z: 12,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(10, 167, 88, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(10, 167, 88, 1)'
                    }])
                },
                tooltip: {
                    show: false
                },
                data: lastColumn
            },
            // 折线图
            {
                name: legendData.value[2],
                type: 'line',
                yAxisIndex: 1,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#F56C6C',
                },
                lineStyle: {
                    width: 3,
                },
                data: firstLine,  // 动态更新
            },

        ]
    }
})


const renderChart = () => {
    nextTick(() => {
        const myChart = echarts.init(chart.value);
        myChart.setOption(option.value);
    });
}

watch(
    () => props.dataList,
    (newData) => {
        renderChart();  // 每当值跟新后， 就对Echart进行初始化
    },
    { immediate: true } // 立即执行一次
);
</script>

<template>
    <div class="">
        <!-- ECharts图表 -->
        <div class="chart-container">
            <div ref="chart" style="width: 100%; height: 500px;"></div>
        </div>
    </div>
</template>

<style scoped lang="less"></style>