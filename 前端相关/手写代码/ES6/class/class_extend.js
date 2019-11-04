class Parent {}

class Child extends Parent {
    constructor() {}
}

console.log(Object.getPrototypeOf(Child) === Parent); // true