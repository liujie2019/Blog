// es5中的类是通过构造函数来实现的
// function Animal(name, age) {
//     this.name = name;
//     this.age = age;
//     this.run = function() {
//         console.log(`${this.name}在抓老鼠`);
//     }
// }

// Animal.prototype.eat = function() {
//     console.log(`${this.name}在吃饭啊`);
// }

// // 静态方法
// Animal.sayName = function() {
//     console.log('我是静态方法');
// }

// let cat = new Animal('小花', 1);
// es5继承：对象冒充继承模式
// function Cat() {
//     // 对象冒充实现继承
//     Animal.call(this);
// }
// //  对象冒充可以继承构造函数里面的属性和方法，但是无法继承原型链上的属性和方法
// cat.run(); // 小花在抓老鼠
// cat.eat();

// 原型链+对象冒充的组合继承模式
// function Cat(name, age) {
//     Animal.call(this, name, age); // 对象冒充继承，实例化子类可以给父类传参
// }
// // Cat.prototype = Object.create(Animal.prototype);
// // 原型链实现继承
// Cat.prototype = new Animal();
// // 纠正构造函数指向
// Cat.prototype.constructor = Cat;
// let cat = new Cat('小花', 1);
// console.log(cat.constructor);
// cat.run(); // 小花在抓老鼠
// cat.eat();