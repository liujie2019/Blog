function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
}

class Animal {
    sayName() {
        console.log(this.name);
    }
}

class Dog extends Animal {
    constructor() {
        super();
        this.name = '小黄';
    }
}

const animal = new Animal();
const dog = new Dog();
const cat = new Object({
    name: '小花'
});
const pig = {
    name: '小胖'
};
console.log(Object.getPrototypeOf(animal) === Animal.prototype); // true
console.log(isPlainObject(animal)); // false
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
console.log(isPlainObject(dog)); // false
console.log(isPlainObject(cat)); // true
console.log(isPlainObject(pig)); // true