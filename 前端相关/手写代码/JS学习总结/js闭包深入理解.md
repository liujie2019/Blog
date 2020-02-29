### 1. 闭包
闭包是函数和声明该函数的词法环境的组合。个人理解闭包就是在函数中嵌套了另外一个函数，并将嵌套的函数通过return语句返回，这个嵌套的函数就形成了闭包，我们在函数外边通过这个闭包来访问函数中的变量和函数。
#### 1.1 词法作用域
```
function init() {
    let name = "lisi"; // name 是一个被 init 创建的局部变量
    function sayName() { // sayName() 是内部函数,一个闭包
        console.log(name); // 使用了父函数中声明的变量
    }
    sayName();
}
init();
```
`init()`函数创建了一个局部变量 `name` 和一个名为 `sayName()` 的函数。`sayName()` 是定义在 `init()` 里的内部函数，仅在该函数体内可用。`sayName()` 内没有自己的局部变量，然而它可以访问到外部函数的变量，所以 `sayName()` 可以使用父函数 `init()` 中声明的变量 `name` 。但是，如果有同名变量 `name` 在 `sayName()` 中被定义，则会使用的 `sayName()` 中定义的 `name` 。

通过上述代码，我们可以发现 `sayName()` 函数成功的访问了在其父函数中声明的 `name` 变量的值。这个词法作用域的例子介绍了引擎是如何解析函数嵌套中的变量的。词法作用域中使用的域，是变量在代码中声明的位置所决定的。嵌套的函数可以访问在其外部声明的变量。简而言之就是：内部函数可以访问外部函数中定义的变量，而外部函数不能访问内部函数中定义的变量。
#### 1.2 手动撸一个闭包
```
function makeFunc() {
    let name = "lisi";
    function sayName() {
        console.log(name);
    }
    return sayName;
}

let myFn = makeFunc();
myFn();
```
第一眼看上去，也许不能直观的看出这段代码能够正常运行。在一些编程语言中，**函数中的局部变量仅在函数的执行期间可用。**一旦 `makeFunc()` 执行完毕，我们会认为 `name` 变量将不能被访问。然而，上述代码是可以正常运行的，所以很显然在 `JavaScript` 中并不是这样的。

上述情况在`JavaScript`中会形成闭包。 **闭包是由函数以及创建该函数的词法环境组合而成。**这个环境包含了这个闭包创建时所能访问的所有局部变量。在上述的例子中，`myFn` 是执行 `makeFunc` 时创建的 `sayName` 函数实例的引用，而 `sayName` 实例仍可访问其词法作用域中的变量，即可以访问到 `name` 。由此，当 `myFn` 被调用时，`name` 仍可被访问，其值 `lisi` 就被传递到`console.log`中。
### 2. 闭包demo
#### 2.1 每一个调用函数都会创建不同的闭包
```
function makeClosure(arr) {
  let array = arr;
  return function(num) {
    array.push(num);
    console.log(`array:${array}`);
  }
}
let myClosure = makeClosure([1,2]);
let yourClosure = makeClosure([4,5]);
myClosure(3); // array:1,2,3
yourClosure(6); // array:4,5,6
```

myClosure 和 yourClosure 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 myClosure 的环境中，array 为 [1,2]。而在 yourClosure 中，array 则为 [4,5]。
#### 2.2 实用的闭包
闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。

在 Web 中，你想要这样做的情况特别常见。大部分我们所写的 JavaScript 代码都是基于事件的 — 定义某种行为，然后将其添加到用户触发的事件之上（比如点击或者按键）。我们的代码通常作为回调：为响应事件而执行的函数。

假如，我们想在页面上添加一些可以调整字号的按钮。一种方法是以像素为单位指定 body 元素的 font-size，然后通过相对的 em 单位设置页面中其它元素（例如header）的字号：

```
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.2em;
}
```
我们的文本尺寸调整按钮可以修改 body 元素的 font-size 属性，由于我们使用相对单位，页面中的其它元素也会相应地调整。

**下面是 JavaScript：**

```
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```

size12，size14 和 size16 三个函数将分别把 body 文本调整为 12，14，16 像素。我们可以将它们分别添加到按钮的点击事件上。如下所示：

