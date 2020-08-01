/**
 * call借用构造函数继承
 * 特点：
 *  在子类的构造函数中把父类的构造函数当做普通函数执行，让父类构造函数中的this指向子类的实例，相当于给子类的实例设置了父类的私有属性或者方法。
 *  1. 只能继承父类的私有属性或者方法(因为是把父类当作普通函数执行，和父类原型上的属性和方法没有关系)
 *  2. 父类私有的属性和方法变为子类私有的属性和方法
*/

function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child(age) {
    Parent.call(this, 'lisi');
    this.age = age;
}

Child.prototype.getAge = function() {
    console.log(this.age);
}

const child = new Child(12);
console.log(child.age);
console.log(child.name);
child.getAge();