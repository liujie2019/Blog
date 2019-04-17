const fs = require('fs');
const url = require('url');
let index = 0;

function getUrlInfo(urlStr, success) {
    const urlObj = url.parse(urlStr);
    let http = null;
    if(urlObj.protocol === 'http:') {
        http = require('http');
    }
    else {
        http = require('https');
    }

    let req = http.request({
        'hostname': urlObj.hostname,
        'path': urlObj.path
    }, res => {
        index++;
        if (res.statusCode === 200) {
            let arr = [];
            let str = '';
            res.on('data', buffer => {
                arr.push(buffer);
                str += buffer;
            });
            res.on('end', () => {
                let b = Buffer.concat(arr);
                success && success(b, str);
            });
        }
        else if (res.statusCode === 301 || res.statusCode === 302) {
            console.log(`第${index}次重定向`, res.headers.location);
            getUrlInfo(res.headers.location, success);
        }
    });
    req.end();
}

getUrlInfo('https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.4f085cb2Ocqmu7&id=568538839787&skuId=3799585218092&standard=1&user_id=1115488308&cat_id=2&is_b=1&rn=8b78aa3a48ddf7d04cbdcca85e46e86c',
    (data, str) => console.log('1')
);