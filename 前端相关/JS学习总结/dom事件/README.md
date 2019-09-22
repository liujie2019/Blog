[TOC]
## DOM事件级别
DOM级别一共可以分为四个级别：
* DOM0级
* DOM1级
* DOM2级
* DOM3级。

而DOM事件分为3个级别：
* DOM 0级事件处理
* DOM 2级事件处理
* DOM 3级事件处理。

由于DOM 1级中没有事件的相关内容，所以没有DOM 1级事件。
### DOM 0级事件
el.onclick = function(){}
```js
var btn = document.getElementById('btn');
 btn.onclick = function(){
     alert(this.innerHTML);
}
```
当希望为同一个元素/标签绑定多个同类型事件的时候（如给上面的这个btn元素绑定3个点击事件），是不被允许的。DOM0事件绑定，给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的。
### DOM 2级事件
el.addEventListener(event-name, callback, useCapture)

* event-name: 事件名称，可以是标准的DOM事件
* callback: 回调函数，当事件触发时，函数会被注入一个参数为当前的事件对象 event
* useCapture: 默认是false，代表事件句柄在冒泡阶段执行
```js
// 例2
var btn = document.getElementById('btn');
btn.addEventListener("click", test, false);
function test(e) {
	var e = e || window.event;
    alert((e.target || e.srcElement).innerHTML);
    btn.removeEventListener("click", test)
}
// IE9-: attachEvent()与detachEvent()。
// IE9+/chrom/FF: addEventListener()和removeEventListener()
```
IE9以下的IE浏览器不支持addEventListener()和removeEventListener()，使用 attachEvent()与detachEvent() 代替，因为IE9以下是不支持事件捕获的，所以也没有第三个参数，第一个事件名称前要加on。
```js
var e = e || window.event;
```
是为了更好的兼容IE浏览器和非ie浏览器。在ie浏览器中，window.event是全局变量，在非ie中，就需要自己传入一个参数来获取event。
### DOM 3级事件
在DOM 2级事件的基础上添加了更多的事件类型。

* UI事件，当用户与页面上的元素交互时触发，如：load、scroll
* 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
* 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dblclick、mouseup
* 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
* 文本事件，当在文档中输入文本时触发，如：textInput
* 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
* 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
* 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
* 同时DOM3级事件也允许使用者自定义一些事件。


