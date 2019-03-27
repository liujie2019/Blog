### 1. req.params
```
第一种情况：http://localhost:3000/demo/test，服务端代码这样写：

router.get('/demo/:anything', function (req, res) {
res.send('anything is : ' + req.params.anything);
})//这里的anything指的是你可以任意命名，以便使用req.params.XX获取参数

在浏览器输入请求路径后页面返回：anything is : test
 ```
### 2. req.query
```
第二种情况：http://localhost:3000/?id=1,用req.query.id,我们会得到 1，如果有两个或以上参数，用 & 连接，如：/?id=1&name=test,
获取参数则是：req.query.id --> 1 , req.query.name - -> test 
```
### 3. req.body
```
第三种情况：用Post方法向node服务器发送数据 id = 1，post('/login', {name: lisi})，node端获取参数则应该是：req.body.name
```

### 参考文档
1. [Express 4.x API 中文手册](http://www.expressjs.com.cn/4x/api.html#req.query)