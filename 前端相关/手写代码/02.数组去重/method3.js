// indexOf和includes
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
const resultArr = [];

originalArray.forEach(item => {
    // resultArr中没有该item的值
    // if (resultArr.indexOf(item) < 0) {
    //     resultArr.push(item);
    // }
    if (!resultArr.includes(item)) {
        resultArr.push(item);
    }
});

console.log(resultArr); // [1, '1', 2, true, 'true', false, null, {}, {}, 'abc', undefined, NaN]