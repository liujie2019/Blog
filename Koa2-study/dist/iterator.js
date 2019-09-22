"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(genIterator);

// 实现一个简易迭代器
function makeIterator(arr) {
  var nextIndex = 0; // 返回一个迭代器对象

  return {
    // next方法返回一个结果对象
    next: function next() {
      if (nextIndex < arr.length) {
        return {
          value: arr[nextIndex++],
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
}

var it = makeIterator(['吃饭', '睡觉', '打游戏']); // console.log('第一次', it.next().value);
// console.log('第二次', it.next().value);
// console.log('第三次', it.next().value);
// console.log('第四次', it.next().value);

function genIterator(arr) {
  var i;
  return _regenerator["default"].wrap(function genIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < arr.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return arr[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
} // generator 生成器，方便使用迭代器


var gen = genIterator(['吃饭', '睡觉', '打游戏']);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
/**
{ value: '吃饭', done: false }
{ value: '睡觉', done: false }
{ value: '打游戏', done: false }
{ value: undefined, done: true }
*/
//# sourceMappingURL=iterator.js.map