// 使得原型属性可遍历
function doenumerable(target, name, descriptor) {
    descriptor.enumerable = true;
    return descriptor;
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    @doenumerable
    sayName() {
        return `${this.name}`;
    }
}
// 本身应该为false
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'sayName').enumerable); // true
const person = new Person('lisi');
for (let key in person) {
    console.log(key);
    // name
    // age
    // sayName
}