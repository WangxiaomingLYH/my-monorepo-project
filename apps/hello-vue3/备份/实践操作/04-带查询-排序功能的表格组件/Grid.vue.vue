<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    data: Array,
    columns: Array,
    filterKey: String,
});

// 响应式数据
const sortKey = ref("");
const sortOrders = ref(
    props.columns.reduce((result, column) => {
        result[column] = 1; // 初始化排序顺序
        return result;
    }, {})
);

// 计算过滤和排序后的数据
const filteredData = computed(() => {
    // 第一步：数据过滤
    let filtered = filterData(props.data, props.filterKey);

    // 第二步：数据排序
    if (sortKey.value) {
        filtered = sortData(
            filtered,
            sortKey.value,
            sortOrders.value[sortKey.value]
        );        
    }

    return filtered;
});

/**
 * 数组过滤方法
 * @param data 被查询的数据
 * @param filterKey 查询参数
 * @return newArray || []
 */
function filterData(data, filterKey) {
    if (!filterKey) return data;

    const searchTerm = filterKey.toLowerCase();
    return data.filter((row) => {
        // 模糊查询逻辑
        // return Object.keys(row).some((key) => {
        //     return String(row[key]).toLowerCase().includes(searchTerm);
        // });

        // 精确查询逻辑
        return Object.keys(row).some((key) => {
            console.log(String(row[key]).toLowerCase());
            return String(row[key]).toLowerCase() === searchTerm
        })
    });
}

// 数据排序方法
function sortData(data, sortKey, sortOrder) {
    return data
        .slice()  // 重新拷贝数组
        .sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];

            if (valueA === valueB) return 0;
            return (valueA > valueB ? 1 : -1) * sortOrder;
        });
}

// 排序交互方法
function handleSort(column) {
    if (sortKey.value === column) {
        // 反转当前列的排序顺序
        sortOrders.value[column] *= -1;
    } else {
        // 设置新的排序列
        sortKey.value = column;
        // 重置其他列的排序状态（可选）
    }
}

// 文本格式化方法
function formatHeader(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
</script>

<template>
    <div class="data-table">
        <!-- 数据表格 -->
        <table v-if="filteredData.length">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column" @click="handleSort(column)"
                        :class="{ active: sortKey === column }">
                        {{ formatHeader(column) }}
                        <span class="sort-arrow" :class="sortOrders[column] > 0 ? 'asc' : 'dsc'" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredData" :key="index">
                    <td v-for="column in columns" :key="column">
                        {{ item[column] }}
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 空状态 -->
        <p v-else class="empty-message">No matches found.</p>
    </div>
</template>

<!-- 样式部分保持不变 -->
<style>
table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
}

td {
    background-color: #f9f9f9;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}
</style>
