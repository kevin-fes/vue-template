<template>
  <div class='foot-bar border-top'>
    <div class="foot-item flex-column" v-if="item.routerName!='Home' || (item.routerName =='Home' && cooperation_method!=2)" @click="tabTo(item.routerName)" v-for='(item,index) in tabs' :key='index'>
      <div :class="['icon-img',currentName == item.routerName?item.activeIcon:item.defaultIcon]"></div>
      <div class="text-center f-10" :class="[currentName == item.routerName?'color-theme':'']">{{item.tabName}}</div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        tabs:[
          {
            routerName:'Home',
            tabName:'首页',
            defaultIcon:'icon-tab-shouye',
            activeIcon:'icon-tab-shouye-active'
          },
          {
            routerName:'Product',
            tabName:'推广',
            defaultIcon:'icon-tab-tuiguang',
            activeIcon:'icon-tab-tuiguang-active'
          },
          {
            routerName:'Order',
            tabName:'订单',
            defaultIcon:'icon-tab-dingdan',
            activeIcon:'icon-tab-dingdan-active'
          },
          {
            routerName:'User',
            tabName:'账户',
            defaultIcon:'icon-tab-wode',
            activeIcon:'icon-tab-wode-active'
          }
        ]
      }
    },
    methods:{
      tabTo(name){
        this.$emit('tabTo',{
          name:name
        })
      }
    },
    computed:{
       ...mapState(['cooperation_method']),
      currentName(){
        return this.$route.name;
      }
    },
    mounted(){
     
    }
  }
</script>

<style scoped lang='less'>
  .foot-bar{
    width: 100%;
    display: flex;
    height: 54px;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    background-color: #fafafa;
  }
  .foot-item{
    flex:1;
    align-items: center;
    justify-content: center;
  }
  .text-center{
    text-align: center;
  }
  .icon-img{
    width: 24px;
    height: 24px;
  }

</style>