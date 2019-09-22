"use strict";

var fs = require('fs');

var util = require('util'); // fs.readFile('../package.json', 'utf-8', (err, data) => {
//     if (err) return console.log(err);
//     // 需要注意，这里的data是字符串
//     console.log(typeof data); // string
//     const res = JSON.parse(data);
//     console.log(res.name); // Koa2-study
// });
// 使用Promise封装


function readFileAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
} // Promise推荐使用catch捕获错误


readFileAsync('../package.json').then(function (data) {
  console.log(data, '---');
})["catch"](function (err) {
  console.log(err);
}); // 推荐使用util.promisify 完成从回调向Promise迁移

util.promisify(fs.readFile)('../package.json').then(JSON.parse).then(function (data) {
  console.log(data.version); // 1.0.0
})["catch"](function (err) {
  console.log(err);
});
//# sourceMappingURL=cb-promise.js.map