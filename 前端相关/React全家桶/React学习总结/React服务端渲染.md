### React 服务端渲染(Server-Side Rendering简称SSR)
服务端渲染是一个将通过前端框架构建的网站通过后端渲染模板的形式呈现的过程。

SSR 有以下两个好处：

1. 提高首屏加载速度;
2. 完整的可索引的 HTML 页面（有利于 SEO) react 服务端渲染的条件
其实可以看 《深入React技术栈》的第七章， 介绍的非常详细。 概括来说 React 之所以可以做到服务端渲染 是因为ReactDOM提供了服务端渲染的API

renderToString  把一个react 元素转换成带reactid的html字符串。
renderToStaticMarkup 转换成不带reactid的html字符串，如果是静态文本，用这个方法会减少大批的reactid. 这两个方法的存在 ，实际上可以把react看做是一个模板引擎。解析jsx语法变成普通的html字符串。
我们可以调用这两个API 实现传入ReactComponent 返回对应的html字符串到客户端。浏览器端接收到这段html以后不会重新去渲染DOM树，只是去做事件绑定等操作。这样就提高了首屏加载的性能。


### 参考文档
1. [[译]揭秘 React 服务端渲染](https://juejin.im/post/5af443856fb9a07abc29f1eb#comment)
2. [玩转 React 服务器端渲染](https://blog.coding.net/blog/React-server-rendering)
3. [基于create-react-app 和 koa2 脚手架 搭建的 react 服务端渲染项目](https://github.com/yangfan0095/react-koa2-ssr)
4. [服务端渲染与 Universal React App](https://github.com/AlanWei/blog/blob/master/2017/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E4%B8%8E%20Universal%20React%20App/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E4%B8%8E%20Universal%20React%20App.md)
5. [彻底理解React 之React SSR、React服务端渲染，教你从零搭建配置](https://www.jianshu.com/p/47c8e364d0bc?appinstall=1&mType=Group)
6. [ReactJS 服务端同构实践](https://cloud.tencent.com/developer/article/1032428)