let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
let resArr = [];
let obj = {};

for (let i = 0; i < originalArray.length; i++) {
    let item = originalArray[i];
    if (obj[item]) {
        originalArray[i] = originalArray[originalArray.length - 1];
        originalArray.length--;
        i--;
        continue;
    }
    obj[item] = item;
}

obj = null;

console.log(originalArray); // [1, NaN, NaN, 2, true, undefined, false, false, null, null, {…}, undefined, "abc"]