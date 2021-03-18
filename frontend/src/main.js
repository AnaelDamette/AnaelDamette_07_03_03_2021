import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/custom.scss'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
