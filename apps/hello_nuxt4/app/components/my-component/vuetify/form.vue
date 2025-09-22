<script setup lang="ts">
import type { VForm } from 'vuetify/components'

const items = [
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
]

// 表单 - 带验证功能 -----------------------------------------------------------------
const formQuery = ref({
    firstName: 1,
    lastName: 2,
    password: 3,
    autocomplete: undefined,
    combobox: undefined,
    files: undefined
})
const rules = [
    function rules(value: string) {
        // 如果有值, 则验证通过
        if (value) return true
        return 'This is a required field.'
    }
]
const form = ref<VForm | null>(null)


const validate = async () => {
    if (!form.value) return
    const { valid } = await form.value.validate()
    // 验证通过
    if (valid) {
        submit()
    }
}
const reset = () => {
    console.log("reset 方法")
    // 重置表单内容
    form.value?.reset()
}
const resetValidation = () => {
    console.log("resetValidation 方法")
    // 重置验证
    form.value?.resetValidation()
}
const submit = () => {
    console.log(formQuery.value, "@formQuery")
}

// 日期展示卡片 -----------------------------------------------
const date = shallowRef()

// table表格 -----------------------------------------------
const data = [
    {
        name: 'African Elephant',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'African Elephant2',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'African Elephant3',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'African Elephant3',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'African Elephant3',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },

    {
        name: 'African Elephant3',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'African Elephant3',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
]
</script>

<template>
    <v-form ref="form">
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-radio-group>
                    <v-radio label="Radio One" value="one"></v-radio>
                    <v-radio label="Radio Two" value="two"></v-radio>
                    <v-radio label="Radio Three" value="three"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-otp-input></v-otp-input>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-file-input v-model="formQuery.files" label="开启多选允许一次上传多个文件" chips counter multiple
                    show-size></v-file-input>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-combobox v-model="formQuery.combobox" label="本质上是 v-text-field 组件, 可以填入新值"
                    :items="['武松', '鲁智深', '杨志']"></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-autocomplete v-model="formQuery.autocomplete" label="自动补全输入框, 只能在已有的范围内选择"
                    :items="['刘备', '关羽', '张飞']">
                </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field v-model="formQuery.firstName" :counter="10" label="First Name" :rules="rules" required />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field v-model="formQuery.lastName" :counter="10" label="Last Name" :rules="rules" />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field v-model="formQuery.password" :counter="10" label="Password" :rules="rules" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-btn @click="validate">Validate</v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-btn @click="reset">Reset Form</v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-btn @click="resetValidation">Reset Validation</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<style scoped lang="scss"></style>