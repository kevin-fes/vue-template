<template>
  <div class="flex-column">
    <Titlebar class='f-17' :title='$route.meta.title' :showleft='false' theme='a'></Titlebar>
    <div class="flex-1 content width-100 padding-10">
      <form class="form-horizontal margin-top-20" role="form">
        <div class="form-group">
          <label for="lastname" class="col-xs-2 control-label">姓</label>
          <div class="col-xs-10">
            <input type="text" class="form-control" name='name' id="firstname" 
                placeholder="请输入名字">
          </div>
        </div>
        <div class="form-group">
          <label for="lastname" class="col-xs-2 control-label">姓</label>
          <div class="col-xs-10">
            <input type="text" class="form-control" data-le='99' name='age' id="lastname" 
              placeholder="请输入年龄">
          </div>
        </div>
      </form>
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
      // this.showToast();
    }
  };
</script>

<style lang="less" scoped>


</style>
