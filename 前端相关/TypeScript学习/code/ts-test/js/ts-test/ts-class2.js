"use strict";
// 静态属性和方法
// function Person() {
//     // 实例方法
//     this.run = function() {}
// }
// // 静态属性
// Person.name = 'lisi';
// 静态方法
// Person.run = function() {};
// // 静态方法可以直接通过类名来调用，实例方法需要通过实例来调用
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// class Person {
//     public name:string;
//     static age:number = 12;
//     constructor(name:string) {
//         this.name = name;
//     }
//     // 实例方法
//     run():string {
//         return `${this.name}在运动`;
//     }
//     // 静态方法
//     static eat():string {
//         // 在静态方法中无法直接调用类里面的属性，只能访问静态属性
//         return `${Person.age}`;
//     }
// }
// let p = new Person('lisi');
// console.log(p.run());
// console.log(Person.eat()); // 12
// // 多态
// class Animal {
//     public name:string;
//     constructor(name:string) {
//         this.name = name;
//     }
//     // 具体吃什么由继承它的子类实现，每一个子类的表现不一样
//     eat() {
//         console.log('吃的方法');
//     }
// }
// class Dog extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
//     eat():string {
//         return `${this.name}吃骨头`;
//     }
// }
// class Cat extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
//     eat():string {
//         return `${this.name}吃老鼠`;
//     }
// }
// 定义一个抽象类
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        // 非抽象方法，在子类中可以不实现
    };
    return Animal;
}());
// let a = new Animal(); // 错误写法，抽象类无法实例化
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    // 抽象类的子类必须实现抽象类中的抽象方法
    Dog.prototype.eat = function () {
        return this.name + "\u5403\u9AA8\u5934";
    };
    return Dog;
}(Animal));
var dog = new Dog('xiaogou');
console.log(dog.eat());
