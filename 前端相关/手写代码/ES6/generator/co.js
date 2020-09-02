const {fs} = require('mz');
// const co = require('co');

function* read() {
    const name = yield fs.readFile('name.txt', 'utf8');
    const age = yield fs.readFile('age.txt', 'utf8');
    const a = yield [1, 2, 3, 4, 5];
    return age + a;
}
const slice = Array.prototype.slice;
// co实现：接受一个generator函数，返回的是Promise
function co(gen) {
    const ctx = this; // 保存this上下文
    const args = slice.call(arguments, 1);
    return new Promise((resolve, reject) => {
        if (typeof gen === 'function') gen = gen.apply(ctx, args); // 得到迭代器对象
        // 传入参数不是generator的兼容处理
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        // 自定义next函数
        function next(r) {
            let res = gen.next(r);
            const {value, done} = res;
            if (!done) {
                Promise.resolve(value).then(r => {
                    next(r);
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

// co接收generator参数，返回的是Promise
co(read).then(data => console.log(data)); // 121,2,3,4,5