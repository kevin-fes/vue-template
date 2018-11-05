import {Evn} from '../service/env'

export const stopScrollAndroid = {
  directives: {
    'stop-scroll-android': {
      bind: (el, binding) => {
        el.addEventListener('touchmove', (e) => {
          e && (e._isScroller = true)
          return false;

        }, false)
      }
    }
  }
};

// 解决在安卓手机上 当输入框弹起的时候 底部foot隐藏
export const resizeFoot = {
  directives: {
    'resize-foot': {
      bind(el, binding) {
        let elStyle = el.style;
        let active = false;
        let originalHeight = document.body.clientHeight;
        let reset = () => {
          if(!active) return false;
          elStyle.display = 'flex';
          active = false;
        }
        let hide = () => {
          if(active)return false;
          elStyle.display = 'none'
          active = true;
        }
        let getCurrHeight = () => {
          let getHeight = document.body.clientHeight;
          return getHeight;
        }
        el.check = () => {
          let currHeight = getCurrHeight();
          if(currHeight != originalHeight) {
            hide();
          }else {
            reset();
          }
        }
        window.addEventListener('resize', el.check);
      },
      unbind(el) {
        window.removeEventListener('resize',el.check);
        el.check = null;
      }  
    }
  }
};

export const allScroll = {
  directives: {
    'all-scroll': {
      bind: (el, binding) => {
        el.addEventListener('touchmove', (e) => {
          e && (e._isScroller = true)
          return false;
        }, false)
      }
    }
  }
};


export const stopScroll = {
  directives: {
    'stop-scroll': {
      bind: (el, binding) => {
        if(Evn.isAndroid) return false;
        let viewHeight;
        let height;
        let paddingBottom;
        let marginBottom;
        let scrollEl = el;
        let disStart = '';

        el.addEventListener('touchstart', (ev) => {
          disStart = ev.touches[0].screenY
          viewHeight = $(el).height();
          height = getHeight(el);
          paddingBottom = Number($(el).css('padding-bottom').replace(/px/ig,''));
          marginBottom = Number($(el).css('margin-bottom').replace(/px/ig,''));
        }, false)
      
        el.addEventListener('touchmove', (e) => {
          height = getHeight(el);
          loadMore(e);
        }, false)

        let getHeight = (el) => {
         return $(el).children().reduce((vala,valb)=>{
            //let paddingBottom = Number($(valb).css('padding-bottom').replace(/px/ig,''));
            //let paddingTop = Number($(valb).css('padding-top').replace(/px/ig,''));
            //let marginBottom = Number($(valb).css('margin-bottom').replace(/px/ig,''));
            //let marginTop = Number($(valb).css('margin-top').replace(/px/ig,''));
            return vala + $(valb).height();
          },0)
        }

        const loadMore = (ev) => {
          if(scrollEl.scrollTop == 0 && (ev.touches[0].screenY-disStart)>0){
            // 页面到顶向下滑动
             ev && (ev._isScroller = false)
          }else if ((scrollEl.scrollTop + viewHeight < height + paddingBottom + marginBottom)) {
            // 页面没到底
            ev && (ev._isScroller = true)
          }else if((scrollEl.scrollTop + viewHeight >= height + paddingBottom + marginBottom) && (ev.touches[0].screenY-disStart)>0){
             // 页面到底向上滑动
             ev && (ev._isScroller = true)
          }
        }
      }
    }
  }

};

export const loadMore = {
  directives: {
    // 瀑布流
    'load-more': {
      bind: (el, binding) => {
        let viewHeight;
        let height;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;
        let scrollReduce = 20;
        let scrollEl = el;

        el.addEventListener('touchstart', (ev) => {
          viewHeight = $(el).height();
          height = getHeight(el);
          paddingBottom = Number($(el).css('padding-bottom').replace(/px/ig,''));
          marginBottom = Number($(el).css('margin-bottom').replace(/px/ig,''));
        }, false)
      
        el.addEventListener('touchmove', (e) => {
          height = getHeight(el);
          loadMore(e);
        }, false)

        el.addEventListener('touchend', (e) => {
          loadMore(e);
          oldScrollTop = scrollEl.scrollTop;
          moveEnd();
        }, false)

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if (scrollEl.scrollTop != oldScrollTop) {
              oldScrollTop = scrollEl.scrollTop;
              moveEnd()
            } else {
              cancelAnimationFrame(requestFram);
              height = getHeight(el);
              loadMore();
            }
          })
        }

        let getHeight = (el) => {
         return $(el).children().reduce((vala,valb)=>{
            return vala + $(valb).height();
          },0)
        }

        const loadMore = (ev) => {
          if (scrollEl.scrollTop + viewHeight >= height + paddingBottom + marginBottom - scrollReduce) {
            binding.value && binding.value(1);
            // ev && (ev._isScroller = true)
          }
        }
      }
    }
  }

};


