### 1. setState
#### 1.1 setState同步更新策略
为了提高性能，React将setState设置为批次更新，即是异步操作函数，并不能以顺序控制流的方式设置某些事件，我们也不能依赖于this.state来计算未来状态，也就是说setState函数并不会阻塞等待状态更新完毕。
##### 1.1.1 完成回调
`setState`函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用，比如：

```
this.setState({
  count: this.state.count + 1
}, () => {
  console.log(this.state.count);
  console.log('加载完成')
});
```


`this.setState()`方法可以接收一个函数作为参数，`prevState`是之前的`state`值。

```
 this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
```
### 2. 使用 PropTypes 进行类型检查
PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。在这个示例中，我们使用了 PropTypes.string。当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，propTypes 只在**开发模式下**进行检查。

```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};
```
```
# App.jsx
import React, { Component, Fragment } from 'react';
import Test from './componnents/Test';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ marginLeft: 20, padding: 10 }}>
                <Test testStr="我是父组件传递的值" />
            </div>
        );
    }
}
```
```
# Test.jsx
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Test extends Component {
    static defaultProps = {
        testStr: '我是默认值'
    }
    render() {
        return (
            <Fragment>
                {this.props.testStr}
            </Fragment>
        );
    }
}

Test.propTypes = {
    testStr: PropTypes.string
};
```

### 3. ref机制
```
#通过ref来获取dom元素的引用
ref = {
	function (el) {
		self._input = el;
	}
}
```
### 4. dangerouslySetInnerHTML函数
`dangerouslySetInnerHTML`是React提供的替换浏览器DOM中的innerHTML接口的一个函数。一般而言，使用JS代码设置HTML文档的内容是危险的，因为这样很容易把你的用户信息暴露给跨站脚本攻击.所以，你虽然可以直接在React中设置html的内容，但你要使用 `dangerouslySetInnerHTML` 并向该函数传递一个含有`__html`键的对象，用来提醒你自己这样做很危险。例如：

```
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return (
  		<div dangerouslySetInnerHTML={createMarkup()}>
  		</div>);
}
```
### 5. style属性
style属性接受一个键为小驼峰命名法命名的`javascript`对象作为值，而不是像css字符串。这和DOM中style属性接受`javascript`对象对象key的命名方式保持一致性，更高效而且能够防止跨站脚本（XSS）的安全漏洞。例如：

```
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
### 6. 事件处理
React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

1. React事件绑定属性的命名采用驼峰式写法，而不是小写;
2. 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)。

#### 6.1 向事件处理程序传递参数
通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过 `arrow functions` 和 `Function.prototype.bind` 来为事件处理函数传递参数。

上面两个例子中，参数`e`作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，例如:

```
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }
    
    preventPop(name, e){ //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }
    
    render(){
        return (
            <div>
                <p>hello</p>
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        );
    }
}
```
### getDerivedStateFromProps(生命周期方法)

### 参考文档
1. [React 源码剖析系列 － 解密 setState](https://zhuanlan.zhihu.com/p/20328570)
2. [谈谈 react 中的 key](https://juejin.im/post/5a7c04746fb9a063461fe700)