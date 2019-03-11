

/* 新加部分 */
/* 首页 */
const Home = r => require.ensure([], () => r(require('../views/home/home.vue')), 'home');


// 配置路由
export default [
    /* 首页部分 */
    {path: '/home', name: 'Home', component: Home, meta: {tabName:'首页',title:'首页'}},

    {path: '*', redirect: '/home' }
]
