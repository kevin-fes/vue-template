import {Evn} from '../service/env'

let getHeight = (el) => {
   return el.scrollHeight;
 }

export const stopScroll = {
  directives: {
    'stop-scroll': {
      bind: (el, binding) => {
        // 由于部分机型兼容问题 暂时放开滚动
        if(Evn.isAndroid) return;
        el.addEventListener('touchmove', (e) => {
          e && (e._isScroller = true)
          return false;
        }, false)
        // return false;
        let viewHeight;
        let height;
        let scrollEl = el;
        let disStart = '';

        el.addEventListener('touchstart', (ev) => {
          disStart = ev.touches[0].screenY
          viewHeight = el.clientHeight;
          height = getHeight(el);
        }, false)
      
        el.addEventListener('touchmove', (e) => {
          height = getHeight(el);
          loadMore(e);
        }, false)
        const loadMore = (ev) => {
          if(scrollEl.scrollTop == 0 && (ev.touches[0].screenY-disStart)>0){
            // 页面到顶向下滑动 禁止拖动
             ev && (ev._isScroller = false)
          }else if((scrollEl.scrollTop + viewHeight >= height) && (ev.touches[0].screenY-disStart)<0){
            // 页面到底向上滑动 禁止拖动
            ev && (ev._isScroller = false)
          }else{
            // 其余情况页面可以滚动
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
        let requestFram;
        let oldScrollTop;
        let scrollReduce = 20;
        let scrollEl = el;

        el.addEventListener('touchstart', (ev) => {
          viewHeight = el.clientHeight;
          height = getHeight(el);
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
        const loadMore = (ev) => {
          if (scrollEl.scrollTop + viewHeight >= height - scrollReduce) {
            binding.value && binding.value(1);
            // ev && (ev._isScroller = true)
          }
        }
      }
    }
  }

};


