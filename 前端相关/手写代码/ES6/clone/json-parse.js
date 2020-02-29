const arr = [{name: 'lisi'}, [1, 2, 3]];
const arr2 = JSON.parse(JSON.stringify(arr));

arr[0].name = 'wangwu';
arr2[1][1] = 666;
console.log(arr); // [ { name: 'wangwu' }, [ 1, 2, 3 ] ]
console.log(arr2); // [ { name: 'lisi' }, [ 1, 666, 3 ] ]