const arr1 = [2, 5, 9, 2];
const arr2 = [
    {name: 'lisi', age: 12},
    {name: 'wangwu', age: 13}
];

arr1.forEach(item => item *= 2); // 不会修改原数组
arr2.forEach(item => item.age += 1); // 特殊场景：原数组是对象数组

console.log(arr1); // [ 2, 5, 9, 2 ]
console.log(arr2); // [ { name: 'lisi', age: 13 }, { name: 'wangwu', age: 14 } ]


// 不支持链式操作
[2, 5, 9, 2].forEach(item => {
    item *= 2;
}).filter(item => {
    return item > 2;
});
// TypeError: Cannot read property 'filter' of undefined

[2, 5, 9, 2].filter(item => {
    return item > 2;
}).forEach(item => {
    console.log(item); // 5 9
});