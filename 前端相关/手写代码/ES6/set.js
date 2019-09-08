// set / map 去重
// set 放的是一个个的值，map放的是键值对
// set和map都支持Symbol.interator

// set面试题：实现两个数组的交集、并集和差集
let arr1 = [1, 2, 2, 4, 5, 1];
let arr2 = [5, 6, 7, 6, 2, 3, 2];
// 数组去重 求并集
function union() {
    // 先基于set进行数组去重
    let s = new Set([...arr1, ...arr2]);
    // 再将set转为数组返回
    return [...s]; // [ 1, 2, 4, 5, 6, 7, 3 ]
}
console.log(union());

// 求交集
function intersection() {
    // arr1和arr2先去重
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    // 返回true 留下
    return [...s1].filter(item => {
        return s2.has(item);
    });
}
console.log(intersection()); // [ 2, 5 ]

// 求差集
function diff() {
    // arr1和arr2先去重
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    // 返回true 不留
    return [...s1].filter(item => {
        return !s2.has(item);
    });
}
console.log(diff()); // [ 1, 4 ]