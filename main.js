import Vue from 'vue'
import App from './App'
import api from 'api/api.js'
import status from 'components/status.vue'
Vue.component('page-status',status)
Vue.config.productionTip = false
Vue.prototype.api=api
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
