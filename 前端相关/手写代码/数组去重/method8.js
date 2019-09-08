let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
let resArr = [];
const obj = {};
for(let i = 0; i < originalArray.length; i++){
    if(!obj[originalArray[i]]){
        resultArr.push(originalArray[i]);
        obj[originalArray[i]] = 1;
    }
}
console.log(resultArr);
// [1, 2, true, false, null, {…}, "abc", undefined, NaN]