// 父类
function Animal () {
    this.name = '';
    this.age = 0;
}

// 父类方法
Animal.prototype.sayName = function() {
    console.log(`My Name is ${this.name}, I am ${this.age} years old !`);
}

// 子类
function Dog () {
    Animal.call(this);
}

// 子类继承父类
// Object.create()方法返回一个新对象，并将新对象的原型指向Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog();
dog.name = '小黄';
dog.age = 2;
dog.sayName();
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log(Dog.prototype.constructor);
console.log(dog.__proto__ === Dog.prototype); // true