import Vue from 'vue'
import App from './App.vue'
import router from "./router/";
import store from './store'

import VueRouter from "vue-router";
import Element from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"

// import axios from "./axios";
import cos from "./cos"

Vue.use(Element)
Vue.use(VueRouter)

// require("./mock.js")
// Vue.prototype.$axios = axios
Vue.prototype.$cos = cos
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
