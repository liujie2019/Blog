const Promise = require('./promise');
const promise = new Promise(function(resolve, reject) {
    resolve(123);
    // reject(456);
    throw new Error('失败了'); // 如果主动抛出错误也会执行走失败回调
});
// then是原型方法
promise.then(function(value) {
    console.log('success', value);
}, function(reason) {
    console.log('fail', reason);
});
