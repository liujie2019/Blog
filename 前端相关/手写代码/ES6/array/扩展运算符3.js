const arr = [1, 2, 3];
const arr2 = [4, 5, 6];

// arr2.push(arr);
// console.log(arr2); // [ 4, 5, 6, [ 1, 2, 3 ] ]

// arr2.push.apply(arr2, arr);
// console.log(arr2); // [ 4, 5, 6, 1, 2, 3 ]

arr2.push(...arr);
console.log(arr2); // [ 4, 5, 6, 1, 2, 3 ]
