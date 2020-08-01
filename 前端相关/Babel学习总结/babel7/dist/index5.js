"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _context;

var isInclude = (0, _includes["default"])(_context = [1, 2, 32]).call(_context, 2);
var p = new _promise["default"](function () {});

function say() {
  return _say.apply(this, arguments);
}

function _say() {
  _say = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return 1;

          case 2:
            console.log(666);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _say.apply(this, arguments);
}

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    (0, _classCallCheck2["default"])(this, Person);
    this.name = name;
    this.age = age;
  }

  (0, _createClass2["default"])(Person, [{
    key: "say",
    value: function say() {
      return this.name;
    }
  }]);
  return Person;
}();