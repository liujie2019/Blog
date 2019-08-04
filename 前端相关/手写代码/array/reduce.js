// const arr = [1, 2, 3, 4, 5];
// const sum = arr.reduce((pre, cur) => {
//     return pre + cur;
// }, 100);

// console.log(sum);
const matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];

const flatten = matrix.reduce((pre, cur) => {
    return pre.concat(cur);
});

console.log(flatten);