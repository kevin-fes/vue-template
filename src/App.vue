<template>
  <div id="mapp" v-cloak  :class="['flex-column',(Evn.isFullpage && Evn.isRong360 && Evn.isIphoneX)?'padding-top-ipx':(Evn.isFullpage && Evn.isRong360)?'padding-top-nipx':'']">
    <transition :name="transitionName" :mode="mode" :key="$route.fullPath">
      <router-view  class="router-item  flex-1 width-100" v-if="Evn.isAndroid" v-stop-scroll-android> </router-view>
      <router-view  class="router-item  flex-1 width-100" v-else></router-view>
    </transition>
    <Foot v-resize-foot v-if="$route.meta.tabName" @tabTo="onTabTo"/>

  </div>
</template>

<script>
import Foot from '@/components/foot.vue'
import mixins from './mixins'
import {Evn} from './service/env'
import {stopScrollAndroid,resizeFoot} from './directive'
import {mapState} from 'vuex';
export default {
  name: 'app',
  mixins:[mixins,stopScrollAndroid,resizeFoot],
  data (){
    return {
      Evn:Evn,
      transitionName:'router-fade',
      mode:''
    }
  },
  methods: {
    onTabTo (obj) {
      // 当点击tab跳转路由的时候 加一个tab标识 用来判断页面动画效果
      this.$router && this.$router.push({name:obj.name,params:{tab:true}})
    }
  },
  watch: {
    '$route' (to, from) {
      this.mode = '';
      if(from.fullPath == '/' || to.params.tab){
        // 首次加载页面 以及通过tab切换时候 页面为淡入淡出效果
        this.transitionName = 'router-fade'
        this.mode = 'out-in'
      }else if(this.routerState == '-1'){
        this.transitionName = 'router-out'
        this.changeRouterState(1);
      }else{
        this.transitionName = 'router-in'
      }
    }
  },
  computed: {
    ...mapState(['routerState'])
  },
  mounted(){
    let self = this;
    // 解决body被拖动
    document.body.addEventListener('touchmove', function (evt) {
      if (!evt._isScroller) {
        evt.preventDefault();
      }
    },{ passive: false });
  },
  components: {
    Foot
  }
  
}
</script>
<style lang='less'>
@import 'assets/css/common.less';
#mapp {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #EFEFF4;
  position: absolute;
  top:0;
  left: 0;
  bottom:0;
  right:0;
  height: 100%;
  overflow: hidden;
}


</style>
