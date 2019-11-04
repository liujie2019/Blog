class Parent {
    constructor() {
        console.log(new.target.name);
    }
}

class Child extends Parent {
    constructor() {
        super(); // 调用父类的构造函数
    }
    sayName() {
        super();
    }
}

const child = new Child(); // Child
child.sayName();
new Parent(); // Parent
