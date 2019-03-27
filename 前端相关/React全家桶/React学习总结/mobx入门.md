### mobx(响应式编程)
mobx是一种简单可扩展的状态管理js库。
### mobx vs redux
1. 开发难度低
2. 开发代码量少
3. 渲染性能好

### 基础语法知识

### mobx常用api(可观察的数据)

### mobx应用
### Demo
```
# 安装mobx相关依赖库
npm install mobx mobx-react --save
```
```
# 让webpack支持ES7的修饰器的转码
npm install babel-plugin-transform-decorators babel-plugin-transform-decorators-legacy babel-preset-stage-1 --save-dev
```
```
# App.jsx
import React from 'react';
import { observable, action, configure } from 'mobx';
import { observer } from 'mobx-react';

// 启用严格模式
configure({ enforceActions: true });

class MyState {
    @observable num = 0;
    @action addNum = () => {
        this.num += 1;
    }
}

const newState = new MyState();

@observer
export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>{newState.num}</p>
                <button onClick={newState.addNum}>点击加1</button>
            </React.Fragment>
        );
    }
}
```
```
# index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App3';
import '../node_modules/antd/dist/antd.css';
import './index.scss';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
使用了一个MyState类，在这个类中定义了一个被观测的num变量和一个action函数addNum来改变这个num值。

之后我们实例化一个对象，叫做newState，之后在我的React组件中，我只需要用`@observer`修饰一下组件类，便可以愉悦地使用这个newState对象中的值和函数了。
### 跨组件间交互
```
# App.jsx
import React from 'react';
import { observable, action, configure, computed } from 'mobx';
import { observer } from 'mobx-react';

// 启用严格模式
configure({ enforceActions: true });

class MyState {
    @observable num1 = 0;
    @observable num2 = 100;

    @action addNum1 = () => {
        this.num1 += 1;
    }
    @action addNum2 = () => {
        this.num2 += 1;
    }
    @computed get total() {
        return this.num1 + this.num2;
    }
}

const newState = new MyState();
const AllNum = observer(props => <div>num1 + num2 = {props.store.total}</div>);

const Main = observer(props => (
    <div>
        <p>num1 = {props.store.num1}</p>
        <p>num1 = {props.store.num2}</p>
        <div>
            <button onClick={props.store.addNum1}>num1 + 1</button>
            <button onClick={props.store.addNum2}>num2 + 1</button>
        </div>
    </div>
));

@observer
export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
               <Main store={newState} />
               <AllNum store={newState} />
            </React.Fragment>
        );
    }
}
```
在上面例子中有两个子组件：Main和AllNum (均采用无状态函数的方式声明的组件)
在MyState中存放了这些组件要用到的所有状态和函数。
之后只要在父组件需要的地方实例化一个MyState对象，需要用到数据的子组件，只需要将这个实例化的对象通过props传下去就好了。

### 参考文档
1. [MobX文档](https://cn.mobx.js.org/)
2. [用mobx代替redux](https://www.geekjc.com/post/5a044533d0a2f936e03a623a)