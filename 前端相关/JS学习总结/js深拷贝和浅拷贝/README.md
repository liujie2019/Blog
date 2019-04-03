[TOC]

JS中数据类型分为基本数据类型和引用数据类型，基本数据类型存放在栈内存，引用数据类型存放在堆内存。

堆内存用于存放由new创建的对象，栈内存存放一些基本类型的变量和对象的引用变量。

**深拷贝和浅拷贝最根本的区别在于：是否是真正获取了一个对象的复制实体，而不是引用。**

1. 深拷贝会在计算机中开辟了一块内存地址用于存放复制的对象；
2. 而浅拷贝仅仅是指向被复制的内存地址，如果原地址中对象被改变了，那么浅拷贝的对象也会相应改变。

### 1. 基本数据类型复制
```js
var a = 10;
var b = a; //将变量a的值赋值给变量b
a = 100; //变量a的改变后，不会影响到变量b
console.log(a);//100
console.log(b);//10
```

### 2. 引用数据类型复制
```js
var obj1 = {
	name: 'lisi',
	age: '22'
};
#这里只是将obj1对象的引用地址赋值给了obj2对象。导致两者都指向了同一个对象，所以其中一个发生变化也会导致另外一个变化。
var obj2 = obj1;
obj2.age = 23;
console.log(obj1.age);//23
console.log(obj2.age);//23
```

#### 2.1 数组复制
对于数组复制，ES6有新的两种方法，不会发生引用。

```js
// 方法一，使用Array.from()方法
var arr = [2, 3, 4];
var arr2 = Array.from(arr);
arr.push(5);
console.log(arr);//[2, 3, 4, 5]
console.log(arr2);//[2, 3, 4]
arr2.push(6);
console.log(arr);//[2, 3, 4, 5]
console.log(arr2);//[2, 3, 4, 6]
```
```js
// 方法二，使用扩展运算符(...)
var arr = [2, 3, 4];
var arr2 = [...arr];
arr.push(5);
console.log(arr);//[2, 3, 4, 5]
console.log(arr2);//[2, 3, 4]
arr2.push(6);
console.log(arr);//[2, 3, 4, 5]
console.log(arr2);//[2, 3, 4, 6]
```
```js
// 方法三，使用循环来复制
var arr = [2, 3, 4];
var arr2 = [];
for(let i of arr) {
	arr2.push(i);
}
arr.push(5);
arr2.push(6);
console.log(arr);//[2, 3, 4, 5]
console.log(arr2);//[2, 3, 4, 6]

// 如果是对象
var obj1 = {
	name: 'lisi',
	age: 22
};
var obj2 = {};
for(let key in obj1) {
	obj2[key] = obj1[key];
}
console.log(JSON.stringify(obj1));//{"name":"lisi","age":22}
console.log(JSON.stringify(obj2));//{"name":"lisi","age":22}
obj1.job = 'worker';
obj2.job = 'teacher';
console.log(JSON.stringify(obj1));//{"name":"lisi","age":22,"job":"worker"}
console.log(JSON.stringify(obj2));//{"name":"lisi","age":22,"job":"teacher"}
```
```js
// 上述方法也可以用来接收函数参数
function show(...arr){  //直接复制arguments这个伪数组，让它变成真正的数组，从而拥有数组的方法。
  console.log(arr); //[1, 2, 3, 4]
  arr.push(5);
  console.log(arr); //[1, 2, 3, 4, 5]
}
show(1,2,3,4);
```
### 3. 浅拷贝
所谓的浅拷贝是：只拷贝了基本类型的数据，而对于引用类型的数据，复制后也是会发生引用。

```js
var obj1 = {
	name: 'lisi',
	arr: [1, 2, 3]
}
function copy(obj1) {
	var obj2 = {};
	for(let key in obj1) {
		obj2[key] = obj1[key];
	}
	return obj2;
}
var obj2 = copy(obj1);
obj2.arr.push(4);
console.log(obj1.arr);//[1, 2, 3, 4]
console.log(obj2.arr);//[1, 2, 3, 4]
```
### 4. 深拷贝
深拷贝采用递归的方式去拷贝对象，来解决浅拷贝的弊端。

```js
var obj1={
	"name": "lisi",
	"age": 18,
	"job": "worker",
	"arr1": [1,2,3,4,5],
	"arr2":[{"name":"wangwu", "age": 22, "job": "teacher"},	{"name":"zhaoliu", "age": 22, "job": "student"}
	]};
var obj2={};
function copy(obj1, obj2) {
	var obj2 = obj2 || {};//给obj2一个初始值=它自己或者是一个空对象
	for(let key in obj1) {
		if(typeof obj1[key] === 'object') {//先判断obj1[key]是否是对象
			obj2[key] = (obj1[key].constructor === Array) ? [] : {};
			copy(obj1[key], obj2[key]);//循环调用复制函数
		}
		else {
			obj2[key] = obj1[key];//obj1[key]不是对象则直接复制
		}
	}
	return obj2;
}

obj2 = copy(obj1, obj2);
obj2.arr1.push(6);

console.log(obj2.arr1);
console.log(obj1.arr1);
```
### 参考文档
1. [js中对象的复制，浅复制（浅拷贝）和深复制（深拷贝）](https://www.jianshu.com/p/0d7bd31ccf43)
2. [浅谈js中的浅拷贝和深拷贝](https://www.cnblogs.com/MECN/p/6606119.html)
3. [javascript中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215)
4. [React 数据为什么要使用immutable方式？浅复制与深复制思考](https://segmentfault.com/a/1190000006729489)