"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs');

var util = require('util');

var co = require('co'); // function readFile(cb) {
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
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
} // // Promise推荐使用catch捕获错误 方式一
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


var readAsync = util.promisify(fs.readFile);

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readAsync('../package.json');

          case 2:
            data = _context.sent;
            data = JSON.parse(data);
            console.log(data.name);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}

run();
//# sourceMappingURL=async.js.map