import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

// vue-router
import router from "./router/index";

// pinia
import pinia from "./store/index";

const app = createApp(App)

app.use(vuetify).use(router).use(pinia)

app.mount('#app')
