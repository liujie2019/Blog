const fs = require('fs');

// 实现promisify
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.apply(this, [...args, (err, data) => {
                err ? reject(err) : resolve(data);
            }]);
        });
    }
}

const readFile = promisify(fs.readFile);

function* read() {
    const name = yield readFile('./name.txt');
    const age = yield readFile('./age.txt');
    const a = yield [1, 2, 3, 4, 5];
    return name + age + a;
}

function co(gen) {
    const ctx = this; // 保存this上下文
    const args = Array.prototype.slice.call(arguments, 1); // 获取参数
    return new Promise((resolve, reject) => {
        if (typeof gen === 'function') gen = gen.apply(ctx, args); // 获取迭代器对象
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        function next(data) {
            const {value, done} = gen.next(data); // data作为参数传给next方法，作为上一个yield表达式的值
            // 如果还未迭代完
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data);
                }, err => {
                    reject(err);
                });
            } else {
                resolve(value);
            }
        }
        next();
    });
}

co(read).then(data => console.log(data)); // lisi121,2,3,4,5

// readFile('./age.txt').then(data => console.log(data.toString()));