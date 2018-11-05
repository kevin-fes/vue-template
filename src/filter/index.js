
// 转换千为精度的数字

export const exchange = {
  filters:{
    exchange(num){
      num += ''; //转成字符串
      if (num.length <= 3) {
          return num;
      }
      num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
          console.log(v)
          return v + ',';
      });
      return num;
    }
  }
}
