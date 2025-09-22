<script setup lang="ts">
// v-footer组件：https://vuetifyjs.com/zh-Hans/components/footers/
const { t } = useI18n()
const { handleNavigation } = useLangNavigation()

const icons = [
    { icon: 'mdi-nuxt', href: 'https://nuxt.com/' },
    { icon: 'mdi-tailwind', href: 'https://tailwindcss.com/' },
    { icon: 'mdi-vector-square', href: 'https://pictogrammers.com/library/mdi/' },
    { icon: 'mdi-vuetify', href: 'https://vuetifyjs.com/' }
]
const links = computed(() => {
    return [
        {
            title: t('privacyPolicy'),
            path: '/article/title-privacy',
        },
        {
            title: t('cookiePolicy'),
            path: '/article/title-cookie',
        },
        {
            title: t('about'),
            path: '/article/title-about',
        },
    ]
})
const openHref = (href: string) => {
    // noopener,noreferrer：断开 window.opener，安全性更高
    window.open(href, '_blank', 'noopener,noreferrer')
}
</script>

<template>
    <v-footer class="text-center d-flex flex-column ga-2 py-4" border>
        <div class="d-flex ga-3">
            <v-btn v-for="item in icons" :key="item.icon" :icon="item.icon" density="comfortable" variant="text"
                @click="openHref(item.href)" />
        </div>
        <v-divider class="my-2" thickness="2" width="50"></v-divider>
        <div class="text-caption font-weight-regular opacity-60 footer-max-width">
            {{ $t('footerText') }}
        </div>
        <v-divider></v-divider>
        <div class="text-caption font-weight-regular">
            {{ $t('copyright') }} © {{ new Date().getFullYear() }} GP CPA
        </div>
        <v-divider></v-divider>
        <div class="font-weight-regular">
            <template v-for="(item, index) in links" :key="index">
                <!-- <nuxt-link :to="item.path">
                    {{ item.title }}
                </nuxt-link> -->
                <span @click="handleNavigation(item.path)">
                    {{ item.title }}
                </span>
                <template v-if="index !== links.length - 1">
                    &nbsp;·&nbsp;
                </template>
            </template>
        </div>
    </v-footer>
</template>

<style scoped lang="scss">
.footer-max-width {
    max-width: 1440px;
}
</style>