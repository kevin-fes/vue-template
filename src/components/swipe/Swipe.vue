<template>
  <div>
    <div class="slider-container"
         @touchstart="swipeStart"
         @touchmove="swipeMove"
         @touchend="swipeEnd"

         @mousedown="swipeStart"
         @mousemove="swipeMove"
         @mouseup="swipeEnd">

      <div class="slider-wrap" :style="transformObj">
        <div class="slider-item" v-for="(item,index) in targetList" :key='index' :style='swipeStyle'>
          <slot :name="'item-'+index"></slot>
        </div>
      </div>

      <div class="slider-points" v-show="dataList.length>1">
        <div class="slide-point" 
          v-for="i in itemCount"
          :class="{'highlight': (i - 1) == slideIndex}"
          @touchstart="slideTo(i - 1)"
          :key="i">
          </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {TimerUtils} from '../../service/utils';

  const isMobile = 'ontouchstart' in window;

  function docTouchStart (event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!event.defaultPrevented) {
        // event.preventDefault();
      }
    }
  }

  function getClientX (e) {
    if (!isMobile) {
      return e.clientX;
    }
    if (!(e.touches || e.changedTouches)) return;
    return (e.touches[0] || e.changedTouches[0]).clientX;
  }

  export default {
    name: 'Swipe',
    props:{
      dataList:{
        type:Array,
        default(){
          return [];
        }
      },
      params:{
        type:Object,
        default(){
          return {};
        }
      },
      swipeStyle:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data () {
      return {
        targetList: [],
        slideIndex: 0,
        slideIndexTemp: 0,
        startX: 0,
        moveStartTime: 0,
        manualOffset: 0,
        playTimer: null,
        winWidth: window.innerWidth,

        slideParams: {
          minMoveDistance: 50, // 最小滑动距离 单位: 像素
          minMoveSpeed: 200, // 最小滑动速度 单位: 像素/秒
          autoPlay: true, // 是否自动播放
          autoPlayInterval: 2000, // 自动播放时间间隔
        }
      };
    },
    watch: {
      dataList: function (val) {
        this.targetList = [];
        this.$nextTick(() => {
          this.imageList = val;
          this.slideIndex = 0;
        });
      }
    },
    mounted: function () {
      this.targetList = this.dataList;
      for (var paramKey in this.params) {
        if (this.params.hasOwnProperty(paramKey)) {
          this.slideParams[paramKey] = this.params[paramKey];
        }
      }
      if (this.slideParams.autoPlay) {
        this.playTimer = new TimerUtils().init(() => {
          this.slideIndex = (this.slideIndex + 1) % this.itemCount;
        }, this.slideParams.autoPlayInterval).start();
      }

      window.addEventListener('resize', () => {
        this.winWidth = window.innerWidth;
      });
    },
    computed: {
      itemCount: function () {
        return this.dataList.length;
      },
      transformObj: function () {
        var translateProp = 'translate3d(' + (-1 * this.winWidth * this.slideIndex + this.manualOffset) + 'px, 0, 0)';
        var obj = {
          '-webkit-transform': translateProp,
          'transform': translateProp
        };
        if (this.manualOffset != 0) {
          obj.transition = 'none';
        }
        return obj;
      }
    },
    methods: {
      slideNext: function () {
        if (this.slideIndex == this.itemCount - 1) return;
        this.slideIndex++;
      },
      slidePrev: function () {
        if (this.slideIndex == 0) return;
        this.slideIndex--;
      },
      slideTo: function (index) {
        if (index < 0 || index > this.itemCount - 1) return;
        this.slideIndex = index;
      },
      swipeStart: function (e) {
        if(this.dataList.length<2)return false;
        document.addEventListener('touchmove', docTouchStart);
        this.startX = getClientX(e);
        this.playTimer.stop();
      },
      swipeMove: function (e) {
        if(this.dataList.length<2)return false;
        if (!this.startX) return; //  PC: 如果直接mousemove则不做处理
        // e.preventDefault(); //  PC: 阻止默认行为, 防止产生拖拽图片
        var moveX = getClientX(e);
        this.manualOffset = moveX - this.startX;
        if (!this.moveStartTime) {
          this.moveStartTime = new Date().getTime();
        }
      },
      swipeEnd: function (e) {
        if(this.dataList.length<2)return false;
        document.removeEventListener('touchmove', docTouchStart);
        var endX = getClientX(e);
        var moveEndTime = new Date().getTime();
        var moveDistance = endX - this.startX;
        var moveDistanceAbs = Math.abs(moveDistance);
        var moveDuration = Math.abs(moveEndTime - this.moveStartTime);
        var moveSpeed = moveDistanceAbs / (moveDuration / 1000);

        this.manualOffset = 0;
        this.startX = 0;
        this.moveStartTime = 0;
        this.playTimer.start();

        if (moveDistanceAbs > this.slideParams.minMoveDistance && moveSpeed > this.slideParams.minMoveSpeed) {
          moveDistance < 0 ? this.slideNext() : this.slidePrev();
        }
      }
    }
  };
</script>

<style scoped>
  .slider-container {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(90deg, #51C1EC 0%, #4080E8 100%);
  }
  .slider-wrap {
    display: flex;
    height: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    transition: transform 0.3s ease-out;
  }

  .slider-item {
    flex-shrink: 0;
    width: 100%;
  }
  .slider-item-div{
    position: relative;
  }

  .slide-img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .slider-points {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .slide-point {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    margin: 0 4px;
  }
  .slide-point.highlight {
    background-color: #FFF;
    width: 13px;
    border-radius: 4px;
  }
</style>
