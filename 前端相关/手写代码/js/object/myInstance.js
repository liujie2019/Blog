/**
 * @param {*} left 实例对象(取隐式原型)
 * @param {*} right 构造函数(取显示原型)
 */
function myInstance(left, right) {
    let proto = left.__proto__;
    const prototype = right.prototype;
    while(true) {
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
console.log(p instanceof Object); // true