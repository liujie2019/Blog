// function myInstanceof(left, right) {
//     let proto = left.__proto__;
//     let prototype = right.prototype;
//     while (true) {
//         if (proto === null) return false;
//         if (proto === prototype) return true;
//         proto = proto.__proto__;
//     }
// }

function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;
    while (true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
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
console.log(myInstanceof(p, Person)); // true
console.log(myInstanceof(p, Object)); // true
console.log(p instanceof Person); // true
console.log(p instanceof Object); // true