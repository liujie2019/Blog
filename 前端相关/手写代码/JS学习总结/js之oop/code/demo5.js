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

Student.prototype = new Person();
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

console.log(bosn instanceof Student); // true
console.log(bosn instanceof Person); // true
console.log(bosn instanceof Object); // true