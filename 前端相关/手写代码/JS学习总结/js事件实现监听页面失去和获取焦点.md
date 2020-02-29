当前窗口获得焦点js事件，html5发布之前我们使用`window.onfocus`和`window.onblur`来获得窗口焦点和失去窗口焦点。

```
//当前窗口得到焦点 
window.onfocus = function() { 
  //播放动画或视频 
}; 
 
//当前窗口失去焦点 
window.onblur = function() { 
  //暂停动画或视频 
};
```
### 使用html5的Page Visibility API来实现
这个 API 本身非常简单，由以下三部分组成：

* document.hidden：表示页面是否隐藏的布尔值。页面隐藏包括页面在后台标签页中或者浏览器最小化（注意，页面被其他软件遮盖并不算隐藏，比如打开的 sublime 遮住了浏览器）。

document.visibilityState：表示下面 4 个可能状态的值：

* hidden：页面在后台标签页中或者浏览器最小化
* visible：页面在前台标签页中
* prerender：页面在屏幕外执行预渲染处理 document.hidden 的值为 true
* unloaded：页面正在从内存中卸载

Visibilitychange事件：当文档从可见变为不可见或者从不可见变为可见时，会触发该事件。

这样，我们可以监听 Visibilitychange 事件，当该事件触发时，获取 document.hidden 的值，根据该值进行页面一些事件的处理。

### demo
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>hello world</h1>
    <a href="http://www.baidu.com">hello</a>
    <script>
        let num = 0;// 记录离开当前页面的次数
        document.addEventListener('visibilitychange', function() {
            const isHidden = document.hidden;
            if (isHidden) {
                console.log('当前页面失去焦点');
                num++;
            }
            else {
                console.log('当前页面获取焦点');
            }
            console.log(num);
        });
    </script>
</body>
</html>
```
### js监听浏览器离开页面操作
有时候我们在关闭网页的时候，会看到一个确定是否离开当前页面的提示框。这样做的好处是：避免用户有意或者无意中关掉了页面，导致数据丢失。
#### unload 事件属性(当用户卸载文档时执行)
```
// body
<body onunload="goodbye()">

//window
window.onbeforeunload=function(e){     
　　var e = window.event||e;  
　　e.returnValue=("确定离开当前页面吗？");
} 
```
#### onbeforeunload 事件属性(在即将离开当前页面(刷新或关闭)时执行)
```
//body
<body onbeforeunload="goodbye()">
//window
window.onbeforeunload=function(e){     
　　var e = window.event||e;  
　　e.returnValue=("确定离开当前页面吗？");
}
```


### 参考文档
1. [当前窗口获得焦点js事件【visibilitychange】](http://www.51xuediannao.com/html5/visibilitychange.html)
2. [js监听浏览器离开页面操作](https://www.cnblogs.com/slly/p/7991474.html)
