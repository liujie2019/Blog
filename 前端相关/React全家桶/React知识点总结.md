## React学习总结

### 1. 基本介绍
React 是一个 View 层的框架，用来渲染视图，它主要做几件事情：

1. 组件化
2. 利用props形成单向的数据流
3. 根据state的变化来更新view(视图)
4. 利用虚拟DOM来提升渲染性能

#### 1.1 组件驱动开发
我们可以通过分割组件的方式去开发复杂的页面或某个功能区块，并且组件是可以被复用的。这个过程大概类似于用乐高积木去拼装不同的物体。我们称这种编程方式称为组件驱动开发。
除了组件化开发之外，React的另一大特点是其所拥有的虚拟DOM，它让页面渲染变得非常的高效，并且比直接操纵DOM变得更为可控。这两大特点的组合使得React具有强大的自上而下(从顶层组件传向子组件)的页面渲染能力。
基于组件化的开发，渲染的页面的时候依靠虚拟DOM进行快速高效的渲染,数据是单向流动的(增强了数据的可控性)。

### 2. JSX好处(为什么要使用 JSX)
1. 允许使用熟悉的语法来定义HTML元素树;
2. 提供更加语义化且易懂的标签(将传统的HTML标签封装成React组件)，我们就可以像使用HTML标签一样使用这个组件;
3. 程序结构更容易被直观化(在函数作用域内，使用JSX语法的代码与原生JavaScript相比，其标签的意图变得更加直观，可读性也更高，也更容易调试);
4. 抽象了React Element的创建过程;
5. 可以随时掌控HTML标签以及生成这些标签的代码
6. React的JSX里规定分别使用首字母大、小写来区分本地组件的类和HTML标签。
7. 是原生的JavaScript

#### 2.1 JSX的延展属性
利用这个属性可以很方便的实现数据从父组件沿着组件树传递给子组件

```
const props = {};
props.foo = x;
props.bar = y;
const component = <Component {...props} />;
```
传入对象(props对象)的属性会被复制到组件内。
它能被多次使用，也可以和其它属性一起用。注意顺序很重要，后面的会覆盖掉前面的。

```
const props = { foo: 'default' };
const component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```
#### 2.2 使用动态值
JSX将两个花括号之间的内容{…}渲染为动态值。花括号指明了一个JavaScript上下文环境–你在花括号中放入的任何东西都会被进行求值，得到的结果被渲染为标签中的若干节点。

#### 2.3 JSX与HTML的不同
##### 属性
在HTML与JSX中都是以内联的方式给每一个节点设置属性，但是JSX还提供了将属性设置为动态javascript变量的便利。我们只需要将原来用引号括起来的文本替换成花括号包裹的javascript变量即可。
##### 条件判断
JSX语法支持条件判断语法：
1. 使用三元运算符(最常用)
2. 设置一个变量并在属性中引用它
3. 将逻辑转化到函数中
4. 使用&&运算符
##### 非DOM属性
JSX中有3个非DOM属性，分别是：dangerouslySetInnerHTML、ref、key

- dangerouslySetInnerHTML(设置原始的HTML)
dangerouslySetInnerHTML：在JSX中直接插入HTML代码，但是如果能避免使用这个属性则尽量避免使用。
- Key

**key键值的唯一性**

使用diff算法时：根据key值决定是否重新渲染，在key值唯一的情况下，如果一个组件没有任何变动的时候，重新render父组件时，该组件是不会再次render的。不加key会影响react渲染的性能，如果这样做diff算法就失效了。

key是一个可选的唯一标识符。在程序运行的过程中，一个组件可能会在组件树中调整位置，比如当用户在进行搜索操作时，或者当一个列表中的物品被增加、删除时。当这些情况发生时，组件可能并不需要被销毁并重新创建。
通过给组件设置一个独一无二的键，并确保它在一个渲染周期中保持一致，使得React能够更智能地决定应该重用一个组件，还是销毁并重新创建一个组件，进而提升渲染性能。当两个已经存在在于DOM中的组件交换位置时，React能够匹配对应的键并进行相应的移动，且不需要完全重新渲染DOM。

