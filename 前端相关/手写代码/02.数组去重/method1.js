// Set
let originalArray = [1, '1', '1', 2, true, 'true', false, false, null, null, {}, {}, 'abc', 'abc', undefined, undefined, NaN, NaN];
// const arr = [1, 2, 2, 1, 3, 4, 4];
console.log([...new Set(originalArray)]); // [ 1, '1', 2, true, 'true', false, null, {}, {}, 'abc', undefined, NaN ]
// [ 1, '1', 2, true, 'true', false, null, {}, {}, 'abc', undefined, NaN ]
console.log(Array.from(new Set(originalArray)));

const mySet = new Set();
mySet.add(1);
mySet.add(1);
mySet.add({name: 'lisi',age: 10});
mySet.add({name: 'lisi',age: 10});

console.log(mySet); // Set { 1, { name: 'lisi', age: 10 }, { name: 'lisi', age: 10 } }