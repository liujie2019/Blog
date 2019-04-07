[TOC]

ES6模块的设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块都只能在**运行时**确定这些东西。比如，**CommonJS模块就是对象**，输入时必须查找对象属性。

### 1. CommonJS模块加载

#### 1.1 原理
CommonJS的一个模块就是一个脚本文件。require命令第一次加载该脚本就会执行整个脚本，然后在内存中生成一个对象。
```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```
以上代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再**从这个对象上面读取3个方法**。这种加载称为“**运行时加载**”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
#### ES6模块加载
ES6模块不是对象，而是通过**export命令显式指定输出的代码**，输入时也采用**静态命令**的形式。
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
以上代码的实质是**从fs模块加载3个方法，其他方法不加载**。这种加载称为“**编译时加载**”，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。
当然，这也导致了没法引用ES6模块本身，因为它不是对象。

由于ES6模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6模块还有以下好处：

 - 不再需要UMD模块格式，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点。
 - 将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者navigator对象的属性。
 - 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

### export命令
模块功能主要由两个命令构成：export和import。**export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。**
**一个模块就是一个独立的文件**。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
**demo:**
```
var name = "lisi";
var age = 23;
var job = "worker";
//这里在export命令后面使用大括号指定了所要输出的一组变量
export {name,age,job};
```
### import命令
import命令**接受一个对象**（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块(test.js)对外接口的名称相同。
**demo:**
```
//这里表示加载test.js文件，并从中输入变量
import {name,age,job} from './test.js';
```
**注意:**import命令具有提升效果，会提升到整个模块的头部首先执行。
### 模块的整体加载
除了指定加载某个输出值，还可以使用**整体加载**，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

### ES6模块加载的实质
ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个**值的拷贝**，而ES6模块输出的是**值的引用**。
**CommonJS模块输出的是被输出值的拷贝**，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
### CommonJS模块加载
**demo:**
**test.js**
```js
var num = 1;
function counter(){
	num++;
}
module.exports = {
	num:num,
	counter:counter,
};
```
**main.js**
```
var num = require('./test.js').num;
var counter = require('./test.js').counter;
console.log(num);
counter();
console.log(num);
```
![这里写图片描述](http://img.blog.csdn.net/20160817141212679)
上图是运行的结果，num输出以后，test.js模块内部的变化就影响不到num了。

### ES6模块加载
ES6模块的运行机制与CommonJS不一样，它**遇到模块加载命令import时不会去执行模块，只会生成一个动态的只读引用**。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，**ES6模块是动态引用，并且不会缓存值**，模块里面的变量绑定其所在的模块。
**Demo:**
浏览器使用ES6模块的语法如下。
```html
<script type="module" src="foo.js"></script>
```
上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个ES6模块。

Node的默认模块格式是CommonJS，目前还没决定怎么支持ES6模块。所以，只能通过Babel这样的转码器，在Node里面使用ES6模块。

用法
export
优先考虑这种写法而不是一个一个的export
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};
```
提供对外接口必须在接口名与模块内部变量之间保持一一对应关系

```js
// 报错
function f() {}
export f;
// 正确
export function f() {};
// 正确
function f() {}
export {f};
```
最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
import
使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
```js
// main.js
import {firstName, lastName, year} from './profile';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
上面代码的import命令，就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
```js
import { lastName as surname } from './profile';
```
注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
### ES6模块加载的实质
ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。
ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。