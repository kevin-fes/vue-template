<template>
  <div v-if="visibility" class="toast-modal">
    <div class="toast-container f-14">
      <div class="box">
        <div class="ico-box" v-if="loading">
          <div class="r-content1">
            <div class="r-arc1" ></div>
            <div class="r-arc2"></div>
            <div class="r-arc3"></div>
            <div class="r-arc4"></div>
          </div>
          <div class="r-content2">
            <div class="r-arc1"></div>
            <div class="r-arc2"></div>
            <div class="r-arc3"></div>
            <div class="r-arc4"></div>
          </div>
        </div>
        <div class="text-box">
          <span class="toast-text">{{text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toast1',
    data () {
      return {
        visibility: false,
        text: '',
        loading: false,
        timeId: null
      };
    },
    methods: {
      show (text, timer, loading) {
        this.text = text;
        if (!this.text) return false;
        clearTimeout(this.timeId);
        this.loading = loading || false;
        this.visibility = true;
        let oTime = timer || 2000;
        let that = this;
        this.timeId = setTimeout(() => {
          that.visibility = false;
        }, oTime);
      },
      hide () {
        this.visibility = false;
        clearTimeout(this.timeId);
      }

    }
  };
</script>

<style scoped lang='scss'>
  .toast-modal {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .2);
    top: 0px;
    left: 0px;
    z-index: 2;
  }

  .toast-container {
    position: fixed;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 6px;
    color: #fff;
    width: 220px;
    line-height: 140%;
    padding: 15px;
    text-align: center;
    left: 50%;
    top: 50%;
    margin-left: -110px;
    margin-top: -30px;
    z-index: 1000;
  }

  .box {
    position: relative;
    word-wrap: break-word;
    display: -webkit-box;
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }

  .text-box {
    
  }

  .toast-text {
    height: 24px;
    line-height: 24px;
  }

  .ico-box {
    position: relative; 
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
  .r-content1,.r-content2{ 
      position: absolute; 
      width: 100%;
      height: 100%;
  }
  .r-content1 div,.r-content2 div{ 
      position: absolute; 
      border-radius: 50%;
      width: 6px;
      height:6px;
      background-color: #fff; 
      -webkit-animation: 1.5s infinite r-loadingRun; 
      animation: 1.5s infinite r-loadingRun;
  }
  .r-content2{ 
      -webkit-transform: rotate(45deg); 
      transform: rotate(45deg);
  }
    .r-arc1{ left:0; top:0;}
    .r-arc2{ right:0; top:0;}
    .r-arc3{ right:0; bottom:0;}
    .r-arc4{ left:0; bottom:0;}
    .r-content1{
        .r-arc1{ -webkit-animation-delay:-1.5s;}
    } 
    .r-content2{
        .r-arc1{ -webkit-animation-delay:-1.3s;}
    } 
    .r-content1{
        .r-arc2{ -webkit-animation-delay:-1.1s;}
    } 
    .r-content2{
        .r-arc2{ -webkit-animation-delay:-0.9s;}
    } 
    .r-content1{
        .r-arc3{ -webkit-animation-delay:-0.7s;}
    } 
    .r-content2{
        .r-arc3{ -webkit-animation-delay:-0.5s;}
    } 
    .r-content1{
        .r-arc4{ -webkit-animation-delay:-0,3s;}
    } 
    .r-content2{
        .r-arc4{ -webkit-animation-delay:-0.1s;}
    } 
  .f-14{
    font-size: 14px;
  }
  /*loading*/
@-webkit-keyframes r-loadingRun{
    0%{ -webkit-transform:scale(1);}
    50%{ -webkit-transform:scale(0);}
    100%{ -webkit-transform:scale(1);}
}
@keyframes r-loadingRun{
    0%{ transform:scale(1);}
    50%{ transform:scale(0);}
    100%{ transform:scale(1);}
}
</style>
