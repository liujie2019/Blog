console.log('here we go');
new Promise(resolve => { // 执行1
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
    .then(value => {
      console.log(value);  // 执行2
      console.log('everyone');
      (function() { // 执行5。1、这段代码中没有返回新的值，下面一行返回的promise实际是在这个函数中返回的，不是在then的响应函数中返回的，then返回的promise实例就没有等待里面的这个promise完成。2、一直在等待执行，等最后的then返回之后，再执行这个函数。3、没有进入promise队列中，但是进程仍然是登它执行完成后才算是完成。
        return new Promise(resolve => { // 自己用自己的回调
          setTimeout(() => {
            console.log('mr');
            resolve('marry');
          }, 2000)
        });
      }());
      return false; // 执行3。1、false会直接传递到下一步，成为下一个then的value
      // 即使这里将return false;注销，默认也会返回Undefined
    })
    .then(value => { // 执行4
      console.log(value + 'world'); // value = false;
    })