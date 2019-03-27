### 1. 实现简单的React组件
```
class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```
以上是最简单的React组件了，自己实现组件也是分这么几个步骤：

1. import React(引入react)
2. 新建一个类，继承React.Component，React里每个组件都可以写成一个类
3. 类的render函数返回值，就是显示在页面的内容
4. render里返回的是东西有点诡异，表面上是html其实Babel会把JSX转成React.createElememt来执行
5. 由于JSX本质就是 js，class是 js 的关键字，所以要用className代替
6. 如果想在JSX里渲染变量，使用{}包裹即可

我们用 React.js 开发单页面应用时，通常后端 API 与前端开发服务器并不在一个域内：

React.js 开发服务器运行在 localhost:3000

API 服务器运行在 localhost:4200

如果使用 create-react-app 开发 React 项目，则可以使用它的 proxy 功能。我们需要在 package.json 文件中新增一个字段：

```
{
  "proxy": "http://localhost:4200"
}
```
这样，React 项目中 API 请求就会转发到 http://localhost:4200，不再有跨域的问题。

### 目录文件介绍
#### registerServiceWorker.js作用
在使用`create-react-app`生成的项目中，在src目录下一个`registerServiceWorker.js`文件，并且在 index.js 中引用。这个文件的作用是：在生产环境中为用户在本地创建一个`service worker`来缓存资源到本地，提升应用的访问速度。

`service worker`是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务。`registerServiceWorker`就是为react项目注册了一个`service worker`，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。注意，`registerServiceWorker`注册的`service worker`只在生产环境中生效`process.env.NODE_ENV === 'production'`。
#### App.test.js
使用`jest`做自动化测试的时候用的。
### 参考文档
1. [create-react-app的使用及原理分析](http://www.cnblogs.com/axl234/p/8269018.html)
2. [开发 react 应用最好用的脚手架 create-react-app](https://www.rails365.net/articles/kai-fa-react-ying-yong-zui-hao-jiao-shou-jia-create-react-app)
3. [使用 create-react-app 构建 react应用程序 （react-scripts）](https://blog.csdn.net/github_squad/article/details/57452333)