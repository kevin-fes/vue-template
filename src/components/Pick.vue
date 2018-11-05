<template>
<transition name="scroll-move">
  <div v-show="visible" class="scroll-container">
      <div class="">
        <div class="top-bar">
          <div class="top-bar-item" @click="cancel">取消</div>
          <div class="top-bar-item" @click="changeIndex">确定</div>
        </div>
        <div class="scroll-body"
            @touchstart.stop.prevent="touchStart"
            @touchmove.stop.prevent="touchMove"
            @touchend.stop.prevent="touchEnd">
          <div class="scroll-mask"></div>
          <div class="scroll-indicator"></div>
          <div class="scroll-content" :style="{transform: `translate3d(0px,${scrollHeight}px,120px)`}">
            <div class="scroll-item" v-for="(item, index) of list" :key='index'>
              <div class="scroll-item-text">
                <span>{{item}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="mask" @touchstart.stop.prevent></div>
  </div>
  </transition>
</template>

<script>
  // 功能
  // 滑动选择选项
  // 参数
  // visible.sync：[必填]控制组件隐藏展现
  // list：[必填]选择列表Array[String]
  // currentIndex：[选填]初始选中index
  // 事件
  // OK：返回新选择的index

  /* eslint no-unused-vars: "off" */
  let startY;
  let lineHeight = 44;

  export default {
    name: 'Scroll',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: this.currentIndex,
        scrollHeight: -lineHeight * this.currentIndex
      };
    },
    methods: {
      touchStart (e) {
        startY = e.touches[0].screenY;
      },
      touchMove (e) {
        let newValue = this.scrollHeight + e.touches[0].screenY - startY;
        if (newValue >= this.upperLimit) {
          newValue = this.upperLimit - 1;
        }
        if (newValue <= this.lowerLimit) {
          newValue = this.lowerLimit + 1;
        }
        this.scrollHeight = newValue;
        startY = e.touches[0].screenY;
      },
      touchEnd () {
        if (this.scrollHeight >= this.upperLimit) {
          this.scrollHeight = this.upperLimit - lineHeight / 2;
        }
        if (this.scrollHeight <= this.lowerLimit) {
          this.scrollHeight = this.lowerLimit + lineHeight / 2;
        }
        this.scrollHeight = Math.round(this.scrollHeight / lineHeight) * lineHeight;
        this.index = Math.abs(Math.round(this.scrollHeight / lineHeight));
      },
      changeIndex () {
        this.$emit('OK', this.index);
        this.$emit('update:visible', false);
      },
      cancel () {
        this.$emit('update:visible', false);
      }
    },
    computed: {
      upperLimit: function () {
        return lineHeight * 0.5;
      },
      lowerLimit: function () {
        return -lineHeight * (this.list.length - 0.5);
      }
    }
  };
</script>

<style lang="scss">
.scroll-move-enter-active, .scroll-move-leave-active {
	transition: all 0.5s ease-out;
}
.scroll-move-enter,.scroll-move-leave-to{
  transform: translateY(265px);
  opacity: 0;
}

  .scroll-container {
    position: fixed;
    width: 100%;
    z-index: 100;
    bottom: 0;
    left: 0;
    background: grey;
    box-shadow: 0px -1px 0px #e2e2e2;
  }

  .top-bar {
    height: 44px;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-content: center;
    justify-content: center;
    background: #fff;
    border-bottom:1px solid #e2e2e2;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    .top-bar-item {
      flex: 1;
      line-height: 44px;
      padding: 0 15px;
    }
  }

  .scroll-body {
    background: #fff;
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  .scroll-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
    background-position: top, bottom;
    background-size: 100% 88px;
    background-repeat: no-repeat;
    z-index: 3;
  }

  .scroll-content {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    z-index: 1;
    margin-top: -22px;
    transform: rotateX(50deg);
    transition: 0.5s all ease-out;
  }

  .scroll-item {
    position: relative;
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
  }

  .scroll-indicator {
    position: absolute;
    height: 44px;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 4;
    border-top: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }

  .btn-ok {
    margin-top: 10px;
    height: 44px;
    line-height: 44px;
  }

  .scroll-item-text {
    position: relative;
    display: inline-block;
  }

  .tag-block {
    position: absolute;
    right: -5px;
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    top: 50%;
    margin-top: -10px;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    border: solid 1px #ff5722;
  }
</style>