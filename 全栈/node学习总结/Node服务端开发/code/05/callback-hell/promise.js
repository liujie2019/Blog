const fs = require('fs');

const p1 = new Promise((resolve, reject) => {
    fs.readFile('./data/a1.txt', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

const p2 = new Promise((resolve, reject) => {
    fs.readFile('./data/b.txt', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

const p3 = new Promise((resolve, reject) => {
    fs.readFile('./data/c.txt', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

p1.then(data => {
    // 当 p1 读取成功的时候
    // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
    // 当你 return 123 后面就接收到 123
    // return 'hello' 后面就接收到 'hello'
    // 没有 return 后面收到的就是 undefined
    // 上面那些 return 的数据没什么卵用
    // 真正有用的是：我们可以 return 一个 Promise 对象
    // 当 return一个 Promise 对象的时候，后续的then中的方法的第一个参数会作为 p2 的 resolve
    console.log(data);
    return p2;
}, err => {
    console.log('读取文件失败', err);
}).then(data => {
    console.log(data, '666');
    return p3;
}).then(data => {
    console.log('end');
    console.log(data);
})