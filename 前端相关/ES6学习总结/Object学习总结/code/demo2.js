const obj = {name: 'lisi', age: 20};
console.log(Object.getOwnPropertyDescriptors(obj));
// console.log(Object.getOwnPropertyDescriptor(obj, 'age'));
// console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable); // false