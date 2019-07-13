function readOnly(target, name, descriptor) {
    console.log(target); // Person {}
    console.log(name); // sayName
    console.log(descriptor);
    /*
    descriptor对象原来的值如下
    {
      value: [Function: sayName],
      enumerable: false,
      configurable: true,
      writable: true
    };
    */
    descriptor.writable = false;
    return descriptor;
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    @readOnly
    sayName() {
        return `${this.name} ${this.age}`;
    }
}

const person = new Person('lisi', 22);
// person.sayName = () => {
//     return `${this.name}`;
// };
console.log(person.sayName());