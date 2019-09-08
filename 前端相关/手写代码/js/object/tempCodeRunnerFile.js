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
console.log(p.__proto__ === p);