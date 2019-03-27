### 1. diff算法原理
React将VirtualDOM树转换为actualDOM的最少操作过程称为调和（reconciliation）。

diff算法就是调和过程的具体实现。需要特别注意：render 执行的结果得到的不是真正的 DOM 节点。
结果仅仅是轻量级的 JavaScript 对象, 我们称之为 `virtual DOM`。

#### 1.1 diff策略

* 1: Web UI 中DOM节点跨层级的移动操作很少，忽略不计；
* 2: 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构；
* 3: 对于同一个层级的一组子节点，可以通过它们唯一的ID来进行区分。

#### 1.2 tree diff

基于策略1，React对树的算法进行了简洁明了的优化。只对树进行分层比较，两棵树只会对同一层次的节点进行比较。

React只会对相同层级的DOM节点进行比较，即同一个父节点下的所有子节点，当发现该节点已经不存在了，就会删除该节点和其所有子节点，不会再做进一步的比较。

而如果真的出现了跨层级的移动，并不会出现移动操作，而是被移动的跟节点被删除而后重新创建。

#### 1.3 component diff

组件之间的比较策略： 

* 如果是同一类型的组件，按原策略继续比较VirtualDOM树即可；
* 如果不是，则将该组件判断为dirty component，从而替换整个组件下的所有子节点；
* 对于同一类型的组件，可能其virtualDOM没有任何变化，如果能确切的知道这一点，那么就可以节省大量的diff运算时间。因此，React允许用户通过shouldComponentUpdate()来判断是否需要对组件进行diff算法分析。

#### 1.4 element diff

当节点处于同一个层级的时候，diff提供了三种节点操作：INSERT_MARKUP(插入)、MOVE_EXISTING(移动)、REMOVE_NODE(删除)。 

* 插入：新的组件不在旧的集合里，也就是是一个全新的节点；
* 旧集合中有新的组件类型，且element是可更新的类型，generateComponent-Children已经调用receiveComponent，这种情况下prevChild=nextChild，就需要做移动操作，可以复用以前的DOM节点；
* 旧组件类型，在新集合里也有，但对应的element不同则不能直接复用和更新，需要执行删除操作。或者旧组件不在新集合里，也要执行删除操作。

通过 key 发现新老集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将老集合中节点的位置进行移动，更新为新集合中节点的位置。

### 总结
1. React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
2. React 通过分层求异的策略，对 tree diff 进行算法优化；
3. React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
4. React 通过设置唯一 key的策略，对 element diff 进行算法优化；
5. 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
6. 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

### 参考文档
1. [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
2. [浅谈React中的diff](https://juejin.im/post/5ac355576fb9a028cc616aad)
3. [React源码分析 - Diff算法](https://juejin.im/post/5aa163df518825557b4c4f0a)
4. [虚拟DOM Diff算法解析](https://www.kancloud.cn/kancloud/react-in-depth/67091)