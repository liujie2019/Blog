### 1. HTTP服务器
#### 转换URL字符串和查询字符串
在NodeJS中，提供了url模块和querystring模块，分别用来转换完成URL字符串和URL中的查询字符串。
#### 发送服务器端响应流
```js
// server.js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    fs.readFile(pathname.substr(1), (err, data) => {
        if(err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        }
        // 响应文件内容
        res.write(data.toString());
        // 发送响应数据
        res.end();
    });
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});
```
```js
// server2.js
const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico') {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' //设置允许跨域
        });
        res.write('你好');
    }
    res.end();
});

server.listen(8089, () => {
    console.log('Server running at http://127.0.0.1:8089');
});
```
```js
// 在3000端口访问该html文件，形成跨域访问
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>使用ajax获取Node.js服务器数据</title>
</head>
<body>
    <button onclick="GetData()">获取数据</button>
    <div id="box"></div>
    <script>
        function GetData() {
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'http://localhost:8089/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.querySelector('#box').innerHTML = xhr.responseText;
                    }
                }
            }
            xhr.send(null);
        }
    </script>
</body>
</html>
```
### 2. HTTP客户端
### 3. 创建HTTPS服务器和客户端
* 创建私钥：使用openssl工具创建私钥(mac自带openssl工具)

```
openssl genrsa -out privatekey.pem 1024
```

* 创建证书签名请求(Certificate Signing Request)文件

```
openssl req -new -key privatekey.pem -out certrequest.csr
```
```js
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:china
Locality Name (eg, city) []:beijing
Organization Name (eg, company) [Internet Widgits Pty Ltd]:airway
Organizational Unit Name (eg, section) []:airway
Common Name (e.g. server FQDN or YOUR name) []:airway
Email Address []:709394597@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

* 获取证书：证书应该是一个经过证书授证中心签名的文件，该证书文件包含了服务器端提供的公钥以及证书的颁发机构等信息，可以使用openssl工具创建一个学习或测试用的证书，命令如下：

```
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

>x509参数表示该证书符合国际电信联盟指定的数字证书标准。

* 创建pfx文件

```
openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx
```
#### demo(https)
```js
const https = require('https');
const fs = require('fs');
const pk = fs.readFileSync('./privatekey.pem');
const pc = fs.readFileSync('./certificate.pem');

const opts = {
    key: pk,
    cert: pc
};
const server = https.createServer(opts, (req, res) => {
    console.log(req.url);
    if(req.url !== '/favicon.ico') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><meta charset="utf-8"/></head>');
        res.write('你好, https');
        res.end();
    }
});

server.listen(443, 'localhost', () => {
    console.log('https服务器端开始监听！');
});
```
>MAC查看端口占用情况：命令 lsof -i tcp:port  （port替换成端口号，比如6379）可以查看该端口被什么程序占用，并显示PID，方便KILL。

### from表单的enctype
`enctype`属性规定在发送到服务器之前应该如何对表单数据进行编码。

默认地，表单数据会编码为`"application/x-www-form-urlencoded"`。就是说，在发送到服务器之前，所有字符都会进行编码（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）。

通常有以下三个值：

* application/x-www-form-urlencoded：在发送前编码所有字符（默认）
* multipart/form-data：不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
* text/plain：空格转换为 "+" 加号，但不对特殊字符编码。

### demo
```js
// router.js
function route(pathname) {
   console.log("About to route a request for " + pathname);
}

exports.route = route;
```
```js
// server.js
const http = require('http');
const url = require('url');

function start() {
    function onRequest(req, res) {
        console.log(req.url);
        console.log(url.parse(req.url));
        const pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello express');
        res.end();
    }
    http.createServer(onRequest).listen(8089, () => {
        console.log('Server has started.');
    });
}
exports.start = start;
```
```js
// index.js
const server = require('./server');
const router = require('./router');

server.start(router.route);
```
```
console.log(req.url); 输出：/book?name=lisi
console.log(url.parse(req.url)); // 输出对象Url
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=lisi',
  query: 'name=lisi',
  pathname: '/book',
  path: '/book?name=lisi',
  href: '/book?name=lisi'
}
```

### 参考文档
1. [Express 4.x API 中文手册](http://www.expressjs.com.cn/4x/api.html#req.query)