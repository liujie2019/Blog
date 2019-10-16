let arr = [{name: 'lisi'}, 1, 2];
let newArr = [...arr];
// Object.assign也是浅拷贝
arr[0].name = 'wangwu';
console.log(arr, newArr);