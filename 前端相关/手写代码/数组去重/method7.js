// reduce
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
let resArr = [];

resArr = originalArray.reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
}, []);

console.log(resArr); // [ 1, '1', 2, true, 'true', false, null, {}, {}, 'abc', undefined, NaN ]