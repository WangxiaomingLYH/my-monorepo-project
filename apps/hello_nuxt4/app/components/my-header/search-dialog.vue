<script setup lang="ts">
const { t } = useI18n()
const openDialog = defineModel<boolean>("openDialog", { required: true })
const formRef = ref()
const query = ref('')
// 其实已经不需要这么做了，因为 nuxt 里的 i18n 是通过切换域名做的，所以一定会刷新。不过这里通过 computed 变为只读的也行，增强健壮度
const searchTip = computed(() => {
    return t('searchTip')
})
const searchSource = computed(() => {
    return t('searchSource')
})
const rules = [
    (v: string) => !!v || searchTip.value
]

const validateAndSearch = async () => {
    const { valid } = await formRef.value.validate()
    valid && search()
}
const search = () => {
    window.open(`https://cn.bing.com/search?form=bing&q=${query.value}`)
}
</script>

<template>
    <v-dialog v-model="openDialog" transition="dialog-top-transition" width="auto">
        <v-card class="mx-auto" width="600">
            <v-card-subtitle>
                <!-- <v-text-field> 默认渲染为 <input>，如果它处在 <form> 标签内，按回车会触发表单的 submit 行为，从而刷新页面。所以需要手动阻止 from 的默认事件 -->
                <v-form ref="formRef" @submit.prevent>
                    <v-text-field :label="searchSource" variant="underlined" v-model="query" :rules="rules"
                        @keyup.enter="validateAndSearch">
                        <template #append>
                            <span class="py-1 px-2 ms-2 rounded text-caption border text-disabled">Enter</span>
                        </template>
                        <template #prepend>
                            <v-icon icon="mdi-magnify" @click="validateAndSearch"></v-icon>
                        </template>
                    </v-text-field>
                </v-form>
            </v-card-subtitle>
            <!-- <v-img width="auto" height="400px" src="/sunshine.png" cover></v-img> -->
        </v-card>
    </v-dialog>
</template>