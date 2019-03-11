
import {prefix} from './cfg'

/**
 * 获取cookie
 */
export const getCookie = (name)=>{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]); 
  }else{
    return null;
  }
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content == 'object') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(`${prefix}+${name}`, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(`${prefix}+${name}`);
}

/**
 * 删除空参数
 */
export const filterData = (data) => {
  if (data) {
    for (const key in data) {
      const val = data[key];
      if ((typeof val === 'undefined') || val === '' || val === null) {
        delete data[key];
      }
    }
    return data;
  }
}
/**
 * 时间定时器
 */
export const TimerUtils = (() => {
  let _timer, _func, _interval;
  return {
    init: function (func, interval) {
      _func = func;
      _interval = interval;
      return this;
    },
    start: function () {
      _timer = setInterval(_func, _interval);
      return this;
    },
    stop: function () {
      if (_timer) {
        clearInterval(_timer);
        _timer = null;
      }
      return this;
    }
  };
})
// 对象深拷贝
export function deepClone(source){
  if(!source || typeof source !== 'object'){
    throw new Error('error arguments', 'shallowClone');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for(var keys in source){
     if(source.hasOwnProperty(keys)){
        if(source[keys] && typeof source[keys] === 'object'){
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        }else{
          targetObj[keys] = source[keys];
        }
     } 
  }
  return targetObj;
}

// 判断手机号格式
export function checkMobile (mobile) {
  let reg = /^1[3|4|5|7|8|6|9]\d{9}$/
  if (reg.test(mobile)) {
    return true
  } else {
    return false
  }
}

// 判断身份证号格式
export let checkIdCard = (idCard) => {
  let patten1 = '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$'
  let patten2 = '^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|x|X)$'

  if (new RegExp(patten1).test(idCard) || new RegExp(patten2).test(idCard)) {
    return true
  } else {
    return false
  }
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //  在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画duration
 */
export const animate = (element, target,  duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer);

  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = 'ease-out';
  }

  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, 'float') * 100);
    } else {
      return getStyle(element, attr);
    }
  }
  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    } else {
      unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
  });

  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });

  let flag = true; //假设所有运动到达终点
  const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0;  //步长
      let status = false; //是否仍需运动
      let iCurrent = attrStyle(attr) || 0; //当前元素属性址
      let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
          break;
        case 'linear':
          speedBase = initState[attr];
          intervalTime = duration * 20 / 400;
          break;
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent != target[attr];
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }

      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true;
      }
      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20);
}

/**
 * 设置页面title
 */
export const setTitle = (title) => {
  if (!title) return;
  document.querySelector('title').textContent = title;
  // hack在微信ios webview中无法修改document.title的情况
  const iframe = document.createElement('iframe');
  iframe.style.visibility = 'hidden';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.onload = () => {
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 0);
  };
  document.body.appendChild(iframe);
}

/**
 * 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
  * removeClass
  */

 export const removeClass = (elements,cName )=>{
  if( hasClass( elements,cName ) ){  
    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );
  };  
 }

/**
  * addClass
  */
 export const addClass = (elements,cName )=>{
  if( !hasClass( elements,cName ) ){  
    elements.className += " " + cName;  
  }; 
 }

 /** 
 *  判断某个元素是否含有某个class
 */
 export const hasClass = (()=>{
  let div = document.createElement("div") ;
  if( "classList" in div && typeof div.classList.contains === "function" ) {
      return function(elem, className){
          return elem.classList.contains(className) ;
      } ;
  } else {
      return function(elem, className){
          let classes = elem.className.split(/\s+/);
          return !classes.every(item=>{
            return !(classes[i] === className)
          })
      } ;
  }
 })()

/**
  * 获取指定class的最近父节点
  */
export const getParentsByClass = (element, className)=>{
  let returnParentElement = null;
  function getParentNode(element, className) {
    if(element && hasClass(element,className) && element.tagName.toLowerCase() != "body") {
      returnParentElement = element;
    } else if(element && element.parentElement) {
      getParentNode(element.parentElement, className);
    }
  }
  getParentNode(element, className);
  return returnParentElement;
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳毫秒数
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  Math.floor(timeStamp /= 1000);
  timeStamp = Number(timeStamp);
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  const IS_EARLY =  !!(timeStamp < currentTime);
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}


