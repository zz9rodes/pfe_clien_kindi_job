import './tailwindcss.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Appwritelogin } from './app_write/files';


async function initApp() {
    await Appwritelogin();
}


import App from './App.vue'
import router from './router'

import "notyf/notyf.min.css";

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')

initApp()
