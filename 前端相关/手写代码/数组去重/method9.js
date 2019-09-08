const obj = {};
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {a: 1}, {a: 2}, 'abc', 'abc', undefined, undefined, NaN, NaN];
const resultArr = originalArray.filter(function (item) {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
});
console.log(obj);
console.log(resultArr); // [ 1, '1', 2, true, 'true', false, null, { a: 1 }, 'abc', undefined, NaN ]