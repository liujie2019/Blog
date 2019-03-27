// 文件上传
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: 'uploads/'}).array('image'));

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/file_upload', (req, res) => {
    console.log(req.files[0]); // 上传的文件信息
    const des_file = __dirname + '/' + req.files[0].originalname;
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('当前应用访问地址为: http://%s:%s', host, port);
});