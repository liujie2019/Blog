`react` 是React库的入口点。如果你通过 `<script>` 标签加载React，这些高阶API可用于 React 全局。如果你使用ES6，你可以使用 `import React from 'react'` 。如果你使用ES5，你可以使用 `var React = require('react')` 。

### 1. 组件
React 组件可以让你把UI分割为独立、可复用的片段，并将每一片段视为相互独立的部分。React组件可以通过继承 `React.Component` 或 `React.PureComponent` 来定义。
#### 1.1 React.Component
用 ES6 类 定义时，React.Component是React组件的基类。

```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
#### 1.2 React.PureComponent
React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。

如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能。

### 2. React.Children(顶层API之一)
`React.Children` 提供了处理 `this.props.children`(**表示组件的所有子节点**) 这个不透明数据结构的工具。从本质上来讲， props.children 可以使任何的类型，比如数组、函数、对象等等。

>特别注意：this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性，它表示组件的所有子节点。

#### 2.1 React.Children.map
```
object React.Children.map(object children, function fn [, object context])

使用方法：
React.Children.map(this.props.children, function (child) {
    return <li>{child}</li>;
})

其他方法
this.props.children.forEach(function (child) {
    return <li>{child}</li>
})
```
在包含在 children 里的每个子级上调用函数，调用的函数的 this 设置为上线文 。如果 children 是一个嵌套的对象或数组，它将被遍历。如果 children 是 null 或 undefined ，返回 null 或 undefined 而不是一个空数组。

>需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

React 提供一个工具方法 `React.Children` 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 undefined 还是 object。

#### 2.2 React.Children.forEach
```
React.Children.forEach(object children, function fn [, object context])
```
类似于 React.Children.map()，但是不返回对象。

#### 2.3 React.Children.count
```
number React.Children.count(object children)
```
返回 children 当中的组件总数，和传递给 map 或者 forEach 的回调函数的调用次数一致。

```
render: function() {
    console.log(React.Children.count(this.props.children)); //2

    return (
      <ol>
        {
          this.props.children.forEach(function (child) {
              return <li>{child}</li>
          })
        }
      </ol>
    );
  }
不同的ReactElement，输出count值:

<NotesList>
    <span>hello</span>
    <span>hello</span>
</NotesList>
console.log(React.Children.count(this.props.children)); //2

<NotesList></NotesList>
console.log(React.Children.count(this.props.children)); //0

<NotesList>null</NotesList>
console.log(React.Children.count(this.props.children)); //1
```
#### 2.4 React.Children.only
```
object React.Children.only(object children)
```
返回 children 中 仅有的子级。否则抛出异常。

这里仅有的子级，only方法接受的参数只能是一个对象，不能是多个对象（数组）。

```
console.log(React.Children.only(this.props.children[0])); 
//输出对象this.props.children[0]
```

#### 2.5 React.Children.toArray

```
React.Children.toArray(children)
```
返回以赋key给每个子级 child 的扁平数组形式来组成不透明的 children 数据结构。如果你打算在你的渲染方法里操纵子级集合这很有用，特别是你想在 this.props.children 传下之前对它重新排序或切割。

```
class Sort extends React.Component {
  render() {
    const children = React.Children.toArray(this.props.children)
    // Sort and render the children
    return <p>{children.sort().join(' ')}</p>
  }
}
<Sort>
  {'bananas'}{'oranges'}{'apples'}
</Sort>
```

**特别说明：**当children是扁平列表时，React.Children.toArray() 改变key来保留嵌套数组的语义。也就是说，为了在展开时保留嵌套数组的语义，toArray 会自动的给数组中每个 key 加了上前缀，以便将每个元素的key被限定到包含它的输入数组。

#### 2.6 demo
```
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Life from './components/Life';
import Study from './components/Study';

ReactDOM.render(
    <Home>
        <Life />
        <Study />
    </Home>,
    document.querySelector('#root')
);
```
```
// Home.jsx
import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        // console.log(React.Children.count(this.props.children));
        // childItem对应this.props.children中的每一项
    	 // index是对应项的索引
        const childsWithProps = React.Children.map(
            this.props.children,
            (childItem, index) => {
            		if (index < 1) return null; // 忽略子元素中的第一项
                return React.cloneElement(childItem, { name: 'lisi' });
            }
        );
        return (
            <div>
                {childsWithProps}
            </div>
        );
    }
}
```
```
// Life.jsx
import React, { Component } from 'react';

export default class Life extends Component {
    render() {
        return (
            <div>
                生活
            </div>
        );
    }
}
```
```
// Study.jsx
import React, { Component } from 'react';

