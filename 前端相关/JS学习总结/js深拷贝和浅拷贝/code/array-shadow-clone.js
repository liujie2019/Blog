/**
 * concat和slice可以实现数据的浅拷贝
 */
const arr = ['test', 1, true, null, undefined];
const arr_new = arr.concat(); // 实现数组的浅拷贝
const arr_slice = arr.slice();
arr_new[1] = 2;
arr_slice[1] = 3;
// [ 'test', 1, true, null, undefined ] [ 'test', 2, true, null, undefined ] [ 'test', 3, true, null, undefined ]
console.log(arr, arr_new, arr_slice);