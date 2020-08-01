"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

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

var p = new Person('lisi', 12);