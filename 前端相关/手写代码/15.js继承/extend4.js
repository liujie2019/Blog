/**
 * 寄生组合继承：call继承 + 原型链继承
 * 特点：父类私有和公有的属性方法分别是子类实例的私有和公有的属性方法。
 *
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
// Object.create(obj)：创建一个空对象，让空对象的__proto__指向obj
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.getAge = function() {
    console.log(this.age);
}

const child = new Child(12);
console.log(child.age);
console.log(child.name);
child.getAge();