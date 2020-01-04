const arr = [1, 2, 3];
const arr2 = [4, 5, 6];

const all = [...arr, 10, ...arr2];
console.log(all); // [ 1, 2, 3, 10, 4, 5, 6 ]
// const all2 = all;
// const all2 = [].concat(all);
const all2 = [...all];
console.log(all2); // [ 1, 2, 3, 10, 4, 5, 6 ]
all2[0] = 100;
console.log(all2); // [ 100, 2, 3, 10, 4, 5, 6 ]
console.log(all); // [ 1, 2, 3, 10, 4, 5, 6 ]