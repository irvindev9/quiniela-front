import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import "izitoast/dist/css/iziToast.min.css";

let vm = createApp(App).use(router).use(createPinia()).mount('#app')

export default vm
