// 基类Person
function Person(name, age){
    this.name = name;
    this.age = age;
}
// 基类原型方法
Person.prototype.hi = function() {
    console.log('Hi,My name is' + this.name + ',I am' + this.age + 'years old');
}
// 基类原型属性
Person.prototype.LEGS_NUM = 2;
Person.prototype.ARMS_NUM = 2;
Person.prototype.walk = function() {
    console.log(this.name + "is walking...");
}

function Student(name, age, className) {
    Person.call(this, name, age);
    this.className = className;
}

//Object.create()创建一个空对象，并且这个对象的原型指向这个参数
Student.prototype = Object.create(Person.prototype);
// 将constructor指向Student本身，不这样设定的话将会指向Person
Student.prototype.constructor = Student;

//覆盖父类的hi方法
Student.prototype.hi = function() {
    console.log("Hi,my name is " + this.name + "I'm" + this.age + "years old now,and from" + this.className + ".");
}

Student.prototype.learn = function(subject) {
    console.log(this.name + " is learning" + subject + 'at' + this.className + '.');
}

// bosn是Student的实例
var bosn = new Student('Bosn', 28,'Class 3,Grade 2');
// bosn.hi();
// console.log(bosn.LEGS_NUM);
// bosn.walk();
// bosn.learn('math');
// console.log(bosn);
// console.log(bosn.__proto__ === Student.prototype); // true

Student.prototype.x = 101;
// console.log(bosn.x);

Student.prototype = {y: 2};
console.log(bosn.x); // 101
console.log(bosn.y); // undefined

var tom = new Student('Tom', 22,'Class 1,Grade 4');
console.log(tom.x); // undefined
console.log(tom.y); // 2
