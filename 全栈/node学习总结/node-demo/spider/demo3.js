const fs = require('fs');
const url = require('url');

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
        let arr = [];
        res.on('data', buffer => {
            arr.push(buffer);
        });
        res.on('end', () => {
            let b = Buffer.concat(arr);
            success && success(b);
        });
    });
    req.end();
}

getUrlInfo('http://f.hiphotos.baidu.com/image/pic/item/b3119313b07eca8030b90a7c9d2397dda04483e8.jpg',
    data => fs.writeFile('demo3.jpg', data, () => {
        console.log('抓取成功了');
}));

// let req = http.request({
//     // 'hostname': 'nodejs.cn', // 注意不需要加http://
//     // 'path': '/download/'
//     'hostname': 'f.hiphotos.baidu.com',
//     'path': '/image/pic/item/b3119313b07eca8030b90a7c9d2397dda04483e8.jpg'
// }, res => {
//     let arr = [];
//     let str = '';
//     res.on('data', buffer => {
//         arr.push(buffer);
//         str += buffer;
//     });
//     res.on('end', () => {
//         console.log(Buffer);
//         let b = Buffer.concat(arr);
//         fs.writeFile('demo.jpg', b, () => {
//             console.log('抓取成功了');
//         });
//         // fs.writeFile('downLoad.html', arr, 'utf8');
//         // console.log(arr, str);
//     });
// });

// req.end();