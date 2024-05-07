import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

const toastOptions = {
  position: "top-left",
  timeout: 3000,
};

// Assumes you have a <div id="app"></div> in your index.html
myApp.use(router).use(Toast, toastOptions).mount('#app')