[TOC]
### 1. 函数柯里化(curry)
所谓"函数柯里化"，就是把一个多参数的函数，转化为单参数函数。

在很多文章中写到：柯里化通常也称部分求值，其含义是给函数分步传递参数，每次传递参数后部分应用参数，并返回一个更具体的函数接受剩下的参数，这中间可嵌套多层这样的接受部分参数函数，直至返回最后结果。

```js
// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}

addX(2)(1) // 3
```
有了函数柯里化以后，我们就能做到，所有函数只接受一个参数。
### 2. 函数消抖(debounce)

### 3. 函数节流(throttle)

### 参考文档
1. [JS魔法堂：函数节流（throttle）与函数去抖（debounce）](https://www.cnblogs.com/fsjohnhuang/p/4147810.html)
2. [浅谈javascript的函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)
3. [从一道面试题谈谈函数柯里化(Currying)](http://cnodejs.org/topic/5884574e250bf4e2390e9e99)
4. [JS中的柯里化(currying)](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
5. [函数柯里化小结](https://www.jianshu.com/p/f88a5175e7a2)
6. [数组扁平化，柯里化，防抖，节流，对象拷贝](https://juejin.im/entry/5ad006556fb9a028ba1fe102)
