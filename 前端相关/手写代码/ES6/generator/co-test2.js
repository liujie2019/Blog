const co = require('co');

function* gen() {
    const a = Promise.resolve(1);
    const b = Promise.resolve(2);
    const c = Promise.resolve(3);
    const res = yield [a, b, c];
    return res;
}

co(gen)
    .then(data => console.log(data)) // [ 1, 2, 3 ]
    .catch(err => console.log(err));