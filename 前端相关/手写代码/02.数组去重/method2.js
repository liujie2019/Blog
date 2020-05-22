// Map的key
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
const resultArr = [];
const map = new Map();
originalArray.forEach(item => {
    // 没有该key值
    if (!map.has(item)) {
        map.set(item, true);
        resultArr.push(item);
    }
});

console.log(resultArr); // [ 1, '1', 2, true, 'true', false, null, {}, {}, 'abc', undefined, NaN ]