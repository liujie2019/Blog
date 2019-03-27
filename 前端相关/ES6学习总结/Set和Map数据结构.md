### 1. Set
#### 1.1 基本用法
ES6 提供了新的数据结构 Set。**它类似于数组，但是成员的值都是唯一的，没有重复的值。**

Set 本身是一个构造函数，用来生成 Set 数据结构。

#### 1.2 Set 实例的属性和方法
Set 结构的实例有以下属性：

1. Set.prototype.constructor：构造函数，默认就是Set函数。
2. Set.prototype.size：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法：

1. add(value)：添加某个值，返回 Set 结构本身。
2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
3. has(value)：返回一个布尔值，表示该值是否为Set的成员。
4. clear()：清除所有成员，没有返回值。

#### 1.3 小技巧
##### 1.3.1 `Array.from`方法可以将 `Set` 结构转为数组
```
#可以用来实现数组去重
function dedupe(arr) {
  return Array.from(new Set(arr));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
##### 1.3.2 扩展运算符和 Set 结构相结合实现数组去重
```
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
console.log(unique); //[3,5,2]
console.log(Array.isArray(unique)); //true
```
##### 1.3.3 数组的map和filter方法也可以间接用于 Set 

```
let set = new Set(['red', 'green', 'blue']);
set = new Set([...set].map(item => item + '-test'));
console.log(set);//Set { 'red-test', 'green-test', 'blue-test' }

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```
##### 1.3.4 Set实现并集（Union）、交集（Intersect）和差集（Difference）
```
let s1 = new Set([1, 2, 3]);
let s2 = new Set([2, 3, 4]);

//并集
let union = new Set([...s1, ...s2]);
console.log(union); //Set { 1, 2, 3, 4 }
//实现数组并集
let union2 = new Set([...s1, ...s2]);
console.log([...union2], Array.isArray([...union2])); //[ 1, 2, 3, 4 ] true

//实现交集
let intersect = new Set([...s1].filter(item => s2.has(item)));
console.log(intersect);//Set { 2, 3 }
//实现数组交集
console.log([...intersect]);//[2, 3]

//实现差集
let diff = new Set([...s1].filter(item => !s2.has(item)));
console.log(diff); //Set { 1 }
//实现数组差集
console.log([...diff]);// [1]
```

### 3. Map
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。

```
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```
上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串`[object HTMLDivElement]`。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了字符串—值的对应，Map 结构提供了值—值的对应，是一种更完善的 Hash 结构实现。

**如果你需要键值对的数据结构，Map 比 Object 更合适。**

```
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
上面代码使用 Map 结构的set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。
#### 3.1 对同一个键多次赋值，后面的值将覆盖前面的值
```
const map = new Map();
map.set(1, 'aaa').set(1, 'bbb');
map.get(1) // "bbb"
```
#### 3.2 只有对同一个对象的引用，Map 结构才将其视为同一个键
```
const map = new Map();

//这里的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined
map.set(['a'], 22);
console.log(map.get(['a'])); //undefined

const arr = ['a'];
map.set(arr, 22);
console.log(map.get(arr)); //22
```
同理，同样的值的两个实例，在 Map 结构中被视为两个键：

```
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map.set(k1, 111).set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```
上面代码中，变量k1和k2的值是一样的，但是它们在 Map 结构中被视为两个键。

由上述例子可知：**Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。**

**这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。**
#### 3.3 Map 结构转为数组结构(使用扩展运算符（...）)
```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

### 参考文档
1. [ES6的Set和Map数据结构，由你制造](https://juejin.im/post/5acc57eff265da237f1e9f7c)