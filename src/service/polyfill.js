// Promise.finally 实现

(function(){

  if (typeof Promise.prototype.done !== 'function') {
    Promise.prototype.finally = function(onFinally) {
      return this.then(
        /* onFulfilled */
        res => Promise.resolve(onFinally()).then(() => res),
        /* onRejected */
        err => Promise.resolve(onFinally()).then(() => { throw err; })
      );
    };
  }

})()
