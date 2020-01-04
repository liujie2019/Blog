const {fs} = require('mz');
// const co = require('co');

function* read() {
    const name = yield fs.readFile('name.txt', 'utf8');
    const age = yield fs.readFile('age.txt', 'utf8');
    const a = yield [1, 2, 3, 4, 5];
    return age + a;
}
const slice = Array.prototype.slice;
function co(gen) {
    const ctx = this;
    const args = slice.call(arguments, 1)
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    return new Promise((resolve, reject) => {
        function next(r) {
            const {value, done} = gen.next(r);
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