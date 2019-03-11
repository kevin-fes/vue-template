import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'



Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
  	routerState:1,  // -1为后退 其余为非后退 用户判断页面进入退出动画
	},
  mutations:{
    updataRouterState(state,value){
      state.routerState = value;
    },
   
  },
  actions: {
    //
  },
  modules: {
    user
  }
});

export default store;


// 使用说明
//使用state 与getter
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// computed: {
//   ...mapState({
//   	 state.routerState,
//     userName: state => state.user.userName,
//   }),
//   ...mapState(['routerState']),
//   ...mapGetters([
//     'getUser'
//   ])
// },
// methods:{
//   ...mapMutations([
//     //
//   ]),
//   ...mapActions([
//     //
//   ]),
// }

