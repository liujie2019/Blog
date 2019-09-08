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
abstract class Animal {
    public name:string;
    constructor(name:string) {
        this.name = name;
    }
    // 抽象方法，必须在子类中实现
    abstract eat():any;
    run() {
        // 非抽象方法，在子类中可以不实现
    }
}

// let a = new Animal(); // 错误写法，抽象类无法实例化

class Dog extends Animal {
    constructor(name:string) {
        super(name);
    }
    // 抽象类的子类必须实现抽象类中的抽象方法
    eat():string {
        return `${this.name}吃骨头`;
    }
}

let dog = new Dog('xiaogou');
console.log(dog.eat());