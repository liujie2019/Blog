// document.write('hello webpack');
function Animal() {}
function Dog() {}

Object.defineProperties(Animal.prototype, {
    name: {
        value() {
            return 'Animal';
        }
    },
    say: {
        value() {
            return `I'm ${this.name()}`;
        }
    }
});

// dog instanceof Animal => true
// dog.__proto__.__proto__ === Animal.prototype
// dog.__proto__ === Dog.prototype
// Dog.prototype.__proto__ === Animal.prototype

// 继承
Dog.prototype = Object.create(new Animal(), {
    constructor: {
        value: Dog,
        enumerable: false
    },
    // 多态实现，子类方法覆盖父类
    name: {
        value() {
            return 'Dog';
        }
    }
});
document.write(new Dog() instanceof Animal); // true
document.write(new Dog().say());
document.write(Dog.prototype.constructor);