// const arr = ['test', {name: 'lisi'}, [1, 2, 3]];
// const arr_new = JSON.parse(JSON.stringify(arr));

// arr[1].name = 'wangwu';
// console.log(arr); // [ 'test', { name: 'wangwu' }, [ 1, 2, 3 ] ]
// console.log(arr_new); // [ 'test', { name: 'lisi' }, [ 1, 2, 3 ] ]

const arr = [
    function() {console.log('a')},
    {
        b: function() {console.log('b')}
    }
];
const arr_new = JSON.parse(JSON.stringify(arr));
console.log(arr_new); // [ null, {} ]