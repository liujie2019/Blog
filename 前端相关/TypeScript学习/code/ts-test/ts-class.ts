// // class Person {
// //     name:string; //属性 前面省略了public关键字
// //     constructor(name:string) { // 构造函数 实例化类的时候调用的方法
// //         this.name = name;
// //     }
// //     run():void {
// //         console.log(this.name);
// //     }
// // }

// // let p = new Person('lisi');
// // p.run();

// // class Person {
// //     name:string; //属性 前面省略了public关键字
// //     constructor(name:string) { // 构造函数 实例化类的时候调用的方法
// //         this.name = name;
// //     }
// //     getName():string {
// //         return this.name;
// //     }
// //     setName(name:string):void {
// //         this.name = name;
// //     }
// // }

// // let p = new Person('lisi');
// // console.log(p.getName()); // lisi
// // p.setName('wangwu');
// // console.log(p.getName()); // wangwu

// // // ts继承 通过extends和super两个关键字
// // class Person {
// //     name:string; //属性 前面省略了public关键字
// //     constructor(name:string) { // 构造函数 实例化类的时候调用的方法
// //         this.name = name;
// //     }
// //     run():string {
// //         return `${this.name}在运动`;
// //     }
// // }

// // // let p = new Person('lisi');
// // // console.log(p.run()); // lisi在运动

// // class Man extends Person {
// //     constructor(name:string) {
// //         super(name); // 初始化父类的构造函数
// //     }
// //     run():string { // 子类自己的run方法
// //         return `${this.name}在运动-子类`;
// //     }
// //     eat():string { // 子类扩展方法
// //         return `${this.name}在吃饭`;
// //     }
// // }
// // let man = new Man('男人');
// // // 先去子类自己中找，找不到再去父类中找
// // console.log(man.run()); // 男人在运动
// // console.log(man.eat()); // 男人在吃饭


// // ts类修饰符
// // class Person {
// //     private name:string; // 公有属性
// //     constructor(name:string) { // 构造函数 实例化类的时候调用的方法
// //         this.name = name;
// //     }
// //     run():string {
// //         return `${this.name}在运动`;
// //     }
// // }

// // let p = new Person('lisi');
// // console.log(p.run()); // lisi在运动

// class Man extends Person {
//     constructor(name:string) {
//         super(name); // 初始化父类的构造函数
//     }
//     // run():string { // 子类自己的run方法
//     //     return `${this.name}在运动-子类`;
//     // }
//     eat():string { // 子类扩展方法
//         return `${this.name}在吃饭`;
//     }
// }
// let man = new Man('男人111');
// // 先去子类自己中找，找不到再去父类中找
// console.log(man.run()); // 男人在运动
// console.log(man.eat()); // 男人在吃饭
// console.log(man.name);