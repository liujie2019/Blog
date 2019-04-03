// const s = new Set();
// let arr = [1, 2, 3, 3, 2, 1];
// arr.forEach(item => s.add(item));
// for(let i of s) {
//     console.log(i);
// }

// let arr = [3, 5, 2, 2, 5, 5];
// let unique = [...new Set(arr)];
// console.log(unique);
// console.log(Array.isArray(unique));

// let set = new Set(['red', 'green', 'blue']);
// let arr = [...set];
// console.log(arr);
// console.log(Array.isArray(arr));

let set = new Set(['red', 'green', 'blue']);
set = new Set([...set].map(item => item + '-test'));
console.log(set);//Set { 'red-test', 'green-test', 'blue-test' }