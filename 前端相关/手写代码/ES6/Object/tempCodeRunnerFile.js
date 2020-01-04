const obj1 = {name: 'lisi'};
const obj2 = {name: 'lisi2'};
const obj3 = {};
// 给obj3设置原型
Object.setPrototypeOf(obj3, obj1); // 等同于 obj3.__proto__ === obj1
console.log(obj3.name); // lisi
console.log(obj3.__proto__ === obj1); // true