<template>
  <div class="messageBox hv-center" v-if="visibility">
    <div class="message-content hv-center">
      <div class="message-text f-14" :class="{'text-left':align == 'left'}">
        <div v-for="item in msg" :key='item'>{{item}}</div>
      </div>
      <div class="message-btns f-16">
        <div class="btn-one" @click="cancelHandle">{{cancleBtn?cancleBtn:'取消'}}</div>
        <div @click="confirmHandle">{{confirmBtn?confirmBtn:'确认'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageBox',
    props: ['visibility', 'cancleBtn', 'confirmBtn', 'content', 'align'],
    methods: {
      cancelHandle () {
        this.$emit('cancel');
      },
      confirmHandle () {
        this.$emit('confirm');
      }
    },
    computed: {
      msg () {
        let str = [];
        if (this.content && (Object.prototype.toString.call(this.content) === '[object String]' || Object.prototype.toString.call(this.content) === '[object Number]')) {
          str = [this.content];
        } else if (this.content && Object.prototype.toString.call(this.content) === '[object Array]') {
          str = this.content;
        }
        return str;
      }
    }
  };
</script>

<style scoped>
  .messageBox {
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .message-content {
    text-align: center;
    width: 270px;
    background: #fff;
    border-radius: 8px;
  }

  .message-text {
    padding: 20px;;
    border-bottom: 1px solid #e2e2e2;
    color: #030303;
  }

  .message-text > div {
    margin-bottom: 10px;
  }

  .message-btns {
    height: 50px;
    display: flex;
    display: -webkit-flex;
  }

  .message-btns > div {
    color: #0076ff;
    line-height: 50px;
    flex: 1;
    -webkit-flex: 1;
  }

  .btn-one {
    border-right: 1px solid #e2e2e2;
  }

  .text-left {
    text-align: left;
  }

</style>
