// es5继承
function Parent(name) {
    this.name = name;
}
// 静态属性是属于类的，不需要实例就能调用
Parent.hello = 'hello';

function Child() {}
// 实现继承 将子类的原型指向父类的实例对象
// 这样会有问题：会继承父类实例的私有属性，我们只希望拿到父类原型上的属性即可
// Child.prototype = new Parent();
// 为了避免继承父类实例的私有属性，采用Object.create

Child.prototype = Object.create(Parent.prototype);
// 重写子类的构造函数
// Child.prototype.constructor = Child;
let child = new Child();
console.log(child.name); // lisi
// child实例上并没有constructor属性
// 会沿着原型链往上找，一直找到Parent.prototype.constructor
console.log(child.constructor); // [Function: Parent]

// 静态属性不需要通过实例来调用
// 静态属性是所有实例共享的，是类级别的