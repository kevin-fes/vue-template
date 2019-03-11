export default {
	state:{
		userName:'kevinmin',
    pages:[]
	},
  mutations:{
    setUserName (state, name) {
      state.userName = name
    },
  },
  getters: {
    pageLength: state => state.pages.length,
  },
  actions:{
    getUser({ state, commit }){
      // 自己的异步业务获取info
      let data = {
        name:'kevinmin'
      }
      commit('setUserName', data.name);
    }
  }
}