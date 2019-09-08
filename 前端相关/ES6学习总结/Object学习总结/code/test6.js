// let obj = { a: { b: 1 } };
// let { ...x } = obj;
// console.log(x); // { a: { b: 1 } }

let obj1 = {name: 'lisi', [Symbol()]: 2};
let obj2 = {age: 12}
Object.setPrototypeOf(obj1, obj2);
for (key in obj1) {
    console.log(key); // name age
}
console.log(Object.keys(obj1)); // ['name']
console.log(Object.getOwnPropertyNames(obj1)); // ['name']
console.log(Object.getOwnPropertySymbols(obj1)); // [ Symbol() ]
console.log(Reflect.ownKeys(obj1)); // [ 'name', Symbol() ]