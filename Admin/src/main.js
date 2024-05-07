import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import '@fortawesome/fontawesome-free/css/all.css';


const myApp = createApp(App);

const toastOptions = {
    position: "top-left",
    timeout: 3000,
};

myApp.use(router).use(Toast, toastOptions).mount('#app');