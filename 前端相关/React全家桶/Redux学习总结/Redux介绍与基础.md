**Redux 的设计思想:**

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。
## 1. 组件分类
React-Redux 将所有组件分成如下两类：展示组件和容器组件。
### 1.1 展示组件(UI 组件)
**相关特征：**

 - 只负责 UI 的呈现，不带有任何业务逻辑
 - 没有状态（即不使用this.state这个变量）
 - 所有数据都由参数（this.props）提供
 - 不使用任何 Redux 的 API

>因为不含有状态，展示组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

### 1.2 容器组件(Container Components)
**相关特征：**

 - 负责管理数据和业务逻辑，不负责 UI 的呈现
 - 带有内部状态
 - 使用 Redux 的 API

## 2. 相关API
### 2.1 connect()方法
`React-Redux` 提供`connect`方法，用于从 UI 组件生成容器组件。connect的意思就是：将这两种组件连起来。
connect  会把State和dispatch转换成props传递给子组件。

### 2.2 **Provider组件**
`Provider`是一个React组件，作用是：保存`store`给子组件中的`connect`使用。

`connect`方法生成`容器组件`以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级一级将state传下去就很麻烦。

`React-Redux` 提供`Provider`组件，可以让容器组件拿到state。
`<Provider store> `使组件层级中的 `connect()` 方法都能够获得 `Redux store`。正常情况下，你的根组件应该嵌套在 `<Provider>` 中才能使用`connect()`方法。

### Redux-devTools使用
`redux-devtools`可以实时的监控`Redux`的状态树的`Store`。

```
npm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```
#### 创建DevTools组件
在项目中，通过`Monitor（监视显示）`用`createDevTools`创建一个`DevTools`组件。示例用了最常用，最简单的`LogMonitor`和`DockMonitor`。

```
#containers/DevTools.js

import React from 'react'
//引入createDevTools
import { createDevTools } from 'redux-devtools';
//显示包是单独的，要额外指定
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//创建DevTools组件
const DevTools = createDevTools(
  <DockMonitor 
  		toggleVisibilityKey='ctrl-h'
       changePositionKey  ='ctrl-q'
  >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools
```
用`DevTools.instrument()`通过redux的`compose`来扩展store。
`createDevTools()`创建的`DevTools`组件有个特殊的静态方法`instrument()`,它返回一个store的增强器,在开发中你需要在`compose`方法中使用。

**特别注意：DevTools.instrument()要放在applyMiddleware后，因为你的applyMiddleware可以存在异步行为，为了确保所有的actions显示在store中，所以要放在后面。**

```
#store/create.js

import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './modules/reducers'
import thunk from './middleware/thunk'
import DevTools from '../containers/DevTools'

const enhancer = compose(
  //使用的中间件，放在前面
  applyMiddleware(thunk),
  //启用带有monitors（监视显示）的DevTools
  DevTools.instrument()
)

export default function createStoreWithMiddleware(initialState){
  const store = createStore(rootReducer,initialState,enhancer)
  return store
}
```
```
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Counter from './components/Counter';
import DevTools from './containers/DevTools';

const store = configureStore();
render(
  <Provider store={store}>
    <div>
      <Counter />
      <DevTools />
    </div>
  </Provider>
  document.getElementById('root')
);
```
### 参考文档
1. [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
2. [Redux从设计到源码](https://tech.meituan.com/redux-design-code.html)
3. [Redux-devTools简单的使用](https://www.jianshu.com/p/a2d4c1856560)
4. [Redux-devTools](https://github.com/gaearon/redux-devtools)
5. [深入浅出 - Redux](https://www.w3ctech.com/topic/1561)
6. [在React中使用Redux](https://www.jianshu.com/p/06f5285e2620)
7. [redux学习笔记](http://www.cnblogs.com/xianyulaodi/p/5399264.html)
8. [redux-gitbook](http://cn.redux.js.org/docs/api/compose.html)
9. [redux介绍](http://www.alloyteam.com/2015/09/react-redux/)
