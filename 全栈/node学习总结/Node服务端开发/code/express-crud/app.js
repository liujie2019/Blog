const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const template = require('art-template');

const app = express();

template.defaults.imports.formatUTC = function (UTCDateString) {
    if (!UTCDateString) {
        return '-';
    }
    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }
    var date = new Date(UTCDateString); // 这步是关键
    var year = date.getFullYear();
    var mon = formatFunc(date.getMonth() + 1);
    var day = formatFunc(date.getDate());
    var hour = date.getHours();
    // var noon = hour >= 12 ? 'PM' : 'AM';
    // hour = hour >=12 ? hour-12 : hour;
    hour = formatFunc(hour);
    var min = formatFunc(date.getMinutes());
    var s = formatFunc(date.getSeconds());
    var dateStr = year + '-' + mon + '-' + day + ' '+ hour + ':'+ min + ':' + s;
    return dateStr;
}
// 指定静态资源加载路径
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/static', express.static(__dirname + '/static'));

// 指定模板引擎
app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 将路由挂载到app服务上，一般挂载路由放在最后
app.use(router);
// 404错误处理
app.use((req, res, next) => {
    res.status(404).render('404.html');
});
// 配置一个全局错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).json({
      err_code: 500,
      message: err.message
    });
});

app.listen(8088, () => {
    console.log('app listening on port 8088!');
});