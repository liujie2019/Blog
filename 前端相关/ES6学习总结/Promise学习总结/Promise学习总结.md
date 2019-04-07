[TOC]

ES6中的promise的出现，很好地解决了回调地狱的问题，在使用ES5的时候，在多层嵌套回调时，写完的代码层次过多，很难进行维护和二次开发，ES6认识到了这点问题，现在promise的使用，完美解决了这个问题。

#### promise的基本用法
promise执行多步操作非常好用，多个`Promise`是有一定的顺序的，你必须保证上一步完成，才能顺利进行下一步。我们可以在脑海里先想想这样一个简单的过程在ES5写起来就要有多层的嵌套。那我们现在用promise来实现。

```js
const step1 = (resolve, reject) => {
    resolve('第一步完成');
}

const step2 = (resolve, reject) => {
    resolve('第二步完成');
}

const step3 = (resolve, reject) => {
    resolve('第三步完成');
}

new Promise(step1).then((val) => {
    console.log(val);
    return new Promise(step2);
}).then((val) => {
    console.log(val);
    return new Promise(step3);
}).then((val) => {
    console.log(val);
});
// 运行结果：
第一步完成
第二步完成
第三步完成
```

#### 微任务
`Promise`的回调函数属于异步任务，会在同步任务之后执行。但是需要注意的是：`Promise`的回调函数不是正常的异步任务，而是**微任务**（microtask）。
**微任务和正常异步任务的区别在于：** 正常的异步任务追加到下一轮事件循环，而微任务追加到本轮事件循环。这意味着：微任务的执行时间一定早于正常任务。

```js
setTimeout(() => {
   console.log(1);
}, 0);

new Promise((resolve, reject) => {
   resolve(2);
}).then((data) => {
   console.log(data);
});
console.log(3);
// 运行结果：
3
2
1
```
上面代码的输出结果是3->2->1。这说明`then`的回调函数的执行时间，早于`setTimeout(fn, 0)`。因为`then`是本轮事件循环执行，`setTimeout(fn, 0)`在下一轮事件循环开始时执行。

#### 参考文档
1. [使用 bluebird 实现更强大的 Promise](https://www.ibm.com/developerworks/cn/web/wa-lo-use-bluebird-implements-power-promise/index.html)
2. [bluebird与原生Promise对象及bluebird模块的中文API文档](https://itbilu.com/nodejs/npm/VJHw6ScNb.html#api)
3. [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
4. [从一道Promise执行顺序的题目看Promise实现](https://zhuanlan.zhihu.com/p/34421918)
5. [Promise 对象](https://wangdoc.com/javascript/async/promise.html#%E6%A6%82%E8%BF%B0)
6. [自己动手实现 ES6 Promise](https://github.com/whinc/blog/issues/2)
7. [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)
8. [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)