# body-parser学习总结

## 目录
  1. [async和await](#async和await)
  2.
  3.

## async和await

**[⬆ 返回顶部](#async学习总结)**

body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。

body-parser中间件用于解析客户端请求的body中的内容，内部使用JSON编码处理、url编码处理以及对于文件的上传处理。
### 1. 具体使用
#### 1.1 安装body-parser
```
npm install body-parser -S
```
#### 1.2 基本使用
```js
const express = require('express');
// 获取模块
const bodyParser = require('body-parser');
const app = express();

// 创建 application/json 解析
const jsonParser = bodyParser.json();

// 创建 application/x-www-form-urlencoded解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login 获取 URL编码的请求体
app.post('/login', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users 获取 JSON 编码的请求体
app.post('/api/users', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
});
app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('当前应用访问地址为: http://%s:%s', host, port);
});
```
>特别说明：bodyParser变量是对中间件的引用。请求体解析后，解析值都会被放到req.body属性中，内容为空时是一个{}空对象。

#### 1.3 相关API
对请求体的四种解析方式:

1. bodyParser.json(options): 解析json数据；
2. bodyParser.raw(options): 解析二进制格式(Buffer流数据)；
3. bodyParser.text(options): 解析文本数据；
4. bodyParser.urlencoded(options): 解析UTF-8的编码的数据。

##### 1.3.1 bodyParser.json(options)：返回一个仅解析json格式数据的中间件。
option可选对象:

1. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
2. limit - 设置请求的最大数据量。默认为'100kb'
3. reviver - 传递给JSON.parse()方法的第二个参数，详见JSON.parse()
4. strict - 设置为true时，仅会解析Array和Object两种格式；设置为false会解析所有JSON.parse支持的格式。默认为true
5. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/json。
6. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持。

##### 1.3.2 bodyParser.raw(options)：返回一个将所有数据做为Buffer格式处理的中间件.其后的所有的req.body中将会是一个Buffer值。
option可选值:

1. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
2. limit - 设置请求的最大数据量。默认为'100kb'
3. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
4. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持。

##### 1.3.3 bodyParser.text(options) 解析文本格式：返回一个仅处理字符串格式处理的中间件。其后的所有的req.body中将会是一个字符串值。

1. defaultCharset - 如果Content-Type后没有指定编码时，使用此编码。默认为'utf-8'
2. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
3. limit - 设置请求的最大数据量。默认为'100kb'
4. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
5. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持。

##### 1.3.4 bodyParser.urlencoded(options) 解析UTF-8的编码的数据。返回一个处理urlencoded数据的中间件。

option可选值：

1. extended - 当设置为false时，会使用querystring库解析URL编码的数据；当设置为true时，会使用qs库解析URL编码的数据。后没有指定编码时，使用此编码。默认为true。
2. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
3. limit - 设置请求的最大数据量。默认为'100kb'
4. parameterLimit - 用于设置URL编码值的最大数据。默认为1000
5. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
6. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持

### 2. 数据的编码方式
在Form元素的语法中，EncType表明提交数据的格式 用 Enctype 属性指定将数据回发到服务器时浏览器使用的编码类型。 例如： application/x-www-form-urlencoded： 窗体数据被编码为名称/值对。这是标准的编码格式。 multipart/form-data： 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分，这个一般文件上传时用。 text/plain： 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。
#### 表单
form的enctype属性为编码方式，常用有以下两种：

* application/x-www-form-urlencoded
* multipart/form-data(上传文件时用)

当action为get时候，浏览器用`application/x-www-form-urlencoded`的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url。

当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的`application/x-www-form-urlencoded`就可以了。 但是如果有type=file的话，就要用到`multipart/form-data`了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。

每一段------WebKitFormBoundaryh2rFWhmmPZSuKvgf--为对应一部分消息

enctype="multipart/form-data"是上传二进制数据;它告诉我们传输的数据要用到多媒体传输协议，由于多媒体传输的都是大量的数据，所以规定上传文件必须是post方法，`<input>`的type属性必须是file。form里面的input的值以2进制的方式传过去，所以request就得不到值了。request.getParameter("title")是得不到值的，必须把数据再换为String的。

### POST请求相关内容
HTTP 协议是以 ASCII 码传输，建立在 TCP/IP 协议之上的应用层规范。规范把 HTTP 请求分为三个部分：状态行、请求头、消息主体。HTTP/1.1 协议规定的 HTTP 请求方法有 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT 这几种。

协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。
POST 提交数据时，包含了 Content-Type 和消息主体编码方式两部分。因为服务器端通常会依据Content-Type来决定使用何种方式解析主体部分。

Content-Type常见的四种方式:

1. application/x-www-form-urlencoded: 提交的数据按照key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。
2. multipart/form-data: 使用表单上传文件时，必须让 <form> 表单的 enctype 等于 multipart/form-data；
3. application/json: 用来告诉服务端消息主体是序列化后的 JSON 字符串；
4. text/xml: 它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。


其中application/x-www-form-urlencoded编码其实是基于uri的percent-encoding编码的，所以采用application/x-www-form-urlencoded的POST数据和queryString只是形式不同，本质都是传递参数。

### 参考文档
1. [Nodejs 进阶：Express 常用中间件 body-parser 实现解析](https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html)
2. [body-parser](https://github.com/expressjs/body-parser/)
3. [nodejs-learning-guide](https://github.com/chyingp/nodejs-learning-guide)
4. [Express 中间件----body-parser](https://www.jianshu.com/p/ea0122ad1ac0)
5. [关于Content-Type中application/x-www-form-urlencoded 和 multipart/form-data的区别及用法](https://www.cnblogs.com/kaibin/p/6635134.html)
6. [四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html#simple_thread)