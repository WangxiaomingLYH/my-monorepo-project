// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { en, zhHans } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
    const defaultLocale = import.meta.env.NUXT_PUBLIC_DEFAULT_LOCALE
    const vuetify = createVuetify({
        ssr: true,  // 需要手动开启，否则会警告：Hydration class mismatch on
        locale: {
            locale: defaultLocale,
            messages: { zhHans, en },
        }
    })
    app.vueApp.use(vuetify)
})