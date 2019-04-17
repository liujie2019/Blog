const http = require('http');
const fs = require('fs');
const path = require('path');

http.get('http://www.itsource.cn/', function(res) {
    let content = '';
    res.on('data', function(str) {
        content += str;
    });

    res.on('end', function() {
        // console.log(content);
        const reg=/src=(.*?\.jpg)/img;
        const data = content.match(reg);
        // let filename = reg.exec(content);
        // console.log(data[0].substr(5));
        for(let i of data) {
            getImage(i.substr(5));
        }
    });
});

function getImage(url) {
    // 获取图片文件名
    const imageName = path.parse(url).base;
    const stream1 = fs.createWriteStream('./images/' + imageName);
    if (path.parse(url).root.length === 0) {
        url = '/' + url;
    }
    // 最终的url
    url = 'http://www.itsource.cn' + url;
    // 向服务器发送请求
    http.get(url, function(res) {
        res.pipe(stream1);
        console.log(imageName + ' 下载完成');
    });
}