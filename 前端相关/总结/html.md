[TOC]
## H5中新增了哪些标签？标签语义化的好处？
HTML5节元素标签包括: `body、article、nav、aside、section、header、footer、hgroup、address`。

**标签语义化的好处:**

* 用正确的标签做正确的事情;
* html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
* 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
* 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
* 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

## 常见的行内元素和块级元素？两者的区别是什么？空(void)元素有那些？
首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为"block"，则为块级元素；span默认display属性值为"inline"，是行内元素。

* **行内元素有:** a b span img input select strong
* **块级元素有:** div ul ol li dl dt dd h1…h6 p
* **常见的空元素:** `<br> <hr> <img> <input> <link> <meta>`
* **鲜为人知的空元素:** `<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>`

## script标签中，defer、async属性与默认行为的区别是什么?

* defer代表延迟脚本。defer属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后(即浏览器遇到</html>标签后再执行)再运行。在`<script>`标签中设置defer属性就是告诉浏览器立即下载该js脚本，但是延迟执行。
* async代表异步脚本。async属性的目的是不让页面等待js脚本的下载和执行，而是异步加载页面上的其他内容。

**总体来说分为三种情况：**

1. `<script src="example.js"></script>`没有defer或async属性，浏览器会立即加载并执行相应的脚本。也就是说在渲染script标签之后的文档之前，不等待后续加载的文档元素，读到就开始加载和执行，此举会阻塞后续文档的加载；
2. `<script async src="example.js"></script>`设置async属性，表示后续文档的加载和渲染与js脚本的加载和执行是并行进行的，即异步执行；
3. `<script defer src="example.js"></script>`
设置defer属性，表示后续文档的加载和渲染和js脚本的加载(注意是：仅加载不执行)是并行进行的(异步)，js脚本的执行需要等到文档所有元素解析完成之后，DOMContentLoaded事件触发执行之前。

![](../../static/defer-async.png)

其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。

**从图中我们可以明确一下几点：**

1. defer和async在网络加载过程是一致的，都是异步执行的；
2. 两者的区别在于脚本加载完成之后何时执行，可以看出defer更符合大多数场景对应用脚本加载和执行的要求；
3. 如果存在多个有defer属性的脚本，那么它们是按照加载顺序执行脚本的；而对于async，它的加载和执行是紧紧挨着的，无论声明顺序如何，只要加载完成就立刻执行，它对于应用脚本用处不大，因为它完全不考虑依赖。

## cookies，sessionStorage 和 localStorage 的区别？

* **sessionStorage:** 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。
* **localStorage:** 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

**相同点：** 都是保存在浏览器端，且同源的。

**区别：**

1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下；
2. **存储大小限制不同**，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大；
3. **数据有效期不同**。**sessionStorage：**仅在当前浏览器窗口关闭前有效；**localStorage：**始终有效，窗口或浏览器关闭也一直保存，除非主动删除；**cookie：**只在设置的cookie过期时间之前有效，即使窗口或浏览器关闭；
4. **作用域不同**。sessionStorage在不同的浏览器窗口中不共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的；
5. Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者；
6. Web Storage 的 api 接口使用更方便。而对于cookie而言我们需要自定义获取和设置cookie的方法。

## cookie和session的区别
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗,考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用服务器的性能,考虑到减轻服务器性能方面，应当使用cookie。
4. 单个cookie保存的数据不能超过4KB，很多浏览器都限制一个站点最多保存20个cookie。

**建议：** 将登陆信息等重要信息存放为session，其他信息如果需要保留，可以放在cookie中。

## 常见的浏览器内核有哪些？常见的浏览器的兼容性有哪些？原因和解决方法是什么？常用的hack技巧？
### 常见的浏览器内核

* Trident：IE/360/搜狗浏览器内核
* Geoko：火狐
* Presto：opera
* Webkit/Blink：谷歌和safari浏览器
### 常见浏览器的兼容性

* 解决浏览器默认内外边距不一致问题
```css
* {margin: 0;padding:0}
```
## html5有哪些新特性？

* 添加canvas api，用来画图
* 新增语义化标签
* 本地存储
* 表单控件

### 如何处理html5新标签的浏览器兼容问题？
比如IE6,7,8中不支持<header><footer>等标签。

1. 使用document.createElement('header')创建对应的标签，但是样式需要自己写；
2. html5shiv：推荐

IE9以下版本浏览器兼容HTML5的方法，使用的静态资源的html5shiv包：
```html
<!--[if lt IE9]> <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script> <![endif]-->
```
载入后，初始化新标签的CSS：
```css
article,aside,dialog,footer,header,section,footer,nav,figure,menu{
    display:block
}
```
## 行内、块、空元素举例

* 行内：span、img、a、b、input等
* 块元素：div、p、ul、li、h1-h6、dl等
* 空元素：br、hr等

## html标签

* 文字加粗：<strong>(语义化更好)、<b></b>
* 下标：<sub>
* 上标：<sup>
* 居中：<center>
* 字体：<font>
```html
<strong>加粗了</strong>
<sub>下标</sub>
<sup>上标</sup>
<center>居中</center>
<font>字体</font>
```
## Doctype作用？知道多少种Doctype文档类型？
Doctype作用：位于文档最前面，处于html标签之前，告诉浏览器使用哪种html或者xhtml。

>Doctype文档类型：

* 严格版本
* 过滤版本
* 基于框架html版本

## iframe的优缺点
>优点：

1. 可以重复调用(可以在多个页面中，通过src)；
2. 重载页面，不需要加载整个页面(可以只重载某个iframe)；
3. 维护性好一点(修改简单，在多个页面中，通过iframe引入了同一个html文件，只要修改这个html文件就可以了)。

>缺点：

1. 兼容性不是那么好；
2. 浏览器后退按钮无效；
3. 会阻塞页面onload事件；
4. 多框架页面，会增加很多http请求，导致页面加载速度变慢。

## div+css的布局较table布局有什么优点

1. div+css的布局更灵活；
2. div+css的布局修改方便；
3. 有利于SEO。
