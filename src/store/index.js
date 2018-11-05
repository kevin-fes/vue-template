import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let state = {
  routerState:1,  // -1为后退 其余为非后退 用户判断页面进入退出动画
}

const store = new Vuex.Store({
  state,
  mutations:{
    updataRouterState(state,value){
      state.routerState = value;
    },
   
  }
});

export default store;
