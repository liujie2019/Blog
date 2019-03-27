高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。

高阶组件（ higher-order component ，HOC ）是 React 中复用组件逻辑的一种进阶技巧。它本身并不是 React 的 API，而是一种 React 组件的设计理念，众多的 React 库已经证明了它的价值，例如耳熟能详的 react-redux。

>简单来讲：高阶组件是一个函数，能够接受一个组件并返回一个新的组件。

```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### 使用场景
当多个组件之间存在很多重复代码(相同属性或者相同方法)，为了提高代码的复用性和可维护性，就可以使用React 高阶组件。高阶组件其实是一个函数，它并不是一个组件，我们需要向它传递一些参数(想要操作的组件、属性)，它的作用就是存储一些公共的属性和方法。

### demo
```
// Person.jsx
import React, { Component } from 'react';

class Person extends Component {
    render() {
        return (
            <div>
                {this.props.name + '--' + this.props.age + '--' + this.props.job}
            </div>
        );
    }
}

export default Person;
```
```
// User.jsx
import React, { Component } from 'react';
import Person from './Person';

// 高阶组件
const HOCFactory = (WrappedComponent) => {
    return (
        class WrapperComponent extends React.Component {
            render() {
                const newProps = {
                    job: 'worker'
                };
                return <WrappedComponent {...newProps} {...this.props} />;
            }
        }
    );
};
// 普通的组件
class WrappedComponent extends Component {
    render() {
        return (
            <div>
                高阶组件测试
                <Person name="lisi" age="23" {...this.props} />
            </div>
        );
    }
}

const HocComponent = HOCFactory(WrappedComponent);
export default HocComponent;
```
### 理解react-redux的connect函数
把redux的state和action创建函数，通过props注入给了Component。
你在目标组件Component里面可以直接用this.props去调用redux state和action创建函数了。

```
ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Component);
```
相当于这样

```
// connect是一个返回函数的函数（就是个高阶函数）
const enhance = connect(mapStateToProps, mapDispatchToProps);
// 返回的函数就是一个高阶组件，该高阶组件返回一个与Redux store
// 关联起来的新组件
const ConnectedComment = enhance(Component);
```
antd的Form也是一样的

```
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
```


### 参考博文
1. [精读 React 高阶组件](https://github.com/dt-fe/weekly/blob/master/12.%E7%B2%BE%E8%AF%BB%20React%20%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6.md)
2. [助你完全理解React高阶组件](https://github.com/brickspert/blog/issues/2)
3. [React高阶组件（译）](http://imweb.io/topic/5907038a2739bbed32f60dad)