const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// sort函数返回排序后的数组
const res = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
console.log(res); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]