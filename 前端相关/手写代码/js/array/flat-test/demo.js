const arr = [1, [2, [3, [4, 5, 6]]], 7];

// [].concat(1) => [1]
// 方法一
// function myFlat(arr) {
//     // 如果传入的参数不是数组，直接返回
//     if (!Array.isArray(arr)) return arr;
//     return arr.reduce((prev, val) => {
//         console.log(val);
           // 递归
//         return prev.concat(myFlat(val));
//     }, []);
// }
// 方法二 扩展运算符
function myFlat(arr) {
    while (arr.some(Array.isArray)) {
        console.log(...arr);
        // arr = [...arr];
        arr = [].concat(...arr);
    }
    return arr;
}
// 方法3
// function myFlat(arr) {
//     const _result = [];
//     let fn = arr => {
//         for (let i = 0; i < arr.length; i++) {
//             let item = arr[i];
//             if (Array.isArray(item)) {
//                 fn(item);
//             }
//             else {
//                 _result.push(item);
//             }
//         }
//     }
//     fn(arr);
//     return _result;
// }


console.log(myFlat(arr)); // [ 1, 2, 3, 4, 5, 6 ]