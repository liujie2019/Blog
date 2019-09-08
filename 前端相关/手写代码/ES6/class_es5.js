"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

// 类调用检查
// 第一个参数是类的实例，第二个参数是构造函数
function _classCallCheck(instance, Constructor) {
    // 如果这个实例不是这个构造函数的实例的话，就报错了
  if (!_instanceof(instance, Constructor)) {
      // 不能把一个类当成普通函数来调用
    throw new TypeError("Cannot call a class as a function");
  }
}

// target是当前类
// props属性
function _defineProperties(target, props) {
    // 循环每个属性
  for (var i = 0; i < props.length; i++) {
      // 取出每个属性描述器
    var descriptor = props[i];
    // 可枚举
    descriptor.enumerable = descriptor.enumerable || false;
    // 可配置 可以通过delete删除此属性
    descriptor.configurable = true;
    // 可修改
    if ("value" in descriptor) descriptor.writable = true;
    // 真正的向Parent类的原型对象上增加属性
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
// _createClass接收3个参数
// 构造函数、原型上的属性、静态属性(类的属性)
function _createClass(Constructor, protoProps, staticProps) {
    // 如果有原型属性的话
    // Constructor.prototype就是类的原型
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  // 如果有静态属性的话
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// Parent是一个自执行的函数
var Parent =
  /*#__PURE__*/
  (function() {
    function Parent(name) {
      // 类调用检查，为了保证这个类只能用来new对象
      _classCallCheck(this, Parent);

      this.name = name; // 实例的私有属性
    } // 实例的公有属性，相当于原型属性

    _createClass(Parent, [
      {
        key: "sayName",
        value: function sayName() {
          console.log(this.name);
        }
      }
    ]);

    return Parent;
  })();