- ref 属性
父组件引用子组件，你可以通过在ref属性中设置期望的引用名来定义一个引用。
React 支持一种非常特殊的属性，你可以用来绑定到 render() 输出的任何组件上去。这个特殊的属性允许你引用 render() 返回的相应的支撑实例。这样就可以确保在任何时间总是拿到正确的实例。
1. 绑定一个ref属性到render返回的东西上面去，例如：
```
  <input ref="myInput" />
 ```
2. 在其它代码中（典型地事件处理代码），通过 this.refs 获取支撑实例，就像这样：
```
  this.refs.myInput
 ```
你可以通过调用 `this.refs.myInput.getDOMNode()` 直接获取到组件的DOM节点。

**ref 属性优点**

1. 可以在组件类里面定义任何公共的方法（比如在输入之前的重置方法），然后通过 refs 来调用这些公共的方法（比如 `this.refs.myTypeahead.reset()`）。
2. 管理 DOM 几乎总是需要冲出“本地”组件的限制，比如通过 `this.refs.myInput.getDOMNode()` 获取 `<input />` 元素的底层 DOM 节点。 Refs 是做这件事唯一可靠的方式。
3. Refs 是被自动管理的！如果某个子级实例被销毁了，它的 ref 也会自动销毁。不用考虑内存问题（除非你自己做一些疯狂的操作，保存了什么引用）。aria-* 是HTML5 新加的属性。而aria-*的作用就是描述这个tag在可视化的情境中的具体信息。

### 3. 组件生命周期
React生命周期方法提供了精心设计的钩子函数，会伴随组件的整个生命周期。
初始化阶段->运行中阶段->销毁阶段。
#### 3.1 初始化阶段

- getDefaultProps
获取默认属性，只调用一次，是在createClass之后调用的。实例之间共享引用。
对于组件类来说，这个方法只会被调用一次。对于那些没有被父辈组件指定props属性的新建实例来说，这个方法返回的对象可用于为实例设置默认的props值。
- getInitialState
初始化每个实例的特有初始化状态。
对于组件的每个实例来说，这个方法的调用次数有且只有一次。在这个方法中可以初始化每个实例的state。与getDefaultProps方法不同的是，每次实例创建时该方法都会被调用一次。在这个方法中，可以访问到this.props。
- componentWillMount
mout就是装载的意思，这个方法的意思就是说组件即将被装载到页面中，也是render之前最后一次修改组件状态(state)的机会。
- Render
组件在这个方法中创建的是一个虚拟DOM，用来表示组件的输出。对于一个组件来说，render是唯一一个必须的方法，并且有特定的规则。
Render方法满足一下几点：

1. 只能通过this.props和this.state访问数据;
2. 可以返回null、false或者任何react组件;
3. 只能出现一个顶层组件(不能返回一组元素);
4. 不能改变组件的状态或者修改DOM的输出。
Render方法返回的结果不是真正的DOM，而是一个虚拟的表现，react随后会把它与真实的DOM(这里真实的DOM是内存中的DOM表现)对比，来判断是否有必要做出修改。
组件在render函数中生成虚拟节点，最后由react将虚拟节点变成真正的节点渲染到页面上。
- componentDidMount
在render方法成功调用并且真实的DOM已经被渲染之后，你可以在componentDidMount内部通过this.getDOMNode()方法访问到它。
这个方法是我们用来访问原始DOM的生命周期钩子函数(比如：我们可以在这个函数中测量渲染出的DOM元素的高度)。

组件被装载后才会被调用，也就是说调用这个方法的时候，组件已经被渲染到了页面上，这个时候可以修改DOM。
这五个函数的执行顺序就是从上到下的。需要注意的是getDefaultProps只会在组件的第一个实例被初始化的时候被调用，也就是说第二个实例之后都是从getInitialState开始调用。同一个组件的所有实例的默认属性都是一样的。

