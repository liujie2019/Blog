"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var co = require('co');

var fetch = require('node-fetch'); // co(function *() {
//     const res = yield fetch('http://api.douban.com/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b');
//     const moive = yield res.json();
//     const summary = moive.summary;
//     console.log(summary);
// });
// 简单模拟co库，co库的参数为一个generator生成器
// 运行有问题


function run(generator) {
  var iterator = generator(); // 生成迭代器

  var it = iterator.next();
  var promise = it.vaule;
  promise.then(function (data) {
    var it2 = iterator.next(data);
    var promise2 = it2.vaule;
    promise2.then(function (data2) {
      iterator.next(data2);
    });
  });
}

run(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var res, moive, summary;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch('http://api.douban.com/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          moive = _context.sent;
          summary = moive.summary;
          console.log(summary);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
//# sourceMappingURL=co.js.map