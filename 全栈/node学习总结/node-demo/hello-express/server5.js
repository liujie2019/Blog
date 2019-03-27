// 模板引擎使用
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const app = express();

// 模板文件所在目录
app.set('views', './views');
// 设置模板引擎为ejs
app.set('view engine', 'ejs');

const createFolder = (folder) => {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

const uploadFolder = './upload/';

createFolder(uploadFolder);

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
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.get('/form/:name', function(req, res) {
    var person = req.params.name;
    res.render('form', { person: person });
});

app.post('/', urlencodedParser, function(req, res) {
    console.dir(req.body);
    res.send(req.body.name);
});

app.post('/upload', upload.single('logo'), function(req, res) {
    console.dir(req.file);
    res.send({ 'ret_code': 0 });
});

app.get('/profile/:id/user/:name', function(req, res) {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', function(req, res) {
    res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');