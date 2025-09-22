<script setup lang="ts">
import type { DataTableHeader } from "vuetify"

const selected = ref([])
const search = ref('49')
const headers = ref<DataTableHeader[]>([
    { title: 'Boat Type', align: 'start', key: 'name' },
    { title: 'Speed(knots)', align: 'end', key: 'speed' },
    { title: 'Length(m)', align: 'end', key: 'length' },
    { title: 'Price($)', align: 'end', key: 'price', value: (item) => formatPrice(item.price) },
    { title: 'Year', align: 'end', key: 'year' },
    {
        title: '测试', key: 'test', align: 'center', children: [
            { title: '测试的子项1', key: 'price' },
            { title: '测试的子项2', key: 'year', value: 'name' },
        ]
    }
])
const boats = [
    {
        name: 'Speedster',
        speed: 35,
        length: 22,
        price: 300000,
        year: 2021,
    },
    {
        name: 'OceanMaster',
        speed: 25,
        length: 35,
        price: 500000,
        year: 2020,
    },
    {
        name: 'Voyager',
        speed: 20,
        length: 45,
        price: 700000,
        year: 2019,
    },
    {
        name: 'WaveRunner',
        speed: 40,
        length: 19,
        price: 250000,
        year: 2022,
    },
    {
        name: 'SeaBreeze',
        speed: 28,
        length: 31,
        price: 450000,
        year: 2018,
    },
    {
        name: 'HarborGuard',
        speed: 18,
        length: 50,
        price: 800000,
        year: 2017,
    },
    {
        name: 'SlickFin',
        speed: 33,
        length: 24,
        price: 350000,
        year: 2021,
    },
    {
        name: 'StormBreaker',
        speed: 22,
        length: 38,
        price: 600000,
        year: 2020,
    },
    {
        name: 'WindSail',
        speed: 15,
        length: 55,
        price: 900000,
        year: 2019,
    },
    {
        name: 'FastTide',
        speed: 37,
        length: 20,
        price: 280000,
        year: 2022,
    },
]
const virtualBoats = computed(() => {
    return [...Array(10000).keys()].map(i => {
        const boat = { ...boats[i % boats.length] }
        boat.name = `${boat.name} #${i}`
        return boat
    })
})
const formatPrice = (value: number) => {
    return `$${value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}`
}

const log = () => {
    console.log(selected.value, "@selected")
}
</script>

<template>
    <v-btn @click="log">点击</v-btn>
    <!-- <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field> -->
    <v-data-table :headers="headers" :items="virtualBoats" height="400" show-select v-model="selected" return-object
        fixed-header :search="search">
        <template v-slot:item.exclusive="{ item }">
            <v-checkbox-btn :ripple="false"></v-checkbox-btn>
        </template>
    </v-data-table>
</template>

<style scoped lang="scss"></style>