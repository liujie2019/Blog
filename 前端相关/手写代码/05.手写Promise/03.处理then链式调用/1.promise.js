const Promise = require('./promise2');
const fs = require('fs');
// const Promise = require('./promise');
// 要分段读取，第一个的输出是下一个的输入
function read(url){
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

// then链
read('./name.txt').then(data => {
    // console.log(data);
    // return read(data);
    return read(data);
}, err => {
    console.log(err);
}).then(data => {
    console.log(data); // 15
}, err => {
    console.log(err);
    return 123;
}).then(data => {
    console.log(data); // 123
}, err => {
    console.log(err);
});

// fs.readFile('./name.txt', 'utf8', function(err, data) {

// });
// 1) 如果then方法返回的是一个常量 包括undefined，会把这个结果传递给外层的then的成功的结果
// 2) 如果then方法中抛出异常 会走到下一次then的失败的结果
// 3) 穿透 如果没有处理错误 会继续向下找,会就近查找错误处理函数 如果没找到会一直找，一般情况会写一个catch方法,catch是不会中断运行的
// 4) then方法执行后可能会返回一个promise,那么会采用这个promise的返回结果作为下一个then的成功或者失败
// 5) 走失败 两种可能 第一种发生了错误 第二种就是返回一个失败的promise
// 6) finally 方法 es9 的 不会终端执行，只是传递一个一定会执行的函数而已

// const p1 = new Promise((resolve, reject) => {
//     resolve(100);
// })
// const p2 = p1.then(data => {
//     return data;
// })
// p2.then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// });


// then jq链式调用 promise一旦成功就不能失败了
// promise 需要每次调用then后都返回一个新的promise 可以实现状态的切换