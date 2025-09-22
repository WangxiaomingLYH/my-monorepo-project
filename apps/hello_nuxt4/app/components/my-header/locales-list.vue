<script setup lang="ts">
import { useLocale } from "vuetify"

type Locale = 'en' | 'zhHans'

const localesList = <{ title: string, key: Locale }[]>[
    {
        title: "English",
        key: "en"
    },
    {
        title: "简体中文",
        key: "zhHans"
    }
]

const { locale, setLocale } = useI18n()
const { current } = useLocale()
const menu = ref(false)
const currentLocale = ref('')
watchEffect(() => {
    currentLocale.value = locale.value
})

const selectLocale = (key: Locale) => {
    setLocale(key)
    current.value = key
}
</script>

<template>
    <v-menu v-model="menu" offset-y>
        <template #activator="{ props }">
            <v-btn v-bind="props" variant="text">
                <v-icon icon="mdi-translate" class="mr-2" />
                <v-icon icon="mdi-chevron-down" class="ml-1" />
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="locale in localesList" :key="locale.key" @click="selectLocale(locale.key)"
                :active="currentLocale == locale.key">
                <v-list-item-title>{{ locale.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>