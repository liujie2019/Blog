"use strict";

var _this2 = void 0;

// 箭头函数 this
var name = 'windowName';
var obj = {
  name: 'lisi',
  say: function say() {
    setTimeout(function () {
      console.log(this); // setTimeout中this默认指向window

      console.log('name:', this.name);
    }, 100);
  },
  sayWithThis: function sayWithThis() {
    // sayWithThis这里this指向obj
    var that = this; // setTimeout回调取的是sayWithThis里的this指向

    setTimeout(function () {
      console.log('this id:', that.name);
    }, 1000);
  },
  sayWithArrow: function sayWithArrow() {
    var _this = this;

    // sayWithArrow这里this指向obj
    setTimeout(function () {
      // setTimeout箭头函数回调的this取最近一层非箭头函数的this指向
      console.log('array:', _this.name);
    }, 1500);
  },
  sayWithGlobalArrow: function sayWithGlobalArrow() {
    // 第一层箭头函数的this指向window
    setTimeout(function () {
      console.log('global array:', _this2.name);
    }, 2000);
  }
};
obj.say(); // name: windowName

obj.sayWithThis(); // this id: lisi

obj.sayWithArrow(); // array: lisi

obj.sayWithGlobalArrow(); // global array: windowName
//# sourceMappingURL=arrow.js.map