import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import bulma from 'bulma/css/bulma.css'
import vionicons from 'vue-ionicons/ionicons.css'

Vue.use(bulma, vionicons)

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
