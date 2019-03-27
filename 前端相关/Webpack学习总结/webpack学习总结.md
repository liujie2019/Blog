webpack 可以看做是模块打包机：它要做的事情是分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript 等），并将其转换和打包为合适的格式供浏览器使用。用大白话可以这样说：webpack是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。


### 参考文档
1. [webpack 3 零基础入门教程](http://webpackbook.rails365.net/467000)
2. [webpack 学习资源分享](https://www.rails365.net/articles/webpack-xue-xi-zi-yuan-fen-xiang)
3. [细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)
