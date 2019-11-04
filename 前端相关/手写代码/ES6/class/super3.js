class Parent {
    constructor() {
        this.name = 'lisi';
    }
    sayName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor() {
        super();
        this.name = 'wangwu';
    }
    say() {
        // super指向Parent.prototype
        super.sayName();
    }
}

const child = new Child();
child.say(); // wangwu