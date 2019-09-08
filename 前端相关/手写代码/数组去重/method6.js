// 原始去重
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
let resArr = [originalArray[0]];
for (let i = 1; i < originalArray.length; i++) {
    let isRepeat = false;
    for (let j = 0; j < resArr.length; j++) {
        // 如果结果数组中已经存在该值，跳出内层循环
        if (originalArray[i] === resArr[j]) {
            isRepeat = true;
            break;
        }
    }
    if (!isRepeat) {
        resArr.push(originalArray[i]);
    }
}

console.log(resArr); // [1, "1", 2, true, "true", false, null, {}, {}, "abc", undefined, NaN, NaN]