#### 3.2 运行中阶段(此时组件已经渲染好并且用户可以与它进行交互)

- componentWillReceiveProps
这个函数在组件即将接收到属性时触发的，或者是父组件的属性发生变化时，属性在传送到组件之前，开发者有机会通过这个函数去处理属性。比如修改，更新内部状态等。
- shouldComponentUpdate
如果你确定某个组件或者它的任何子组件不需要渲染新的props或者state，则该方法会返回false。
特别注意：首次渲染期间或者调用了forceUpdate方法后，这个方法不会被调用。
返回false则是在告诉React要跳过调用render方法，以及位于render前后的钩子函数：componentWillUpdate和componentDidUpdate。

当组件接收到新属性或者新状态的时候触发的。这个是一个疑问函数，也就是说我们可以告诉react不去更新某个组件。因为有时候属性或者状态并不会导致组件发生更新。在组件不需要更新的情况下，手动使shouldComponentUpdate返回false，这样react就不需要再经过render和diff算法去判断是否要更新，从而提高性能。

- componentWillUpdate
render触发之前触发，更新组件，不能修改属性和状态。
和componentWillMount方法类似，组件会在接收到新的props或者state进行渲染之前，调用该方法。
注意：不可以在这个方法中更新state或者props。而应该借助componentWillReceiveProps方法在运行时更新state。
- render
组件在render函数生成虚拟节点，最后由react将虚拟节点变成真正的节点渲染到页面上，只能访问this.props和this.state，只有一个顶层组件，最好不要修改状态和DOM输出。
- componentDidUpdate(更新已经渲染好的DOM)
render之后，真正的DOM被渲染之后调用。
说明：这五个函数的执行顺序也是从上到下的。
#### 3.3 销毁阶段
每当react使用完一个组件，这个组件就必须从DOM中卸载随后被销毁。此时，componentWillUnmount钩子函数会做出响应，完成所有的清理和销毁工作。

- componentWillUnmount
这个函数在销毁操作真正执行之前调用，给开发者最后的机会进行一些清理工作。
随着一个组件从它的层级结构中移除，这个组件的生命也走到了尽头。

#### 3.4 总结
组件的生命周期包含三个主要部分：

1. 挂载： 组件被插入到DOM中。
2. 更新： 组件被重新渲染，查明DOM是否应该刷新。
3. 移除： 组件从DOM中移除。

React提供生命周期方法，你可以在这些方法中放入自己的代码。我们提供will方法，会在某些行为发生之前调用，和did方法，会在某些行为发生之后调用。
- 挂载

getInitialState(): object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
componentWillMount()在挂载发生之前立即被调用，并且永远只执行一次。
componentDidMount()在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。此时，组件已经完成了DOM结构的渲染， 并可以通过 this.getDOMNode() 方法来访问。
- 更新

componentWillReceiveProps(object nextProps)当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
shouldComponentUpdate(object nextProps, object nextState): Boolean 值是一个布尔值，默认为true
在组件接收到新的props或state时被执行。当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
componentWillUpdate(object nextProps, object nextState)在更新发生之前被调用。你可以在这里调用this.setState()。在组件接收到新的props或者state但还没有render时被执行。 在初始化时不会被执行。
componentDidUpdate(object prevProps, object prevState)在更新发生之后调用。在组件完成更新后立即执行。在初始化时不会被执行。 一般会在组件完成更新后被使用。
- 移除

componentWillUnmount()在组件移除和销毁之前被调用。清理工作应该放在这里。


### 4. Virtual DOM
在React中，开发者不太需要操作真正的DOM节点，每个React组件都是用Virtual DOM渲染的，它是对HTML DOM节点的抽象描述，不需要浏览器的DOM API支持，采用了更高效的渲染方式，组件的DOM结构映射到Virtual DOM上，当需要重新渲染组件的时候，React在Virtual DOM上实现了一个Diff算法，通过这个算法寻找需要变更的节点，再把里面的修改更新到实际需要修改的DOM节点上，这样可以避免整个渲染DOM带来的巨大成本。

