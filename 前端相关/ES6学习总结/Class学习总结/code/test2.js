// let obj = {
//     name: 'lisi',
//     age: 12
// }
// console.log('name' in obj); // true

// const obj = {
//     get foo() {},
//     set foo(x) {}
// }
// // 获取foo属性的访问器对象
// const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
// console.log(descriptor);
// console.log(descriptor.get.name);

const obj = {name: '123', [Symbol()]: 2};
Object.defineProperty(obj, 'age', {
    enumerable: false
});
for (key in obj) {
    console.log(key); // name
}
console.log(Object.keys(obj)); // ['name']
console.log(Object.getOwnPropertyNames(obj)); // ['name', 'age']
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol() ]
console.log(Reflect.ownKeys(obj)); // [ 'name', 'age', Symbol() ]
// console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
/*
{ value: '123',
  writable: true,
  enumerable: true,
  configurable: true }
*/