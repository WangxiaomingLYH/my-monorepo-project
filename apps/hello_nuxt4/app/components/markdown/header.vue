<script setup lang="ts">
const { t } = useI18n()
const { handleNavigation } = useLangNavigation()

const tipText = computed(() => {
    return {
        topTip: t('topTip'),
        readmeTip: t('readme'),
        articleTip: t('article'),
        homeTip: t('home'),
    }
})
const jumpPath = {
    readme: 'readme',
    article: 'article',
    home: '/'
}
const topTip = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <div class="fixed right-10 bottom-10">
        <v-speed-dial location="top center" transition="slide-y-reverse-transition">
            <template v-slot:activator="{ props: activatorProps }">
                <v-fab v-bind="activatorProps" size="large" icon="$vuetify" text="Extended"></v-fab>
            </template>
            <div key="1">
                <v-tooltip :text="tipText.topTip">
                    <template v-slot:activator="{ props }">
                        <v-btn @click="topTip" v-bind="props" icon="mdi-format-align-top" />
                    </template>
                </v-tooltip>
            </div>
            <!-- <div key="2">
                <v-tooltip :text="tipText.readmeTip" key="2">
                    <template v-slot:activator="{ props }">
                        <v-btn @click="handleNavigation(jumpPath.readme)" v-bind="props" icon="mdi-ampersand" />
                    </template>
                </v-tooltip>
            </div>
            <div key="3">
                <v-tooltip :text="tipText.articleTip" key="3">
                    <template v-slot:activator="{ props }">
                        <v-btn @click="handleNavigation(jumpPath.article)" v-bind="props" icon="mdi-atom" />
                    </template>
                </v-tooltip>
            </div> -->
            <div key="4">
                <v-tooltip :text="tipText.homeTip" key="4">
                    <template v-slot:activator="{ props }">
                        <v-btn @click="handleNavigation(jumpPath.home)" v-bind="props" icon="mdi-home-edit-outline" />
                    </template>
                </v-tooltip>
            </div>
        </v-speed-dial>
    </div>
</template>

<style scoped lang="scss"></style>