export default class Study extends Component {
    render() {
        return (
            <div>
                学习
            </div>
        );
    }
}
```

### 3. cloneElement()
```
React.cloneElement(
  element,
  [props],
  [...children]
)
```
以 element 作为起点，克隆并返回一个新的React元素(React Element)。生成的元素将会拥有原始元素props与新props的浅合并。新的子级会替换现有的子级。来自原始元素的 key 和 ref 将会保留。

React.cloneElement() 几乎相当于：

```
<element.type {...element.props} {...props}>{children}</element.type>
```
然而，它也保留了 ref。这意味着，如果你通过 ref 获取到子级组件时，不会一不小心从祖先组件里窃取了它。你将获得与你新元素相同的 ref 。

### 4. React
React 是 React 库的入口。如果使用的是预编译包，则 React 是全局的；如果使用 CommonJS 模块系统，则可以用 require() 函数引入 React。

### 5. React.createClass
```
ReactClass createClass(object specification)
```
创建一个组件类，并作出定义。组件实现了 `render()` 方法，该方法返回一个子级。该子级可能包含很深的子级结构。组件与标准原型类的不同之处在于，你不需要使用 new 来实例化。 组件是一种很方便的封装，可以（通过 new ）为你创建后台实例。
### 6. React.createElement
```
ReactElement createElement(
  string/ReactClass type,
  [object props],
  [children ...]
)
```
创建并返回一个新的指定类型的 ReactElement。type 参数可以是一个 html 标签名字字符串（例如:"div"，"span"等等），或者是 ReactClass （通过 React.createClass 创建的）。
### 7. React.createFactory
```
factoryFunction createFactory(
  string/ReactClass type
)
```
返回一个生成指定类型 ReactElements 的函数。比如 React.createElement，type 参数可以是一个 html 标签名字字符串（例如:"div"，"span"等等），或者是 ReactClass。

### 8. React.render
```
ReactComponent render(
  ReactElement element,
  DOMElement container,
  [function callback]
)
```
**渲染一个 ReactElement 到 DOM 中，放在 container 指定的 DOM 元素下，返回一个到该组件的引用。**

如果 ReactElement 之前就被渲染到了 container 中，该函数将会更新此 ReactElement，仅改变需要改变的 DOM 节点以展示最新的 React 组件。

如果提供了可选的回调函数，则该函数将会在组件渲染或者更新之后调用。

>注意：React.render() 替换传入的容器节点内容。在将来，或许可能插入组件到已存在的 DOM 节点中，但不覆盖已有的子节点。

### 9. React.unmountComponentAtNode
```
boolean unmountComponentAtNode(DOMElement container)
```
从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。如果在 container 内没有组件挂载，这个函数将什么都不做。如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false。
### 10. React.renderToString
```
string renderToString(ReactElement element)
```
**把组件渲染成原始的 HTML 字符串。该方法应该仅在服务器端使用。**React 将会返回一个 HTML 字符串。你可以在服务器端用此方法生成 HTML，然后将这些标记发送给客户端，这样可以获得更快的页面加载速度，并且有利于搜索引擎抓取页面，方便做 SEO。

如果在一个节点上面调用 React.render()，并且该节点已经有了服务器渲染的标记，React 将会维护该节点，并且仅绑定事件处理器，保证有一个高效的首屏加载体验。

### 11. React.renderToStaticMarkup
```
string renderToStaticMarkup(ReactElement element)
```
和 renderToString 类似，除了不创建额外的 DOM 属性，例如 data-react-id，因为这些属性仅在 React 内部使用。如果你想用 React 做一个简单的静态页面生成器，这是很有用的，因为丢掉额外的属性能够节省很多字节。
### 12. React.isValidElement
```
boolean isValidElement(* object)
```
判断对象是否是一个 ReactElement。
### 13. React.DOM
React.DOM 运用 React.createElement 为 DOM 组件提供了方便的包装。该方式仅在未使用 JSX 的时候适用。例如，React.DOM.div(null, 'Hello World!')。

### 14. React.PropTypes
React.PropTypes 包含了能与组件 propTypes 对象共用的类型，**用于验证传入组件的 props**。更多有关 propTypes 的信息，参考复用组件。

### 15. React.initializeTouchEvents
```
initializeTouchEvents(boolean shouldUseTouch)
```
配置 React 的事件系统，使 React 能处理移动设备的触摸（ touch ）事件。


### 参考文档
1. [React 高阶 API](https://doc.react-china.org/docs/react-api.html)
2. [对React children 的深入理解](https://www.jianshu.com/p/d1975493b5ea)