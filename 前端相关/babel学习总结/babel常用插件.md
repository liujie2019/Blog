### 1. babel-plugin-transform-object-rest-spread
#### Rest Properties
```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```
#### Spread Properties
```
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```
#### Installation
```
npm install --save-dev babel-plugin-transform-object-rest-spread
```
#### .babelrc
```
{
  "plugins": ["transform-object-rest-spread"]
}
```
### 2. babel-plugin-transform-runtime
babel-plugin-transform-runtime 插件做了以下三件事：

* 当使用 generators/async 函数时，自动引入 babel-runtime/regenerator （使用 regenerator 运行时而不会污染当前环境）；
* 自动引入 babel-runtime/core-js 并映射 ES6 静态方法和内置插件（实现polyfill的功能且无全局污染，但是实例方法无法正常使用，如   "foobar".includes("foo") ）；
* 移除内联的 Babel helper 并使用模块 babel-runtime/helpers 代替（提取babel转换语法的代码）。

### 3. babel-plugin-transform-decorators-legacy(支持装饰器语法)

### 参考文档
1. [babel-plugin-transform-object-rest-spread](http://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread/)