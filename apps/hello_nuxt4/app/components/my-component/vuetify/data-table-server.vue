<script setup lang="ts">
import type { DataTableHeader } from "vuetify"

// 假数据类型
interface Dessert {
    name: string
    calories: number
    fat: number
    carbs: number
    protein: number
    iron: string
}

// 排序条件类型
interface SortOption {
    key: keyof Dessert
    order: 'asc' | 'desc'
}

// FakeAPI 参数类型
interface FetchParams {
    page: number
    itemsPerPage: number
    sortBy: SortOption[]
}

// FakeAPI 返回类型
interface FetchResult {
    items: Dessert[]
    total: number
}

const search = ref('')
const serverItems = ref<Dessert[]>([])
const itemsPerPage = ref(5)
const loading = ref(true)
const totalItems = ref(0)

const headers: DataTableHeader[] = [
    {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: 'Calories', key: 'calories', align: 'end' },
    { title: 'Fat (g)', key: 'fat', align: 'end' },
    { title: 'Carbs (g)', key: 'carbs', align: 'end' },
    { title: 'Protein (g)', key: 'protein', align: 'end' },
    { title: 'Iron (%)', key: 'iron', align: 'end' },
]

const desserts: Dessert[] = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1',
    },
    {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0',
    },
    {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6',
    },
    {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7',
    },
    {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16',
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1',
    },
    {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2',
    },
    {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8',
    },
    {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45',
    },
    {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22',
    },
]

const FakeAPI = {
    async fetch({ page, itemsPerPage, sortBy }: FetchParams): Promise<FetchResult> {
        return new Promise(resolve => {
            setTimeout(() => {
                const start = (page - 1) * itemsPerPage
                const end = start + itemsPerPage
                const items = desserts.slice()

                if (sortBy.length) {
                    const sortKey = sortBy[0]!.key
                    const sortOrder = sortBy[0]!.order
                    items.sort((a, b) => {
                        const aValue = a[sortKey] as number
                        const bValue = b[sortKey] as number
                        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
                    })
                }

                const paginated = items.slice(start, end)

                resolve({ items: paginated, total: items.length })
            }, 500)
        })
    },
}

const loadItems = async ({ page, itemsPerPage, sortBy }: FetchParams) => {
    // console.log(page, "@page")
    // console.log(itemsPerPage, "@itemsPerPage")
    // console.log(sortBy, "@sortBy")
    loading.value = true
    const { items, total } = await FakeAPI.fetch({ page, itemsPerPage, sortBy })
    serverItems.value = items
    totalItems.value = total
    loading.value = false
}
</script>

<template>
    <div>itemsPerPage:{{ itemsPerPage }}</div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
        :items-length="totalItems" :loading="loading" :search="search" item-value="name"
        @update:options="loadItems"></v-data-table-server>
</template>