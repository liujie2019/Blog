const arr = [2, 4, 3, 1];
// arr.sort((a, b) => a - b);
console.log(arr); // [ 1, 2, 3, 4 ]
// [ 'Javascript', 'Node', 'React', 'Vue', 'Webpack' ]
console.log(['Javascript','Vue','React','Node','Webpack'].sort());

// const arr = [2, 4, 3, 1];
const res = arr.some(item => item > 2);
console.log(res, arr); // true [ 2, 4, 3, 1 ]
const res2 = arr.every(item => item > 2);
console.log(res2, arr); // false [ 2, 4, 3, 1 ]