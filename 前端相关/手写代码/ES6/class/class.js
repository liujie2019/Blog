// 定义一个类
// 以前js里类和构造函数是一体的
// 类里可以定义构造函数
// 当创建类的实例的时候就会调用构造函数
class Parent {
    constructor (name) {
        this.name = name; // 实例的私有属性
    }
    // 静态属性，是类的属性
    static hello() {
        console.log('hello');
    }
    // 实例的公有属性，相当于原型属性
    sayName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor(name, age) {
        // super指的是父类的构造函数
        super(name);
        this.age = age;
    }
    sayAge() {
        console.log(this.age);
    }
}

let p = new Parent('lisi');
p.sayName();
Parent.hello();