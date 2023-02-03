import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { TailwindPagination } from 'laravel-vue-pagination'

import './axios'
import './style.css'
import App from './App.vue'

const pinia = createPinia();
pinia.use(({store}) => {
    store.router = markRaw(router);
});
const app = createApp(App);
app.use(pinia);
app.use(router);
app.component('TailwindPagination', TailwindPagination);

app.mount('#app');
