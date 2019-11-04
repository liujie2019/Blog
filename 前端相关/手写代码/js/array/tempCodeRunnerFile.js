const arr1 = [2, 5, 9, 2];
const arr2 = [
    {name: 'lisi', age: 12},
    {name: 'wangwu', age: 13}
];

const newArr1 = arr1.forEach(item => item *= 2);
arr2.forEach(item => item.age += 1);

console.log(arr1); // [ 2, 5, 9, 2 ]
console.log(newArr1); // [ 2, 5, 9, 2 ]
console.log(arr2); 