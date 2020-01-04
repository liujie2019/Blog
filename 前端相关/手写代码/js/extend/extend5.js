/**
 * ES6继承：原理是基于寄生组合继承
*/

// ES6中基于class创建出来的类不能当做普通函数执行(也就是说call继承在ES6的class继承中行不通，call继承需要在子类的构造函数中把父类的构造函数当做普通函数执行)。
class Parent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor(age) {
        // 需要注意：子类只要继承父类，可以不写constructor。但是一旦写了constructor，则在constructor中的第一行必须是super()。
        // 如果不调用super方法，子类就得不到this对象。
        super('lisi'); // super相当于Parent.call(this, 'lisi')，把父类当做普通函数执行，给父类构造函数传递参数，让父类构造函数中的this指向子类的实例。
        this.age = age;
    }
    getAge() {
        console.log(this.age);
    }
}

// Child.prototype = Object.create(Parent.prototype); 不允许重定向原型指向
const child = new Child(12);
console.log(child);