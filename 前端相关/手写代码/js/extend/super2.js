class Parent {
    constructor() {
        this.name = 'lisi';
    }
    sayName() {
        return '父类';
    }
}
Parent.prototype.age = 12;
class Child extends Parent {
    constructor() {
        super();
        // 这里将super当作对象使用，并且在普通方法中，此时super指向Parent.prototype
        // super.sayName()相当于Parent.prototype.sayName()
        console.log(super.sayName());
        console.log(super.name); // undefined
        console.log(super.age); // 12
    }
}

const child = new Child();