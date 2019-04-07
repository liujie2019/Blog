1. 一个Promise必须处在其中之一的状态：pending, fulfilled 或 rejected，pending可以向后两种状态转移，而后两种状态是稳定的，进入之后就永远不会变更，并且会带有一个状态值。
2. 规范引入一种叫Promise解析过程的抽象过程，标记为[[Resolve]](promise, x)，其详细计算的过程可以参照规范原文，通过引入这个过程，可以将一些非标准的类Promise接口，对象和函数最终规范成一个标准的Promise。
3. 通过利用Promise解析过程，then()函数总是能返回一个Promise。
4. then()函数的两个参数如果不是函数，会导致then()函数返回一个与之前promise相同状态的promise

>相关基本原则：
1. 当你通过new Promise(function (resolve, reject){})的标准形式定义一个Promise时，构造用到的这个函数就已经在被执行了。
2. 一个函数在没有返回值时，会默认返回undefined。