/**
 * 数组中嵌套了对象或者数据
 */
const arr = [{name: 'lisi'}, [1, 2, 3]];
// const arr_new = arr.concat(); // 实现数组的浅拷贝
const arr_new = Array.from(arr);
arr[0].name = 'lisi-from';
arr[1][0] = 222;
// [ { name: 'lisi-from' }, [ 222, 2, 3 ] ] [ { name: 'lisi-from' }, [ 222, 2, 3 ] ]
console.log(arr, arr_new);
// 无论是新数组还是旧数组都发生了变化，也就是说使用concat和ES6的Array.from方法实现的都是是浅拷贝