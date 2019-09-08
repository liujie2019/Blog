// 使得原型属性可遍历
// target 当前类Person
// name 当前装饰器修饰的属性名，这里是sayName
// descriptor是当前属性的描述器对象
function doenumerable(target, name, descriptor) {
    descriptor.enumerable = true;
    return descriptor;
}

class Person {
    constructor(name, age) {
        // 实例属性
        this.name = name;
        this.age = age;
        this.sayAge = () => {
            return `${this.age}`;
        }
    }
    // 原型方法
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