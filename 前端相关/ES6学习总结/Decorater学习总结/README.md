[TOC]

>修饰器对类的行为的改变，是**代码编译时**发生的，而**不是在运行时**。

#### 1. 类的修饰
>使用修饰器`Decorator`函数来修改类的行为。
```js
@testable
class myTestableClass {}

function testable(target) {
    target.isTestable = true;
}

console.log(myTestableClass.isTestable);
```
>上述代码中：`@testable`就是一个修饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。

基本上，修饰器的行为就是下面这样：
```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```
>也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。
```js
function testable(target) {
  // ...
}
```
>上面代码中，testable函数的参数target，就是会被修饰的类。

```js
@testable
class myTestableClass {

}

// 添加原型属性
function testable(target) {
    target.prototype.isTestable = 'true';
}
const obj = new myTestableClass();
console.log(obj.isTestable); // true 在实例上访问原型属性
```
```js

```

#### 参考文档
1. [ES7装饰器实用入门指南](https://mp.weixin.qq.com/s?__biz=MzIzNjcwNzA2Mw==&mid=2247485883&idx=1&sn=729d6a1ed2d44983d3a16d1af6f2b4f2&chksm=e8d28423dfa50d358ebe10672848b5954ebd3740e67734065033cd1e8e71b5c8d199cb0b00dd#rd)
2. [解决：对修饰器的实验支持是一项将在将来版本中更改的功能。设置+"experimentalDecorators"+选项以删除此警告。](https://www.jianshu.com/p/4c2bc81b75f0)
3. [http://es6.ruanyifeng.com/#docs/decorator](http://es6.ruanyifeng.com/#docs/decorator)
4. [https://blog.csdn.net/ixygj197875/article/details/79249752](https://blog.csdn.net/ixygj197875/article/details/79249752)