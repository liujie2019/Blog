const co = require('co');

function* gen() {
    // 错误可以被try/catch捕获
    try {
        yield Promise.reject(new Error('出错了'));
    } catch (error) {
        console.log(error); // Error: 出错了
    }
    const a = Promise.resolve(1);
    const b = Promise.resolve(2);
    const res = yield [a, b];
    return res;
}

co(gen).then(data => console.log(data)); // [ 1, 2 ]