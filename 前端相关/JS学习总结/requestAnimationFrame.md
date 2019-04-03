### 1. requestAnimationFrame方法
`requestAnimationFrame`是**浏览器用于定时循环操作**的一个接口，类似于setTimeout，主要用途是**按帧对网页进行重绘**。

设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是**告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘**。

**requestAnimationFrame的优势在于：**充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

不过有一点需要注意，requestAnimationFrame是在主线程上完成。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣。

requestAnimationFrame使用一个回调函数作为参数，**这个回调函数会在浏览器重绘之前调用**。

```
requestID = window.requestAnimationFrame(callback); 
```
目前，主要浏览器Firefox 23 / IE 10 / Chrome / Safari）都支持这个方法。可以用下面的方法，检查浏览器是否支持这个API。如果不支持，则自行模拟部署该方法。

```
 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();
```
上面的代码按照1秒钟60次（大约每16.7毫秒一次），来模拟requestAnimationFrame。

使用requestAnimationFrame的时候，只需反复调用它即可:

```
function repeatOften() {
  //反复调用
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```
### 2. cancelAnimationFrame方法
cancelAnimationFrame方法用于取消重绘。

```
window.cancelAnimationFrame(requestID);
```
它的参数是requestAnimationFrame返回的一个代表任务ID的整数值:

```
var globalID;

function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);
});
```
上面代码持续在body元素下添加div元素，直到用户点击stop按钮为止。

### 3. demo
```
<body>
<div id="anim">点击运行动画</div>
<script type="text/javascript">
//这里是兼容requestAnimationFrame
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();
var elem = document.getElementById("anim");
var startTime = undefined; //全局的
function render(time){ //time是局部的
  if(time === undefined) {
    time = Date.now(); //获取到当前时间的毫秒数
  }
  if(startTime === undefined) {
      //第一次调用的时候startTime是undefined，之后就不是了
      //而time每次调用都等于当前时间的毫秒数
      startTime = time;
  }
  //当是(time - startTime)/10的值是500的时候，left值从0开始
  elem.style.left = ((time - startTime)/10 % 500) + "px";
}
elem.onclick = function() {
    (function animloop() {
      render();
      //这里利用requestAnimFrame方法来控制渲染的帧数
      requestAnimFrame(animloop);
    })();
};
</script>
</body>
```
### 参考文档
1. [requestAnimationFrame](http://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html)
