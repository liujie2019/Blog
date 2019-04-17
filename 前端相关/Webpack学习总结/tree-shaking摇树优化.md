### 1. tree-shaking（摇树优化）定义

`webpack 2`的到来带来的最棒的新特性之一就是tree-shaking 。tree-shaking源自于rollup.js，现如今，`webpack 2`也有类似的做法。

`webpack` 里的`tree-shaking`的到来不得不归功于`es6`规范的模块。为什么这么说，如今的前端模块规范很多，比较出流行的比如`commonJS , AMD , es6` ，我简单的说一下`commonJS和es6`模块的区别。

### 2. commonJS 模块

commonJS的模块规范在Node中发扬光大，总的来说，它的特性有这几个：

1. 动态加载模块：commonJS和es6的最大区别大概就在于此了吧，commonJS模块的动态加载能够很轻松的实现懒加载，优化用户体验。
2. 加载整个模块：commonJS模块中，导出的是整个模块。
3. 每个模块皆为对象：commonJS模块都被视作一个对象。
4. 值拷贝：commonJS的模块输出和 函数的值传递相似，都是值的拷贝

### 3. es6 模块

1. 静态解析：即在解析阶段就确定输出的模块，所以es6模块的import一般写在被引入文件的开头。
2. 模块不是对象：在es6里，每个模块并不会当做一个对象看待
3. 加载的不是整个模块：在es6模块中经常会看见一个模块中有好几个export导出
4. 模块的引用：es6模块中，导出的并不是模块的值拷贝，而是这个模块的引用

在结合es6模块和commonJS模块的区别之后，我们知道es6的特点是静态解析，而commonJS模块的特点是动态解析的，因此，借于es6模块的静态解析，tree-shaking的实现才能成为可能。

在webpack中，`tree-shaking`指的就是按需加载，即没有被引用的模块不会被打包进来，减少我们的包大小，缩小应用的加载时间，呈现给用户更佳的体验。

```js
// Tree Shaking demo
// 有个funs.js 里面有两个函数
// funs.js
export const sub = () => 'hello webpack!';
export const mul = () => 'hello shaking!';

// main.js中依赖funs.js
import {sub} from './funs.js'

sub();
```
`main.js`只使用了里面的sub函数，默认情况下也会将funs.js里面其他没有的函数也打包进来, 如果开启`tree shaking`生产编译，`funs.js`中没有被用到的代码并没打包进来，而被剔除出去了。

```js
webpack --mode production
```

### 参考文档
1. [webpack 如何优雅的使用tree-shaking（摇树优化）](http://blog.csdn.net/haodawang/article/details/77199980)