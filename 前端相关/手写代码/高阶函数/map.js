const arr1 = [1, 2, 3];

const arr2 = arr1.map(item => item * 2);

console.log(arr1); // [ 1, 2, 3 ]
console.log(arr2); // [ 2, 4, 6 ]

const arr1 = [{
    name: 'lisi',
    age: 10
}, {
    name: 'wangwu',
    age: 20
}];

const arr2 = arr1.map(({name, age}) => {
    return {
        name,
        age: age * 2
    }
});

console.log(arr1); // [ { name: 'lisi', age: 10 }, { name: 'wangwu', age: 20 } ]
console.log(arr2); // [ { name: 'lisi', age: 20 }, { name: 'wangwu', age: 40 } ]