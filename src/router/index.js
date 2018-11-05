import Vue from 'vue'
import Router from 'vue-router'


/* 新加部分 */
/* 首页 */
const Home = r => require.ensure([], () => r(require('../views/home/home.vue')), 'home');



Vue.use(Router)

// 配置路由
export default new Router({
  // mode: 'history',
  routes: [
    /* 首页部分 */
    {path: '/home', name: 'Home', component: Home, meta: {tabName:'首页',title:'首页'}},

    {path: '*', redirect: '/home' }
  ]
  // 说明 当meta中有tabName 时候才会显示 footTab
})
