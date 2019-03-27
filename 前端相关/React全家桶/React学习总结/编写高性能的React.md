React使用过程中，主要的性能问题在于多余的处理组件的DOM对比。为了避免不必要的性能浪费，我们应该尽可能的在`shouldComponentUpdate` 中返回 `false`。

### 1. React 中的主要性能问题

1. 组件中那些不更新 DOM 的冗余操作；
2. DOM 对比中那些无须更新的叶子节点(虽则 DOM 对比很出色并加速了React，但计算成本是不容忽视的)

### 2. React的默认渲染行为
在React应用初始化渲染的时候，我们需要选染整个应用，如下图所示：所有绿色节点都是已经渲染的节点。
![](../static/react-dom1.jpg)
[图片来源](https://juejin.im/entry/57621f7980dda4005f7332f3)
#### 2.1 React组件的重新渲染
提及React组件，肯定离不开组件的 `props 和 state`，我们可以在 props 和 state 存放任何类型的数据，通过改变 props 和 state，去控制整个组件的状态。

当组件的`props 或 state`发生变化，**React 将会构建新的 virtual DOM**，使用 diff 算法把新老的 virtual DOM 进行比较，如果新老 virtual DOM 树不相等则重新渲染，相等则不重新渲染。DOM 操作是非常耗时的，这导致重新渲染也非常的耗时，因此要提高组件的性能就应该尽一切可能的减少组件的重新渲染。

#### 2.2 更新部分节点
如下图所示：如果我们只想更新下图中的绿色节点。
![](../static/react-dom2.jpg)
理想情况下，我们只需要渲染与更新节点处于同一条路径上的这几个节点。
![](../static/react-dom3.jpg)
然而理想终归是美好的，React的默认行为会渲染所有子节点，如下图中黄色节点也会被重新渲染，这样就造成了性能浪费。
![](../static/react-dom4.jpg)

在React应用中， 每一个React组件都有一个 `shouldComponentUpdate(nextProps, nextState)` 函数。该函数的作用是：当组件需要更新时返回 true ， 而组件不需要更新时则返回 false 。

返回 false 会导致组件的 `render` 函数不被调用。而`shouldComponentUpdate`函数总是默认返回 true，即使我们在React组件中并没有显示地定义一个 `shouldComponentUpdate` 函数。这就意味着：只要组件的 props 或者 state 发生了变化，就会重新构建 virtual DOM，然后使用 diff 算法进行比较，再接着根据比较结果决定是否重新渲染整个组件。

```
// 默认行为
shouldComponentUpdate(nextProps, nextState) {
    return true;
}
```
这就意味着在默认情况下，我们每次更新React应用中顶层级组件的 props或state，整个应用的每一个组件都会渲染，这是一个React应用中主要的性能问题。

### 3. 组件性能优化
#### 3.1 纯组件(Pure Component)
如果一个组件只和 props 和 state 有关系，给定相同的 props 和 state 就会渲染出相同的结果，那么这个组件就叫做纯组件，换一句话说纯组件只依赖于组件的 props 和 state，下面的代码表示的就是一个纯组件:

```
render() {
     return (
         <div style={{width: this.props.width}}>
                  {this.state.rows}
         </div>
     );
}
```

### 参考文档
1. [高性能 React 组件](http://taobaofed.org/blog/2016/08/12/optimized-react-components/)
2. [React 应用的性能优化之路](https://github.com/xitu/gold-miner/blob/master/TODO/performance-optimisations-for-react-applications.md)
3. [xitu/gold-miner](https://github.com/xitu/gold-miner/blob/master/front-end.md)
4. [Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)
5. [React 最佳实践](https://github.com/camsong/blog/issues/6)
6. [当PureComponent遇上ImmutableJS ，让React应用性能发挥到极致](http://www.wulv.site/2017-08-22/purecomponent-immutablejs.html)
7. [React PureComponent 使用指南](http://www.wulv.site/2017-05-31/react-purecomponent.html)
8. [React性能优化——代码篇](http://www.wulv.site/2017-07-02/react-perf-code.html)
9. [immutable-js](https://github.com/facebook/immutable-js/)