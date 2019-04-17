const fs = require('fs');
const express = require('express');
const multer  = require('multer');

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