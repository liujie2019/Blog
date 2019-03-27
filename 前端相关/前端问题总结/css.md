1.谈谈对前端安全的理解，有什么，怎么防范？

**前端安全问题主要有：XSS和CSRF攻击。**

* XSS：跨站脚本攻击

它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单的理解为一种javascript代码注入。

* XSS的防御措施：

1. 过滤转义输入输出;
2. 避免使用`eval、new Function`等执行字符串的方法，除非确定字符串和用户输入无关;
3. 使用`cookie`的`httpOnly`属性，加上了这个属性的cookie字段，js是无法进行读写的;
4. 使用innerHTML、document.write的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义。

* CSRF：跨站请求伪造

其实就是网站中的一些提交行为，被黑客利用，在你访问黑客的网站的时候进行操作，会被操作到其他网站上

* CSRF防御措施：

1. 检测http referer是否是同域名;
2. 避免登录的session长时间存储在客户端中;
3. 关键请求使用验证码或者token机制;
4. 其他的一些攻击方法还有HTTP劫持、界面操作劫持。

2. 页面上隐藏一个元素的几种方法？

第一种：display:none
设置元素的display为none是最常用的隐藏元素的方法。

将元素设置为display:none后，元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘。

第二种：visibility:hidden

设置元素的visibility为hidden也是一种常用的隐藏元素的方法，和display:none的区别在于:元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会重排。这种方式适用于那些元素隐藏后不希望页面布局会发生变化的场景。

第三种：opacity:0

opacity属性我相信大家都知道表示元素的透明度，而将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的，这算是一种隐藏元素的方法。这种方法和visibility:hidden的一个共同点是元素隐藏后依旧占据着空间，但我们都知道，设置透明度为0后，元素只是隐身了，它依旧存在页面中。

第四种：设置height，width等盒模型属性为0

这是一种奇技淫巧，简单说就是将元素的margin，border，padding，height和width等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其overflow:hidden来隐藏其子元素。

```
.box { 
	 margin:0; 
	 border:0; 
	 padding:0; 
	 height:0; 
	 width:0; 
	 overflow:hidden; 
}
```
这种方式既不实用，也可能存在着着一些问题。但平时我们用到的一些页面效果可能就是采用这种方式来完成的，比如jquery的slideUp动画，它就是设置元素的overflow:hidden后，接着通过定时器，不断地设置元素的height，margin-top，margin-bottom，border-top，border-bottom，padding-top，padding-bottom为0，从而达到slideUp的效果。


第五种：clip-path
    
隐藏元素的另一种方法是通过剪裁它们实现。

```
.hide {  
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);  
} 
```
### 参考文档
1. [我遇到的前端面试题2017](http://www.imooc.com/article/20319)
2. [解决浏览器兼容——css hack](http://www.cnblogs.com/yjzhu/archive/2012/11/06/2756395.html)