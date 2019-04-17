Multer是Express官方推出的，用于Node.js `multipart/form-data`请求数据处理的中间件。

>注意：Multer基于busboy构建，可以高效的处理文件上传，但并不处理multipart/form-data之外的用户请求。

### 具体使用
Multer在解析完请求体后，会向Request对象中添加一个body对象和一个file或files对象（上传多个文件时使用files对象 ）。其中，body对象中包含所提交表单中的文本字段（如果有），而file(或files)对象中包含通过表单上传的文件。
#### 安装
```
npm install --save multer
```
```js
const multer  = require('multer');
const upload = multer({dest:"/upload"});
```
>Multer 接受一个 options 对象，其中最基本的是 `dest` 属性，这将告诉 Multer 将上传文件保存在哪。如果你省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘。

### demo
```js
// server.js
const fs = require('fs');
const express = require('express');
const multer  = require('multer')

const app = express();
const upload = multer({ dest: './upload' });

// 单图上传
app.post('/upload', upload.single('logo'), (req, res, next) => {
    const file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // 图片会放在upload目录并且没有后缀，需要自己转存，用到fs模块
    fs.rename(file.path, 'upload/' + file.originalname, (err) => {
        if (err) {
            throw err;
        }
        console.log('done!');
    });
    res.send({
        code: '0',
        imageName: file.originalname
    });
});

app.get('/index', (req, res, next) => {
    const form = fs.readFileSync('./index.html', {encoding: 'utf8'});
    res.send(form);
});

const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('当前应用访问地址为: http://%s:%s', host, port);
});
```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <h2>单图上传</h2>
        <input type="file" name="logo" />
        <input type="submit" value="提交" />
    </form>
</body>
</html>
```

### 参考文档
1. [multer](https://github.com/expressjs/multer)
2. [Nodejs进阶：基于express+multer的文件上传](https://www.cnblogs.com/chyingp/p/express-multer-file-upload.html)
3. [express+multer实现上传图片](https://www.jianshu.com/p/1e92a86c571a)
4. [express中间件](http://www.expressjs.com.cn/guide/using-middleware.html)
5. [multer中文文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)