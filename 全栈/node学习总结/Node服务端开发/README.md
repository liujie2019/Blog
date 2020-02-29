Node.js是一个基于Chrome V8 引擎的JavaScript运行环境。
Node.js 使用了一个事件驱动(event-driven)、非阻塞式 I/O 的模型(non-blocking I/O model)，使其轻量又高效。

- Node.js不是一门语言
- Node.js不是库、不是框架
- Node.js是一个JavaScript运行时环境
- 简单点来讲就是Node.js可以解析和执行JavaScript代码
- 以前只有浏览器可以解析执行JavaScript代码
- 也就是说现在的JavaScript可以完全脱离浏览器来运行，一切都归功于Node.js

* 浏览器中的JavaScript
    * ECMAScript
        * if
        * var
        * function
        * Object
        * Array
    * BOM
    * DOM
* Node.js中的JavaScript
    * 没有BOM/DOM
    * 构建在Chrome的V8引擎之上
        * 代码只是具有特定格式的字符串
        * 引擎可以认识它，引擎可以帮助我们去解析和执行代码
        * NodeJS的作者把Chrome的V8引擎移植出来，开发了一个独立的JavaScript运行时环境
    * ECMAScript
    * 在Node这个JavaScript执行环境中为JavaScript提供了一些服务端级别的操作API
        * 例如文件读写
        * 网路服务的构建
        * 网络通信
        * http服务器
* npm是世界上最大的开源生态系统
* 绝大多数的js相关包都放在了npm上，这样做的目的是为了开发人员更方便的去下载使用

>Node.js能做什么？

1. Web服务器后台
2. 命令行工具
    1. npm(node开发)
    2. git(c开发)
    3. hexo(node开发)

>一些资源:

* 《深入浅出Node.js》
    * 偏理论，基本没有实战内容
    * 对理解底层原理有帮助

* 异步编程
    * 回调函数
    * Promise
    * async
    * generator