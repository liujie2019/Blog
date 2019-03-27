### 使用setState可能会出现的问题
1. 永远不要直接修改this.state，需要通过调用this.setState方法来替换你修改后的值。把this.state当做不可变数据来处理。
2. setState()不会马上去改变this.state，而是会排队等待处理，所以当你调用setState()后访问this.state，有可能会返回旧的state。
3. 当你调用setState()时，无法保证是同步执行的，因为为了保证性能可能会被批处理。
4. setState()总是会触发render()进行重新渲染，除非在shouldComponentUpdata()控制了渲染逻辑。如果用了可变数据结构以及在shouldComponentUpdata()中并没有控制渲染逻辑，调用setState()将不会触发重新渲染。



batch update(批量更新)

```
function enqueueUpdate(component) {
  ensureInjected();
  
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 处于batch update(批量更新)，即batchingStrategy.isBatchingUpdates为true
  // 保存组件到dirtyComponents中
  dirtyComponents.push(component);
}
```

### 参考文档
1. [React 源码剖析系列 － 解密 setState](https://zhuanlan.zhihu.com/p/20328570)
2. [深入理解 React 的 batchUpdate 机制](http://undefinedblog.com/understand-react-batch-update/)
3. [setState 之后发生了什么 —— 浅谈 React 中的 Transaction](https://undefinedblog.com/what-happened-after-set-state/)