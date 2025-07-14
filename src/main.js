import './tailwindcss.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import "notyf/notyf.min.css";

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')
