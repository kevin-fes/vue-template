import {mapMutations} from 'vuex';
import {stopScroll} from '../directive'
export default {
  mixins: [stopScroll],
    data(){
      return {
        
      }
    },
    methods: {
      ...mapMutations(['updataRouterState']),
      routerBack(){
        this.changeRouterState(-1);
        this.$router && this.$router.go(-1)
      },
      changeRouterState(val){
        this.updataRouterState(val)
      },
      // goRouter
      goRouter(name,params){
        !params && this.$router && this.$router.push(name)
         params && this.$router && this.$router.push({ name: name, params: params})
      },
      // goRouter
      goRouterQuery(name,params){
        !params && this.$router && this.$router.push(name)
         params && this.$router && this.$router.push({ name: name, query: params})
      }
    }
}
