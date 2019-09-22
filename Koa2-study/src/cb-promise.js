const fs = require('fs');
const util = require('util');
// fs.readFile('../package.json', 'utf-8', (err, data) => {
//     if (err) return console.log(err);
//     // 需要注意，这里的data是字符串
//     console.log(typeof data); // string
//     const res = JSON.parse(data);
//     console.log(res.name); // Koa2-study
// });
// 使用Promise封装
function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}
// Promise推荐使用catch捕获错误
readFileAsync('../package.json').then(data => {
    console.log(data, '---');
}).catch(err => {
    console.log(err);
});

// 推荐使用util.promisify 完成从回调向Promise迁移
util.promisify(fs.readFile)('../package.json')
    .then(JSON.parse)
    .then(data => {
        console.log(data.version); // 1.0.0
    })
    .catch(err => {
        console.log(err);
    });