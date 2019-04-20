#### 中间件原理(洋葱模型)
>本质上是：函数压栈和出栈。
```js
function a() {
    console.log(1);
    b(); // 函数b进栈，函数a将执行权交给函数b
    console.log(2); // 函数a执行完毕出栈
}
function b() {
    console.log(3);
    c(); // 函数c进栈，函数b将执行权交给函数c
    console.log(4); // 函数b执行完毕出栈，将执行权返还给函数a
}
function c() {
    console.log(5); // 函数c执行完毕出栈，将执行权返还给函数b
}
a(); // 函数a进栈
```
![80047c3987b099847ec88579dff16bb8.png](evernotecid://AC85336C-B325-443E-8ED7-E6554790A944/appyinxiangcom/10797539/ENResource/p271)

>`koa`是从第一个中间件开始执行，遇到`next`进入下一个中间件，一直执行到最后一个中间件，再逆序向上执行上一个中间件`next`之后的代码，一直到第一个中间件执行结束才发出响应。
```js
const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
    console.log(1);
    next(); // 中间件1暂停执行，并将执行权交给中间件2
    console.log(2); // 中间件1继续执行
});
// 中间件2
app.use(async (ctx, next) => {
    console.log(3);
    next(); // 中间件2暂停执行，并将执行权交给中间件3
    console.log(4); // 中间件2继续执行，并将执行权返还给中间件1
});
// 中间件3
app.use(async (ctx, next) => {
    console.log(5);
    next(); // 中间件3暂停执行
    console.log(6); // 因为没有后续中间件，中间件3继续执行，并将执行权返还给中间件2
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});
```
![bdef580371153dbb754c9d7a667502af.png](evernotecid://AC85336C-B325-443E-8ED7-E6554790A944/appyinxiangcom/10797539/ENResource/p272)
>上述代码的执行结果：是一个洋葱模型结构，从上往下一层一层进来，再从下往上一层一层回去。这其实就是Koa中间件的原理，为了解决复杂应用中频繁的回调而设计的级联代码，并不直接把控制权完全交给下一个中间件，而是碰到next就去执行下一个中间件，等下面中间件都执行完了，还会执行之前中间件中next以下的代码。

#### koa2的中间件实现
>use：

```js
const app = new Koa();
app.use(logger);
```
>middleware：

koa实例对象app包含了一个数组属性middleware，通过use方法，将中间件push到数组中，源码如下：
```js
use(fn) {
 if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
 deprecate('Support for generators will been removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x');
         fn = convert(fn);
 }
 debug('use %s', fn._name || fn.name || '-');
 this.middleware.push(fn); return this;
}
```
>从源码来看，koa2为了兼容koa1时中间件是generators函数所以使用了`convert`中间件将`generators`包装成一个`Promise`。

>callback：当执行`app.listen`方法开启服务器时，实际上是在内部，使用`http`模块，启动了`http`服务器，并将自身的`callback`函数传入，即
```js
http.createServer(app.callback()).listen(...)
```
>所以来看下callback的源码：

```js
// koa-compose
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next //执行后fn为undefined,所以下一步将resolve()
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next ( ) {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    return (req, res) => {
      res.statusCode = 404;
      const ctx = this.createContext(req, res);
      onFinished(res, ctx.onerror);
      fn(ctx).then(() => respond(ctx)).catch(ctx.onerror);
    };
  }

const fn = compose(this.middleware);
```
compose的执行流程是将中间件数组传入，返回一个类型为`(ctx, next) =>{}`的函数。

ctx，为网络处理上下文，next指向下个中间件。内部通过dispatch函数形成了一条处理请求的流水线。

每当有请求时将执行：
```js
return (req, res) => {
      res.statusCode = 404;
      const ctx = this.createContext(req, res);//对req,res,cookies封装
      onFinished(res, ctx.onerror); //当连接结束报错时执行ctx.onerror
      fn(ctx).then(() => respond(ctx)).catch(ctx.onerror);
    };
```
首先，对状态码设置初始值404，并且通过createConext创建初始上下文。然后将上下文传入fn。

fn执行流程为，首先会执行第一个中间件，并把第下个中间件函数作参数next传入，每当执行next()将控制权交给下一个中间件，知道中间件执行结束，交还控制权，才能继续执行下一部操作，执行到最后一个中间件，因为next()为undefined，所以终止执行，promise执行resolve。

fn函数执行结束表示着，该请求已经处理好，只剩下发送给客户端了，所以接下来，将把处理好的上下文ctx传入respond执行最后的操作。

respond包含了对许多response的状态码，和body类型的判断来决定返回给客户端什么数据。
#### 参考文档

1. [理解 Koa 的中间件机制](https://cnodejs.org/topic/5aac7608f5dfc27d7ad988bd)
2. [koa中间件机制详解](https://cnodejs.org/topic/58fd8ec7523b9d0956dad945)
3. [深入理解Koa2中间件机制](https://blog.csdn.net/qq673318522/article/details/79090682)
4. [深入理解 Koa2 中间件机制](https://segmentfault.com/a/1190000012881491)
5. [Koa2 中间件原理解析 —— 看了就会写](https://segmentfault.com/a/1190000016707059)
6. [深入理解koa中间件原理](http://shirmy.me/2018/06/08/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3koa%E5%8E%9F%E7%90%86/)