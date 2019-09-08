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

// accumulator，currentValue
const arr = [1, 2, 3, 4, 5];
const res = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
});
const res2 = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 10);

console.log(res); // 15
console.log(res2); // 25