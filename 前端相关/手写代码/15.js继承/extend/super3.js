class Parent {
    constructor() {
        this.name = '父类';
    }
    sayName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor() {
        super();
        this.name = '子类';
    }
    print() {
        super.sayName();
    }
}

const child = new Child();
child.print(); // 子类