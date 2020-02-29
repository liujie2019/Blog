// ES5构造函数形式
// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }

// Point.prototype.getPosition = function() {
//     return `(${this.x}, ${this.y})`;
// }

// const p = new Point(1, 2);
// console.log(p); // Point { x: 1, y: 2 }
// console.log(p.getPosition()); // (1, 2)

// ES6类
// class Point {
//     // constructor默认返回当前创建的实例对象，可以显式修改constructor的返回值
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     getPosition() {
//         return `(${this.x}, ${this.y})`;
//     }
// }

// const p = new Point(1, 2);
// console.log(p); // Point { x: 1, y: 2 }
// console.log(p.getPosition()); // (1, 2)

// const person = {
//     _age: 12,
//     get age() {
//         return this._age;
//     },
//     set age(newValue) {
//         if (newValue > 30) {
//             console.log('老了老了');
//         } else {
//             console.log('哈哈还年轻');
//         }
//     }
// };

// console.log(person.age); // 12
// person.age = 24; // 哈哈还年轻
// person.age = 32; // 老了老了

// class Person {
//     constructor(age) {
//         this._age = age;
//     }
//     get age() {
//         return this._age;
//     }
//     set age(newValue) {
//         console.log(`new age is ${newValue}`);
//         this._age = newValue;
//     }
// }

// const p = new Person(12);
// console.log(p.age); // 12
// p.age = 24; // new age is 24
// console.log(p.age); // 24

// class表达式(真正的类名是Infos而不是c)
// const Infos = class c{
//     constructor() {}
// }

// const testInfo = new Infos();

function testFn() {
    console.log(testFn.name); // 'testFn'
}

testFn();

// 静态方法
// class Point {
//     // constructor默认返回当前创建的实例对象，可以显式修改constructor的返回值
//     // z = 3;
//     constructor(x, y, z) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }
//     getPosition() {
//         return `(${this.x}, ${this.y})`;
//     }
//     static getClassName() {
//         return Point.name;
//     }
// }

// console.log(Point.getClassName()); // Point
// const p = new Point(1, 2, 6);
// console.log(p); // Point {z: 6, x: 1, y: 2}

// 静态属性
// class Point {
//     constructor(x) {
//         this.x = x;
//     }
// }
// Point.y = 123;
// const p = new Point(1);
// console.log(p.x); // 1
// console.log(p.y); // undefined

// 定义私有属性和方法
// 在模块内部定义一个方法_fn2和类Point，并只将Point类导出
// const _fn2 = () => {};
// class Point {
//     fn1() {
//         _fn2.call(this);
//     }
// }
// // 在其它模块中导入Point类
// const p = new Point();
// p.fn1();
// p._fn2(); // p._fn2 is not a function

// function Point() {
//     console.log(new.target); // [Function: Point]
// }
// const p = new Point();
// const p2 = Point(); // undefined

// class Point {
//     constructor() {
//         console.log(new.target); // [Function: Point]
//     }
// }
// const p = new Point();

class Parent {
    constructor() {
        if (new.target === Parent) {
            throw new Error('不能实例化');
        }
        console.log(new.target); // [Function: Child]
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}
const c = new Child();
const p = new Parent(); // 不能实例化