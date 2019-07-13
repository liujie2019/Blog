let obj = {name: 'lisi', age: 22};
let obj2 = {name: 'wangwu', age: 23};
// const person = new WeakSet([obj, obj2]);

// console.log(person);
// console.log(person.has(obj2)); // true
// person.add(111); // TypeError: Invalid value used in weak set

// TypeError: person is not iterable
// for (let item of person) {
//     console.log(item);
// }

// Uncaught TypeError: person.forEach is not a function
// person.forEach(item => {
//     console.log(item);
// });

// const personArr = [obj, obj2];
const personWeakSet = new WeakSet([obj, obj2]);
console.log(personWeakSet);
// 虽然这里将obj删除掉了，但是数据personArr中依然保存了对obj的引用，这就导致了内存泄露
obj = null;
console.log(obj);
console.log(personWeakSet);