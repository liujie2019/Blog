function myInstance(left, right) {
    let proto = left.__proto__;
    let prototype = right.prototype;
    while (true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = proto.__proto__;
    }
}

class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}
const p = new Person('lisi');

console.log(p instanceof Person); // true