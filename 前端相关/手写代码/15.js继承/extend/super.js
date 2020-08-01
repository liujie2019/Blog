class Parent {
    constructor() {
        console.log(new.target.name); // Child
    }
}
class Child extends Parent {
    constructor() {
        super();
    }
}

const child = new Child();