const fs = require('fs');
const util = require('util');
const co = require('co');
// function readFile(cb) {
//     fs.readFile('../package.json', 'utf-8', (err, data) => {
//         if (err) return cb(err);
//         cb(null, data);
//     });
// }
// // 第一阶段 回调函数
// readFile((err, data) => {
//     if (!err) {
//         data = JSON.parse(data);
//         console.log(data.name);
//     } else {
//         console.log(err);
//     }
// });

// 第二阶段 Promise
function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) return reject(err);
            resolve(JSON.parse(data));
        });
    });
}
// // Promise推荐使用catch捕获错误 方式一
// readFileAsync('../package.json').then(data => {
//     console.log('---', data.name);
// }).catch(err => {
//     console.log(err);
// });
// 推荐使用util.promisify 完成从回调向Promise迁移
// Promise 方式二
// util.promisify(fs.readFile)('../package.json')
//     .then(JSON.parse)
//     .then(data => {
//         console.log(data.version); // 1.0.0
//     })
//     .catch(err => {
//         console.log(err);
//     });

// // 第三个阶段 co + Generator Function + Promise
// co(function *() {
//     let data = yield util.promisify(fs.readFile)('../package.json');
//     data = JSON.parse(data);
//     console.log(data.name);
// });
// // 第四个阶段 Async + await
const readAsync = util.promisify(fs.readFile);
async function run() {
    let data = await readAsync('../package.json');
    data = JSON.parse(data);
    console.log(data.name);
}
run();