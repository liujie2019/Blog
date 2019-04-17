const http = require('http');
const url = 'http://www.imooc.com/learn/75';

http.get(url, function(res) {
    let html = '';
    res.on('data', function(data) {
        html += data;
    });
    res.on('end', function() {
        console.log(html);
    });
}).on('error', function() {
    console.log('获取课程数据出错');
});