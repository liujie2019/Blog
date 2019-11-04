// class Parent {
//     constructor() {}
//     sayName() {}
// }

// // Object.keys返回所有可枚举属性
// console.log(Object.keys(Parent.prototype)); // []
// // Object.getOwnPropertyNames返回全部属性(包括可枚举和不可枚举)
// console.log(Object.getOwnPropertyNames(Parent.prototype)); // [ 'constructor', 'sayName' ]

function Parent() {}
Parent.prototype.sayName = function() {};

// Object.keys返回所有可枚举属性
console.log(Object.keys(Parent.prototype)); // [ 'sayName' ]
// Object.getOwnPropertyNames返回全部属性(包括可枚举和不可枚举)
console.log(Object.getOwnPropertyNames(Parent.prototype)); // [ 'constructor', 'sayName' ]