```
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```
```
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```
#### 2.3 用闭包模拟私有方法
编程语言中，比如 Java，是支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。

而 JavaScript 没有这种原生支持，但我们可以使用闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。

下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。

```
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); //0
Counter.increment();
Counter.increment();
console.log(Counter.value()); //2
Counter.decrement();
console.log(Counter.value()); //1
```
在上述的代码中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：Counter.increment，Counter.decrement 和 Counter.value。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 privateCounter 变量和 changeBy 函数。

你应该注意到我们定义了一个匿名函数，用于创建一个计数器。我们立即执行了这个匿名函数，并将他的值赋给了变量Counter。我们可以把这个函数储存在另外一个变量makeCounter中，并用他来创建多个计数器。具体代码如下所示：

```
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); //0
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); //2
Counter1.decrement();
console.log(Counter1.value()); //1
console.log(Counter2.value()); //0
```
请注意两个计数器 counter1 和 counter2 是如何维护它们各自的独立性的。每个闭包都是引用自己词法作用域内的变量 privateCounter 。

每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。

以这种方式使用闭包，提供了许多与面向对象编程相关的好处，特别是数据隐藏和封装。
#### 2.4 闭包并不是一定需要 return 某个函数

```
let say;
function sayHello(name) {
  let str = `Hello,${name}`;
  say = function() {
    console.log(str);
  }
}
let myHello = sayHello('lisi');
say(); // Hello,lisi
```
在上述例子中，say和声明它的词法环境其实也形成了一个闭包，在它的作用域里面持有了 sayHello 这个函数里面定义的 str 变量的引用，因此也能在 str 变量定义的作用域之外访问它。

但是在 JS 里面，最常用的形成闭包的方式便是在一个函数里面嵌套另一个函数，另一个函数持有父作用域里面定义的变量。
#### 2.5 一个常见错误:循环中创建闭包
```
<body>
    <p id="help">Helpful notes will appear here</p>
    <p>E-mail: <input type="text" id="email" name="email"></p>
    <p>Name: <input type="text" id="name" name="name"></p>
    <p>Age: <input type="text" id="age" name="age"></p>
    <script>
        function showHelp(help) {
		  document.getElementById('help').innerHTML = help;
		}

		function setupHelp() {
		  var helpText = [
		      {'id': 'email', 'help': 'Your e-mail address'},
		      {'id': 'name', 'help': 'Your full name'},
		      {'id': 'age', 'help': 'Your age (you must be over 16)'}
		    ];

		  for (var i = 0; i < helpText.length; i++) {
		    var item = helpText[i];
		    document.getElementById(item.id).onfocus = function() {
		      showHelp(item.help);
		    }
		  }
		}

		setupHelp();
    </script>
</body>
```
数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的input 的 ID。通过循环这三项定义，依次为相应input添加了一个 onfocus  事件处理函数，以便显示帮助信息。

但是，上面这种写法是有问题的，运行这段代码后，会发现它没有达到想要的效果。无论焦点在哪个input上，显示的都是关于年龄的信息。

原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。当onfocus的回调执行时，item.help的值被决定。由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。

**解决这个问题的一种方案是使用更多的闭包：特别是使用一下的函数工厂：**

```
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    };
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }
}
setupHelp();
```
这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的词法环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

**另一种解决方法是使用匿名闭包：**

```
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 马上把当前循环项的item与事件回调相关联起来
  }
}

setupHelp();
```

**避免使用过多的闭包，可以用let关键词(推荐使用)：**

```
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i]; //使用let
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```

### 参考文档
1. [JavaScript作用域和闭包](http://www.zcfy.cc/article/javascript-scope-and-closures-css-tricks-4107.html)
2. [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
3. [闭包和引用](http://bonsaiden.github.io/JavaScript-Garden/zh/#function.closures)
4. [维基百科-闭包 (计算机科学)](https://zh.wikipedia.org/w/index.php?title=%E9%97%AD%E5%8C%85_%28%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%29&variant=zh-cn)
5. [闭包的概念、形式与应用](https://www.ibm.com/developerworks/cn/linux/l-cn-closure/)
6. [汤姆大叔的博客-深入理解JavaScript系列（16）：闭包（Closures）](http://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html)