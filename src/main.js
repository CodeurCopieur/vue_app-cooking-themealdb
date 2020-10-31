import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import bulma from 'bulma/css/bulma.css'

Vue.use(bulma)

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
