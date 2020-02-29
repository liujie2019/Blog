const _ = require('lodash');
const fn = (a, b, c) => {
    return a * b * c;
};
const curried = _.curry(fn);
console.log(curried(2, 3, 4));