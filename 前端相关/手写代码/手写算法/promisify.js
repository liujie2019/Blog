/*
Promisify实现原理
*/

const fs = require('fs');

// fs.readFile('./event.js', (err, data) => {
//     console.log(data.toString());
// });

function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.apply(this, [...args, (err, data) => {
                err ? reject(err) : resolve(data);
            }]);
        });
    };
}

const promisifyReadFile = promisify(fs.readFile);

promisifyReadFile('./event.js').then(data => {
    console.log(data.toString());
}, err => {
    console.log(err);
});

function promisify(fn) {
    // 返回一个函数，这个函数执行返回一个Promise
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.apply(this, [...args, (err, data) => {
                err ? reject(err) : resolve(data)
            }])
        });
    }
}