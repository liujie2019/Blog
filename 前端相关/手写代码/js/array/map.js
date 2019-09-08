let arr = [1, 2, 3];

let arr2 = arr.filter(item => item > 2);
console.log(arr); // [ 1, 2, 3 ]
console.log(arr2); // [3]
// arr = arr.map(item => item * 2);
// console.log(arr); // [ 2, 4, 6 ]

// arr = arr.map(item => {
//     if (item > 2) {
//         return item;
//     }
//     // 默认返回undefined
// });
// console.log(arr); // [ undefined, 4, 6 ]
