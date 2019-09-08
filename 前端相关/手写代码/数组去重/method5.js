// 双层 for 循环 + splice
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
for (let i = 0; i < originalArray.length; i++) {
    for (let j = i + 1; j < originalArray.length; j++) {
        if (originalArray[i] === originalArray[j]) {
            originalArray.splice(j, 1);
            // j--;
        }
    }
}

console.log(originalArray); // [1, "1", 2, true, "true", false, null, {…}, {…}, "abc", undefined, NaN, NaN]