### 5. ref

```
<input ref={input => {textInput = input; }} />
```
ref附带一个回调函数，函数在组件挂载或者卸载的时候立刻调用，
当ref属性用于HTML元素（对应react的component）时，底层的DOM元素会作为参数传给回调函数
这里就是说input这个形参实际接受了input的dom元素，然后回调函数中将拿到的dom赋值给之前声明的textInput。
[具体见](https://facebook.github.io/react/docs/refs-and-the-dom.html)

### 6. setState方法
该方法只是将传入的对象合并到已有的state对象上。
setState(data, callback)该方法用来通知 React 数据发生了变化。这个方法会合并data到this.state，并重新渲染组件。渲染完成后，调用可选的callback回调。大部分情况下不需要提供callback，因为React会负责把界面更新到最新状态。

### 7. React性能优化
React的DOM diff算法使我们能够在任意时间点高效地重新绘制整个用户界面，并保证最小程度的DOM改变。
#### 7.1 shouldComponentUpdate
当一个组件更新时，无论是设置了新的props还是调用了setState方法或forceUpdate方法，React都会调用该组件所有子组件的render方法。在大多数时候这样的操作都没有问题，但是在组件树深层嵌套或是render方法十分复杂的页面上，这可能会带来些许延迟。

有时候，组件的render方法会在不必要的情况下被调用。比如：组件在渲染的过程中并没有使用props或state的值，或者组件的props或state并没有在父组件重新渲染时发生改变。这意味着重新渲染这个组件会得到和已存在的虚拟DOM结构一模一样的结果，这样的计算过程是没有必要的。

React提供了一个组件生命周期方法shouldComponentUpdate，我们可以使用它来帮助React正确地判断是否需要调用指定组件的render方法。

shouldComponentUpdate方法返回一个布尔值。如果返回false就是告诉React不要调用组件的渲染方法，并使用之前渲染好的虚拟DOM。如果返回true，则是让React调用组件的渲染方法并计算出新的虚拟DOM。注意：在默认情况下，shouldComponentUpdate方法永远都会返回true，因此组件总会调用render方法。此外，在组件首次渲染时，shouldComponentUpdate方法并不会被调用。

shouldComponentUpdate方法接收两个参数：新的props和新的state，我们根据这两个值来判断是否重新渲染。
对于不需要重新渲染的情况，我们可以通过重写shouldComponentUpdate方法，让其返回false，这样就不会调用render方法了。
#### 7.2 使用key
Key属性作用：给react提供一种除组件类之外的识别一个组件的方法。
当修改一个组件的key属性时，React就会跳过DOM diff，同时完全放弃该组件的所有子元素，并重新从头开始渲染。
使用diff算法时：根据key决定是否重新渲染，在key唯一的情况下，如果一个组件没有任何变动的时候，重新render父组件，该组件是不会再次render的。
说白了，react的key关乎到react的dom-diff算法，react中对于dom的操作是根据生成的data-reactid进行绑定的，添加key可以保证dom结构的完整性，而不会根据react自己对dom标记的key进行重新分配。react每次决定重新渲染的时候，几乎完全是根据data-reactid来决定的，最重要的是这个机制。
#### 7.3 小结
将shouldComponentUpdate返回值改为true或false以提升性能
使用key来帮助React识别列表中所有子组件的最小变化

### 8. mapStateToProps和mapDispatchToProps

- mapStateToProps
是一个普通的函数,它的主要作用就是返回需要传递给子组件的State。connect会把返回的数据写入到react组件中，然后组件中就可以通过props读取数据了。
- mapDispatchToProps
与mapStateToProps很像，接收store中的dispatch和props，使页面可以复写dispatch方法。我的理解，就是通过mapDispatchToProps这个方法，把actionCreator变成方法赋值到props，每当调用这个方法，就会更新State。
### 9. react-redux
Redux 是独立的，它与React没有任何关系。React-Redux是官方提供的一个库，用来结合redux和react的模块。
React-Redux提供了两个接口Provider、connect
