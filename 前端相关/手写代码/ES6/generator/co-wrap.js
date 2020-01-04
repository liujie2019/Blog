const co = require('co');

function* gen() {
    console.log(arguments); // { '0': 123, '1': 456, '2': 789 }
    const a = Promise.resolve(1);
    const b = Promise.resolve(2);
    const  c= Promise.resolve(3);
    const res = yield [a, b, c];
    return res;
}

const coWrap = co.wrap(gen);
// [ 1, 2, 3 ]
coWrap(123, 456, 789).then(
    data => {
        console.log(data);
    }).catch(err => console.log(err));