var myObject = {};

myObject.name = 'lisi';
console.log(myObject);
// 旧写法
// Object.preventExtensions(myObject); // Object {}


// 新写法
Reflect.preventExtensions(myObject); // true
myObject.age = 10;
console.log(myObject);