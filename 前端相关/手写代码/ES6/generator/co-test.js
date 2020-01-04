const co = require('co');

function* gen() {
    const res = yield [1];
    const res2 = yield Promise.resolve(2);
    return res;
}

co(gen).then(data => console.log(data));