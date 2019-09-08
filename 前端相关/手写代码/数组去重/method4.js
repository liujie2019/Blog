// sort
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
// 对原数组进行排序
originalArray.sort();
// 将排序后的第一项放到结果数组中
const resultArr = [originalArray[0]];
for (let i = 1; i < originalArray.length; i++) {
    if (originalArray[i] !== resultArr[resultArr.length - 1]) {
        resultArr.push(originalArray[i]);
    }
}

console.log(resultArr); // [1, "1", 2, NaN, NaN, {}, {}, "abc", false, null, true, "true", undefined]
