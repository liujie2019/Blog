### 1. Object.create
`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。
#### 1.1 语法
```
Object.create(proto, [propertiesObject])
```
#### demo(Object.create实现类式继承)
```
// 父类
function Animal () {
    this.name = '';
    this.age = 0;
}

// 父类方法
Animal.prototype.sayName = function() {
    console.log(`My Name is ${this.name}, I am ${this.age} years old !`);
}

// 子类
function Dog () {
    Animal.call(this);
}

// 子类继承父类
// Object.create()方法返回一个新对象，并将新对象的原型指向Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog();
dog.name = '小花';
dog.age = 2;
dog.sayName();
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log(Dog.prototype.constructor);
```
### 2. Object.defineProperty

`Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

`Object.defineProperty` ，顾名思义，为对象定义属性。在js中我们可以通过下面这几种方法定义属性：

```
// 方法1
obj.name = 'lisi';
// 方法2
obj['name'] = 'lisi';
// 方法3
Object.defineProperty(obj, 'name', {
    value : 'lisi'
})
```
#### 2.1 语法
```
Object.defineProperty(object, propertyname, descriptor)
```
该方法的返回值是**被传递给函数的对象**。

>在ES6中，由于 Symbol类型的特殊性，用Symbol类型的值来做对象的key与常规的定义或修改不同，而Object.defineProperty 是定义key为Symbol的属性的方法之一。

#### 2.2 参数
* object：必需，要在其上添加或修改属性的对象。 这可能是一个本机 JavaScript对象（即用户定义的对象或内置对象）或 DOM 对象；
* propertyname：必需，要定义或修改的属性的名称。
* descriptor：必需，属性描述符。 将被定义或修改的属性描述符。

#### 2.3 属性的状态设置
#### 2.4 `=`与Object.defineProperty区别
如果要为js对象新增或者修改属性，有两种不同方式：

1. 直接使用`=`赋值;
2. 使用`Object.defineProperty()`定义.

```
# demo1
const obj = {};

// 直接使用=赋值
obj.a = 1;

// 使用Object.defineProperty定义属性b
Object.defineProperty(obj, 'b',
{
    value: 2
});

console.log(obj) // {a: 1, b: 2}
```
单纯从上面的示例来看这两者似乎没有区别。但是，如果使用`Object.getOwnPropertyDescriptor()`查看`obj.a`与`obj.b`属性的**描述描述符(property descriptor)**时，会发现`=`与`Object.defineProperty`并不一样。

```
# demo2
const obj = {};

obj.a = 1;

Object.defineProperty(obj, 'b',
{
    value: 2
});

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));{value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj, 'b')); {value: 2, writable: false, enumerable: false, configurable: false}
```
可知，使用`=`赋值时，属性的属性描述符value是可以修改的，而writable、enumerable和configurable都为true。

而使用`Object.defineProperty()`定义的属性的属性描述符writable、enumerable和configurable默认值为false，但是都可以修改。

使用`=`赋值，等价于使用`Object.defineProperty()`定义时，同时将writable、enumerable和configurable设为true。demo3和demo4是等价的：

```
// demo3
const obj = {};

obj.name = "lisi";
console.log(Object.getOwnPropertyDescriptor(obj, 'name;)); // {value: "lisi", writable: true, enumerable: true, configurable: true}
```
```
// 示例4
const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: true,
    enumerable: true,
    configurable: true
});
console.log(Object.getOwnPropertyDescriptor(obj, 'name')); // {value: "lisi", writable: true, enumerable: true, configurable: true}
```
>特别注意：使用Object.defineProperty()定义时若只定义value，则writable、enumerable和configurable默认值为false。下面demo5和demo6是等价的。

```
// demo5
const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi'
});
console.log(Object.getOwnPropertyDescriptor(obj, 'name')); // {value: "lisi", writable: false, enumerable: false, configurable: false}
```
```
// demo6
const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: false,
    enumerable: false,
    configurable: false
});
console.log(Object.getOwnPropertyDescriptor(obj, 'name')); // {value: "lisi", writable: false, enumerable: false, configurable: false}
```
>还需要注意：由于writable、enumerable和configurable都是false，导致obj.name属性不能赋值、不能遍历而且不能删除。若在严格模式("use strict")下，demo7中的代码将会报错。

```
// demo7
const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi'
});

// writable为false，无法赋值
obj.name = 'wangwu';
console.log(obj.name); // lisi

// enumerable为false，无法遍历
console.log(Object.keys(obj)); // []

// configurable为false，无法删除
delete obj.name;
console.log(obj.name); // lisi
```
##### writable(为false时，属性不能再次赋值)
```
// demo8
"use strict"

const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: false,
    enumerable: true,
    configurable: true
});

obj.name = 'wangwu'; // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```
##### enumerable(为false时，属性不能遍历)
```
// demo9
"use strict"

const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: true,
    enumerable: false,
    configurable: true
});

console.log(Object.keys(obj)) // []
```
##### configurable(为false时，属性不能删除)
```
// 示例10
"use strict"
const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: true,
    enumerable: true,
    configurable: false
});

delete obj.name // Uncaught TypeError: Cannot delete property 'name' of #<Object>
```
##### writable与configurable(当writable与enumerable同时为false时，属性不能重新使用Object.defineProperty()定义，严格模式下会报错)
```
// demo11
"use strict"

const obj = {};

Object.defineProperty(obj, 'name',
{
    value: 'lisi',
    writable: false,
    configurable: false
})

Object.defineProperty(obj, 'name',
{
    value: 'wangwu'
}) // Uncaught TypeError: Cannot redefine property: name
    at Function.defineProperty (<anonymous>)
```
>特别注意：一旦把属性定义为不可配置的，就不能再把它变回可配置的了。

```
// demo12
"use strict"
const person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'lisi'
});
console.log(Object.getOwnPropertyDescriptor(person, 'name')); // {value: "lisi", writable: false, enumerable: false, configurable: false}
Object.defineProperty(person, 'name', {
    value: 'lisisi'
}); // Uncaught TypeError: Cannot redefine property: name at Function.defineProperty (<anonymous>)
```
### 参考文档
1. [Web 技术文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
2. [学习Object.defineProperty](https://www.geekjc.com/post/5a63068df6a6db2832a57367)