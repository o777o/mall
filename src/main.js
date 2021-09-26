import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

// lazyload的options
const loading = require('./assets/img/common/loading.gif')

Vue.use(VueLazyload, {
  loading
})

Vue.use(toast)

Vue.config.productionTip = false;

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
