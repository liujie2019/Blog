"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = require("fs");

var _util = require("util");

var _path = require("path");

var qs = _interopRequireWildcard(require("querystring"));

// promisify(readFile)(r(__dirname, '../package.json'))
//     .then(data => {
//         data = JSON.parse(data);
//         console.log(data);
//         wfs(r(__dirname, './name.txt'), String(data.name), 'utf-8');
//     })
var readAsync = (0, _util.promisify)(_fs.readFile);

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
            return readAsync((0, _path.resolve)(__dirname, '../package.json'));

          case 2:
            data = _context.sent;
            // let data = await readAsync('../package.json');
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
//# sourceMappingURL=index.js.map