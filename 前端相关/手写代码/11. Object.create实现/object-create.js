function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function() {
    console.log(this.name);
}
const p = new Person('lisi', 20);
const p1 = Object.create(p);
// p1是原型指向p的对象
console.log(p.__proto__ === p.__proto__); // true
console.log(p.__proto__ === Person.prototype); // true
// p1上没有constructor属性，会沿着原型链向上查找，p1的原型即实例p上也没有constructor属性，继续向上找，去Person.prototype上查找
console.log(p1.constructor); // [Function: Person]

// function MyCreate(proto) {
//     function F() {};
//     F.prototype = proto;
//     F.prototype.constructor = F;
//     return new F();
// }

// const p1 = MyCreate(p);
