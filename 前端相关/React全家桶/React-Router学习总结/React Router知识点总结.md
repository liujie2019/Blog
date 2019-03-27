## 1. 基础知识
### 1.1 基本用法
`React Router` 安装命令：

```
$ npm install react-router --save
```
路由器`Router`就是`React`的一个组件。

```
import {Router} from 'react-router';
render(
	<Router/>, 
	document.getElementById('root')
);
```
**要注意的是：** `Router`组件本身**只是一个容器**，真正的路由要通过`Route`组件定义。

```
# path是路由匹配的路径
# component是路由匹配正确后要加载的组件
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), 
document.getElementById('root'));
```
**上面代码：** 当访问根路由/（比如http://www.example.com/），组件APP就会加载到`document.getElementById('root')`。

**注意：** `Router`组件有一个参数`history`。
它的值`hashHistory`表示：路由的切换由URL的hash变化决定，即URL的#部分发生变化。
举例来说：当访问`http://www.example.com/`的时候,实际会看到的是`http://www.example.com/#/`。

`Route`组件定义了**URL路径与组件**的对应关系。你可以同时使用多个Route组件:

```
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
```
上面代码中:用户访问/repos（比如http://localhost:8080/#/repos）时，加载Repos组件；访问/about（http://localhost:8080/#/about）时，加载About组件。

### 1.2 嵌套路由
Route组件还可以嵌套使用：

```
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```
上面代码中:用户访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件。

```
<App>
  <Repos/>
</App>
```
App组件要写成下面的样子：

```
#Link用来路由跳转
export default class App extends React.Component{
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li>
           <Link to="/about" style={{color: 'red'}}>About</Link>
          </li>
          <li>
           <Link to="/repos" style={{color: 'green'}}>Repos</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
```
上面代码中，App组件的`this.props.children`属性就是子组件。
### 1.3 path 属性
`Route`组件的`path`属性指定路由的匹配规则，这个属性是可以省略的。如果省略，不管路径是否匹配，总是会加载指定组件。

```
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
```
上面代码中，当用户访问`/inbox/messages/:id`时，会加载下面的组件。

```
<Inbox>
  <Message/>
</Inbox>
```
如果省略外层Route的path参数，写成下面的样子。

```
<Route component={Inbox}>
  <Route path="inbox/messages/:id" component={Message} />
</Route>
```
现在用户访问`/inbox/messages/:id`时，组件加载还是原来的样子。

```
<Inbox>
  <Message/>
</Inbox>
```
### 1.4 通配符
path属性可以使用通配符：

```
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```
**通配符的规则如下：**

 1. **:paramName：**匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
 2. ()：表示URL的这个部分是可选的。
 3. *：匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
 4.  **：匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

path属性也可以使用相对路径（不以/开头），匹配时就会相对于父组件的路径。嵌套路由如果想摆脱这个规则，可以使用绝对路由。

**特别注意：** 路由匹配规则是从上到下执行，一旦发现匹配，就不再匹配其余的规则了。

```
<Route path="/comments" ... />
<Route path="/comments" ... />
```
上面代码中，路径`/comments`同时匹配两个规则，第二个规则不会生效。
设置路径参数时，需要特别小心这一点。

```
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```
上面代码中，用户访问`/about/me`时，不会触发第二个路由规则，因为它会匹配`/:userName/:id`这个规则。因此，带参数的路径一般要写在路由规则的底部。
对于`URL`的查询字符串`/foo?bar=baz`，可以用`this.props.location.query.bar`获取。

### 1.5 Link标签
`Link`组件用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是`<a>`元素的React 版本，可以接收`Router`的状态。

```
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
}
```
**特别注意：Link 组件中的to属性定义了 URL 中 #号 之后的路径参数，所以要和 Route 组件中的 path值相对应。**

**注意：** 在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写：

```
import { browserHistory } from 'react-router';
browserHistory.push('/some/path');
```

### 1.6 IndexRoute 组件

看下面的例子更好理解：

```
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="/repos" component={Repos}/>
		<Route path="/about" component={About}/>
	</Route>
</Router>
```
对于上面的代码，如果我们访问根路径/，不会加载任何子组件。App组件的`this.props.children`是`null`。
`IndexRoute`就是用来显式指定根路由的子组件，即指定默认情况下加载的子组件。你可以把IndexRoute想象成某个路径的index.html。

```
<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="/repos" component={Repos}/>
			<Route path="/about" component={About}/>
		</Route>
	</Router>
```
现在，用户访问/的时候，加载的组件结构如下：

```
<App>
  <Home/>
</App>
```
这种组件结构就很清晰了：App只包含下级组件的**共有元素**，本身的展示内容则由Home组件定义。这样有利于代码分离，也有利于使用React Router提供的各种API。

**特别注意：** `IndexRoute`组件没有路径参数`path`。
### 1.7 Redirect 组件
`<Redirect>`组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。

```
<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```
现在访问`/inbox/messages/5`，会自动跳转到`/messages/5`。

### 1.8 IndexRedirect 组件
`IndexRedirect`组件用于访问根路由的时候，将用户重定向到某个子组件。

```
<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```
上面代码中，用户访问根路径时，将自动重定向到子组件`welcome`。
### 1.9 IndexLink
如果链接到根路由/，不要使用Link组件，而要使用`IndexLink`组件。
这是因为对于根路由来说，`activeStyle和activeClassName`会失效。或者说总是生效，因为/会匹配任何子路由。而IndexLink组件会使用路径的精确匹配。

```
<IndexLink to="/" activeClassName="active">
  Home
</IndexLink>
```
上面代码中，根路由只会在精确匹配时，才具有`activeClassName`。
另一种方法是使用Link组件的`onlyActiveOnIndex`属性，也能达到同样效果。

```
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
  Home
</Link>
```
实际上，`IndexLink`就是对Link组件的`onlyActiveOnIndex`属性的包装。

### 1.10 histroy 属性
`Router`组件的`history`属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 `React Router` 匹配。
history属性，一共可以设置三种值：

 - browserHistory
 如果设为`browserHistory`，浏览器的路由就不再通过Hash完成了，而显示正常的路径`example.com/some/path`，背后调用的是浏览器的`History API`。
 但是，这种情况需要对`服务器改造`。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
如果开发服务器使用的是`webpack-dev-server，加上--history-api-fallback`参数就可以了。

```
$ webpack-dev-server --inline --content-base . --history-api-fallback
```
 - hashHistory
 如果设为hashHistory，路由将通过URL的hash部分（#）切换，URL的形式类似`example.com/#/some/path`
 - createMemoryHistory
`createMemoryHistory`主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。


react-router 是基于 history 模块提供的 api 进行开发的。
假如我们有一台提供 Web 服务的服务器的网络地址是：10.0.0.1，而该 Web 服务又提供了三个可供用户访问的页面，其页面 URI 分别是：

```
http://10.0.0.1/
http://10.0.0.1/about
http://10.0.0.1/concat
```
那么其路径就分别是 /，/about，/concat。

当用户使用 http://10.0.0.1/about 来访问该页面时，Web 服务会接收到这个请求，然后会解析 URI 中的路径 /about，在 Web 服务的程序中，**该路径对应着相应的处理逻辑**，程序会把请求交给路径所对应的处理逻辑，这样就完成了一次「路由分发」，这个分发就是通过「路由」来完成的。

### **参考博文：**
1. [React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
2. [前端路由实现与 react-router 源码分析](http://web.jobbole.com/86407/)
3. [React Router 中文文档](https://react-guide.github.io/react-router-cn/index.html)
4. [深入理解 react-router 路由系统](https://zhuanlan.zhihu.com/p/20381597)