Function.prototype.before = function(beforefn) {
	var __self = this; // 保存原函数的引用
	return function() {	 // 返回包含了原函数和新函数的"代理"函数
	  if (beforefn.apply(this, arguments) === false) { // 执行新函数，修正this
		return false; // 如果返回 false, 便会阻断下一个函数的执行
	  }
	  return __self.apply(this, arguments); // 执行原函数
	}
};

Function.prototype.after = function(afterfn) {
	var __self = this;
	return function() {
	  var ret = __self.apply(this, arguments);
	  if (ret === false) {
		return false;
	  }
	  afterfn.apply(this, arguments);
	  return ret;
	}
};

var func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

func(); // 按顺序打印出1，2，3