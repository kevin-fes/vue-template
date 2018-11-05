<template>
  <div class="flex-column">
    <Titlebar class='f-17' :title='$route.meta.title' :showleft='false' theme='a'></Titlebar>
    <div class="flex-1 content">
     
    </div>
    <!-- toast提示组件 -->
    <Toast ref="tosat"> </Toast>
  </div>
</template>

<script>
  import Toast from '../../components/Toast'
  export default {
    name: 'Home',
    components: {
      Toast
    },
    data () {
      return {

      };
    },
    methods: {
      showToast () {
        this.$refs.tosat.show('服务器错误', 2000, true);
      },
    },
    mounted () {
      this.showToast();
    }
  };
</script>

<style lang="less" scoped>


</style>
