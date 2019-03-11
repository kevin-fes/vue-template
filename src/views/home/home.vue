<template>
  <div class="flex-column">
    home

    <!-- toast提示组件 -->
    <Toast ref="tosat"> </Toast>
  </div>
</template>

<script>
  import Toast from '../../components/Toast'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
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
    computed:{

    },
    mounted () {
      // this.showToast();
    }
  };
</script>

<style lang="less" scoped>


</style>
