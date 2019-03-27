// 文件上传
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer'); // 文件上传库

const app = express();
const createFolder = (folder) => {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

const uploadFolder = './upload/';

createFolder(uploadFolder); // 创建上传目录

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/', urlencodedParser, (req, res) => {
    console.dir(req.body);
    res.send(req.body.name);
});

app.post('/upload', upload.single('logo'), (req, res) => {
    console.dir(req.file);
    res.send({ 'ret_code': 0 });
});

app.get('/profile/:id/user/:name', (req, res) => {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', function(req, res) {
    res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');