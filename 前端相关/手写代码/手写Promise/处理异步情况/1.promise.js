let Promise = require('./promise');
let promise = new Promise(function(resolve, reject) {
    // throw new Error('错误'); // 执行时可能会发生异常 ，那就内部将错误异常作为原因，让promise变成失败态
    // resolve('成功'); // 同步触发直接执行
    setTimeout(() => { // 异步的情况基于发布订阅
        resolve('成功233'); // 发布
        // reject('失败'); // 发布
    }, 1000);
});
// 同步的时候直接触发，异步的时候发布订阅
// 发布订阅模式
// 多个then的话其实就是发布订阅模式
promise.then(function(value) {
    console.log('success', value);
}, function(reason) {
    console.log('fail', reason);
});
promise.then(function(value) {
    console.log('success', value);
}, function(reason) {
    console.log('fail', reason);
});
promise.then(function(value) {
    console.log('success', value);
}, function(reason) {
    console.log('fail', reason);
});
// 一个promise实例 可以then多次，分别绑定成功和失败，当触发resolve和reject的时候 触发对应的成功和失败