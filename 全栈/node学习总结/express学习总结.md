### 1. Express路由
路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这些函数将被执行。

路由的定义由如下结构组成：`app.METHOD(PATH, HANDLER)`。其中，`app` 是一个 `express 实例`；`METHOD` 是某个 HTTP 请求方式中的一个；`PATH` 是服务器端的路径；`HANDLER` 是当路由匹配到时需要执行的函数。

### 2. Express 托管静态文件
通过 Express 内置的 `express.static` 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将**静态资源文件所在的目录**作为参数传递给 `express.static` 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```
app.use(express.static('public'));
```
现在，public 目录下面的文件就可以访问了。

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```
### 3. 使用中间件
中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

1. 执行任何代码。
2. 修改请求和响应对象。
3. 终结请求-响应循环。
4. 调用堆栈中的下一个中间件。


如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
### 4. 在 Express 中使用模板引擎
```
views, 放模板文件的目录，比如： app.set('views', './views')
view engine, 模板引擎，比如： app.set('view engine', 'jade')
```

### 参考文档
1. [Express使用手记：核心入门](https://juejin.im/post/5902973eb123db3ee46a0107)
2. 