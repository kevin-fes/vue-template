
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'


import {fetch} from './service/fetch'

require('./service/polyfill');


// 绑定fetch到vue原型链上 方便调用
Vue.prototype.$fetch = fetch;
Vue.config.productionTip = false

new Vue({
  el: '#mapp',
  router,
  template: '<App/>',
  mode: 'history',
  store,
  components: {
    App
  }
})



