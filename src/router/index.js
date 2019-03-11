import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {setTitle} from '../service/utils'




Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})


// 跳转前拦截
router.beforeEach((to, from, next) => {
  next()
})

//跳转后业务处理
router.afterEach(to => {
  setTitle(to.meta.title);
  window.scrollTo(0, 0)
})


export default router

