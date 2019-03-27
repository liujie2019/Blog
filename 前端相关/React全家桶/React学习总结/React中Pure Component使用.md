React 在15.3这个版本中支持了`React.PureComponent`，它取代了之前的`pure-render-mixin`。在本文中，我们将讨论PureComponent的重要性和使用场景。

`React.PureComponent`最重要的一个用处就是优化React应用，这很容易快速地实现。使用`React.PureComponent`对性能的提升是非常可观的，因为它减少了应用中的渲染次数。

`React.PureComponent`的用法很简单，如果我们的项目中有些组件是纯组件，那么把继承类从 `Component` 换成 `PureComponent` 即可。当组件更新时，如果组件的 `props 和 state` 都没发生改变，render 方法就不会触发，省去 `Virtual DOM` 的生成和比对过程，达到提升性能的目的。

```
import React, { PureComponent } from 'react'

class Example extends PureComponent {
  render() {
  }
}
```


### 参考文档
1. [在React.js中使用PureComponent的重要性和使用方式](https://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs-2344.html)
2. [React PureComponent 使用指南](http://www.wulv.site/2017-05-31/react-purecomponent.html)
3. [React PureComponent 源码解析](https://segmentfault.com/a/1190000006741060)