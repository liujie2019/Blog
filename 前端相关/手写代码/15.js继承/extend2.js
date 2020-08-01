/**
 * 继承：子类继承父类中的属性和方法(目的是让子类的实例能够调用父类中的属性和方法)
 * 方案一：原型链继承
 *  让父类中的属性和方法在子类实例的原型链上。
 *  Child.prototype = new Parent();
 *  Child.prototype.constructor = Child;
 *  特点：
 *     1. 不像其他语言中的继承一样(其它语言的继承一般是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝一份到子类中，供子类的实例调用)，JS继承是把父类的原型放到子类实例的原型链上，实例想调用这些属性和方法，是基于__proto__原型链查找机制完成的。
 *     2. 子类可以重写父类上的方法(这样会导致父类的其它的实例也受到影响)
 *     3. 父类中私有或者公有的属性和方法，最后都会变成子类实例的公有属性和方法。
*/
function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child(age) {
    this.age = age;
}

Child.prototype.getAge = function() {
    console.log(this.age);
}

const child = new Child(12);
console.log(child.age);
child.getAge();