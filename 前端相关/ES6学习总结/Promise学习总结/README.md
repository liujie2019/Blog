1. Promise用途

* 主要用于异步计算
* 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
* 可以在对象之间传递和操作Promise，帮助我们处理队列

```js
new Promise(
	/*执行器 executor*/
	function (resolve, reject) {
		//一段耗时很长的异步操作
		resolve(); //数据处理完成
		reject(); //数据处理出错
	}
).then(function A() {
	// 成功，下一步
}, function B() {
	// 失败，做相应处理
});
```

状态响应函数可以返回新的Promise或其他值。如果返回新的Promise，那么下一级的`then()`会在新Promise状态改变之后执行。如果返回其它任何值，则会立刻执行下一级`then()`。