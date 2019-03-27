在使用 React 的过程中，不可避免的需要在组件间进行消息传递，组件间通信大体有下面几种情况：
### 1. 父组件向子组件通信
通信是单向的，数据必须是由一方传到另一方。在 React 中，父组件可以向子组件通过传 `props` 的方式，向子组件进行通讯。

```
#Parent.jsx
import React, { Component } from 'react';
import Child from './Child';

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '我是父组件传来的消息'
        };
    }

    render() {
        return (
            <div>
                我是父组件
                <Child 
                    title={this.state.msg}
                />
            </div>
        )
    }
}
```
```
#Child.jsx
import React from 'react';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.title}
            </div>
        )
    }
}
```

### 2. 子组件向父组件通信
利用回调函数，可以实现子组件向父组件通信。父组件将一个函数作为 `props` 传递给子组件，子组件调用该回调函数，便可以向父组件通信。

```
#Parent.jsx
import React, { Component } from 'react';
import Child from './Child';

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '我是父组件传来的消息'
        };
    }
    //回调函数
    cbFn(msg) {
        this.setState({
            msg: msg
        })
    }

    render() {
        return (
            <div>
                我是父组件
                <Child 
                    title={this.state.msg}
                    cbFn={(msg) => this.cbFn(msg)}
                />
            </div>
        )
    }
}
```
```
#Child.jsx
import React from 'react';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
               //调用父组件传过来的回调函数
        this.props.cbFn('我是子组件传来的信息');
    }
    render() {
        return (
            <div>
                {this.props.title}
                <button
                    onClick={() => this.handleClick()}
                >
                    点击我进行通信吧
                </button>
            </div>
        )
    }
}
```
### 3. 子组件之间相互通信
对于没有直接关联关系的两个节点，就如 `Child_1` 与 `Child_2` 之间的关系，他们唯一的关联点，就是拥有相同的父组件。参考之前介绍的两种关系的通讯方式，如果我们向由 `Child_1` 向 `Child_2` 进行通讯，我们可以先通过 `Child_1 向 Parent` 组件进行通讯，再由 `Parent 向 Child_2` 组件进行通讯，具体示例如下：

### 4. 跨级组件通信
所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层的子组件通信。跨级组件通信可以采用下面两种方式：

1. 中间组件层层传递 props;
2. 使用 context 对象

```
#Parent.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child from './Child';

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    getChildContext() {
        return {
            color: "red"
        };
    }

    cbFn(msg) {
        console.log(msg);
    }

    render() {
        return (
            <div>
                我是父组件
                <Child 
                    title="我是子组件"
                    cbFn={(msg) => this.cbFn(msg)}
                />
            </div>
        )
    }
}
Parent.childContextTypes = {
    color: PropTypes.string
};
```
```
#Child.jsx
import React from 'react';
import PropTypes from 'prop-types';
import SubChild from './SubChild';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleClick() {
        this.props.cbFn('我是子组件传来的信息');
    }
    render() {
        return (
            <div>
                {this.props.title}
                <button
                    onClick={() => this.handleClick()}
                >
                    点击我进行通信吧
                </button>
                <SubChild />
            </div>
        )
    }
}
```
```
#SubChild.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default class SubChild extends React.Component {
    render() {
      return (
        <button 
            style={{background: this.context.color}}
        >
          删除
        </button>
      );
    }
  }
  
  SubChild.contextTypes = {
    color: PropTypes.string
  };
```


### 参考文档
1. [React 组件间通讯](http://taobaofed.org/blog/2016/11/17/react-components-communication/)
2. [react中组件通信的几种方式](https://blog.csdn.net/sinat_17775997/article/details/78788508)
3. [React 中组件间通信的几种方式](https://yq.aliyun.com/articles/509960?spm=a2c4e.11163080.searchblog.30.30b12ec1q2prvH)
4. [react 组件间的通信方法](https://www.rails365.net/articles/react-zu-jian-jian-de-tong-xin-fang-fa)
5.  [ReactJS组件之间如何进行通信](https://yq.aliyun.com/articles/185639?spm=a2c4e.11153940.blogcont509960.17.72d928f0etOk8M)
6. [上下文(Context)](http://www.css88.com/react/docs/context.html)
