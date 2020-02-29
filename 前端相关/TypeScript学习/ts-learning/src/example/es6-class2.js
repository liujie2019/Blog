// // es5继承
// function Food() {
//     this.type = 'food';
// }
// Food.prototype.getType = function() {
//     return this.type;
// }

// function Vegetables(name) {
//     this.name = name;
// }

// const food = new Food();

// Vegetables.prototype = new Food(); // 实现继承
// Vegetables.prototype.constructor = Vegetables;

// const tomato = new Vegetables('tomato');
// console.log(tomato); // Food { name: 'tomato' }
// console.log(tomato.getType()); // food
// console.log(tomato.constructor); // [Function: Vegetables]
// console.log(food.constructor); // [Function: Food]

// // es6继承
class Parent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    static getNames() {
        return this.name;
    }
}
class Child extends Parent {
    constructor(name, age) {
        super(name); // 给super传递参数就相当于给父类的构造函数传递参数
        this.age = age;
    }
}
const p = new Parent();
const child = new Child('lisi', 18);
console.log(child.__proto__.__proto__ === p.__proto__); // true
// console.log(child); // Child { name: 'lisi', age: 18 }
// console.log(child.getName()); // lisi
console.log(Child.__proto__ === Parent); // true
console.log(Child.prototype.__proto__ === Parent.prototype); // true
// console.log(Child.getNames()); // Child

// console.log(Object.getPrototypeOf(Child) === Parent); // true

// class Parent {
//     constructor() {
//         this.type = 'parent';
//     }
//     getName() {
//         return this.type;
//     }
// }
// Parent.getType = () => {
//     return 'is parent';
// }

// class Child extends Parent {
//     constructor() {
//         super();
//         // super作为对象，在普通函数中指向父类的原型
//         console.log('constructor:' + super.getName()); // constructor:parent
//     }
//     getParentName() {
//          // super作为对象，在普通函数中指向父类的原型
//         console.log('getParentName:' + super.getName()); // getParentName:parent
//     }
//     static getParentType() {
//         // super作为对象，在静态方法中指向父类
//        console.log('getParentType:' + super.getType()); // getParentType:is parent
//    }
// }
// const child = new Child();
// child.getParentName();
// Child.getParentType();

// class Parent {
//     constructor() {
//         this.name = 'parent';
//     }
//     parentPrint() {
//         console.log(this.name);
//     }
// }
// class Child extends Parent {
//     constructor() {
//         super();
//         this.name = 'child';
//     }
//     childPrint() {
//         console.log(this.name);
//     }
// }

// const child = new Child();
// child.parentPrint(); // child

// const objs = new Object();
// console.log(objs.__proto__ === Object.prototype); // true

class CustomArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

const arr = new CustomArray(3);
arr.fill('@');
console.log(arr); // CustomArray [ '@', '@', '@' ]