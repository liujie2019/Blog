面向对象程序设计(Object-oriented programming, OOP)是一种程序设计范型，同时也是一种程序开发的方法。对象指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性。

特点：

* 继承
* 封装
* 多态
* 抽象

### 对象
#### 创建对象
* 对象创建-对象字面量
* new 构造器
* Object.create()

```
function Foo () {}
Foo.prototype.z = 3;

var obj = new Foo();
obj.z = 2;

console.log(obj.z); // 2
delete obj.z; // 只会删除实例上的属性，不会删除原型上的属性
console.log(obj.z); // 3
```
```
// obj是一个空对象，原型指向{x: 1}
var obj = Object.create({x: 1});
console.log(obj.x); //1
console.log(typeof obj.toString); // 'function'
console.log(obj.hasOwnProperty('x')); // false

// 原型链如下：
obj->{x: 1}->Object.prototype->null
```
```
// 这样的话obj的原型直接就是null
var obj = Object.create(null);
console.log(obj.toString); // undefined
// 原型链如下：
obj->null
```
#### 属性操作
读写对象属性
属性异常
删除属性
检测属性
枚举属性

```
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
// Student继承Person
// Student.prototype就是一个空对象，并且该空对象的原型指向Person.prototype
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

var bosn = new Student('Bosn', 28,'Class 3,Grade 2');
bosn.hi();
console.log(bosn.LEGS_NUM);
bosn.walk();
bosn.learn('math');
```
![](../static/js-oop.png)

#### 改变Student.prototype
```
Student.prototype.x = 101;
// console.log(bosn.x);

Student.prototype = {y: 2};
console.log(bosn.x); // 101
console.log(bosn.y); // undefined

var tom = new Student('Tom', 22,'Class 1,Grade 4');
console.log(tom.x); // undefined
console.log(tom.y); // 2
```
在上面的例子的基础上，改变Student.prototype。发现：Student.prototype上的属性改变会影响已经创建的实例，但是如果直接给Student.prototype赋予新的值则不会影响已经创建的实例(因为bosn.y返回了undefined)。但是对于新创建的实例对象，则返回新赋予的对象的值。

#### 内置构造器的prototype
```
Object.prototype.x = 1;
var obj = {}; // 这样的话,属性x是可枚举的
console.log(obj.x);
for (var key in obj) {
    console.log(key);
}
```
#### 原型链
```
function Foo() {}
Foo.prototype.a = 1;

var obj = new Foo();
obj.b = 2;
obj.c = 3;

console.log(obj.a); //1 读取原型链上的a
console.log(obj.b); //2 本身有
console.log(obj.c); //3 本身有
console.log(typeof obj.toString); //function 读取Object上的值
console.log('a' in obj); //true // in操作符不管是实例自己有还是原型上有都会返回true
console.log(obj.hasOwnProperty('a')); //false hasOwnProperty方法只有实例本身有相应的属性时才会返回true

console.log(obj.__proto__ === Foo.prototype); // true
console.log(Foo.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```
#### instanceof
不同window或iframe间的对象类型检测不能使用instanceof。

```
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

// 只要bosn的原型链上存在Student.prototype，所以返回true
console.log(bosn instanceof Student); // true
// 只要bosn的原型链上存在Person.prototype，所以返回true
console.log(bosn instanceof Person); // true
// 只要bosn的原型链上存在Object.prototype，所以返回true
console.log(bosn instanceof Object); // true
```
#### 实现继承的方式
```
function Person() {}
function Student() {}

// 这种方式不可行，会导致Person.prototype也会发生改变
Student.prototype = Person.prototype;

Student.prototype = new Person();

// 最为理想，但是是Es5之后才支持
Student.prototype = Object.create(Person.prototype);

// 做兼容
if (!Object.create) {
	Object.create = function(proto) {
		function F() {}
		F.prototype = proto;
		return new F;
	}
}
```

```
// 该方法创建一个空对象，并且空对象的原型指向该方法的参数
Object.create(Person.prototype)
```