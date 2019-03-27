### 1. Immutable 的几种数据类型

* List: 有序索引集，类似 JavaScript 中的 Array。
* Map: 无序索引集，类似 JavaScript 中的 Object。
* OrderedMap: 有序的 Map，根据数据的 set()进行排序。
* Set: 没有重复值的集合。
* OrderedSet: 有序的 Set，根据数据的 add 进行排序。
* Stack: 有序集合，支持使用 unshift（）和 shift（）添加和删除。
* Range(): 返回一个 Seq.Indexed 类型的集合，这个方法有三个参数，start 表示开始值，默认值为 0，end 表示结束值，默认为无穷大，step 代表每次增大的数值，默认为 1.如果 start = end,则返回空集合。
* Repeat(): 返回一个 vSeq.Indexe 类型的集合，这个方法有两个参数，value 代表需要重复的值，times 代表要重复的次数，默认为无穷大。
* Record: 一个用于生成 Record 实例的类。类似于 JavaScript 的 Object，但是只接收特定字符串为 key，具有默认值。
* Seq: 序列，但是可能不能由具体的数据结构支持。
* Collection: 是构建所有数据结构的基类，不可以直接构建。

用的最多就是 List 和 Map，所以在这里主要介绍这两种数据类型的 API。

### 2. API 的使用
#### 1. fromJS()
作用：将一个 js 数据转换为 Immutable 类型的数据。

用法：fromJS(value, converter)

简介：value 是要转变的数据，converter 是要做的操作。第二个参数可不填，默认情况会将数组准换为 List 类型，将对象转换为 Map 类型，其余不做操作。
#### 2. toJS()
作用：将一个 Immutable 数据转换为 JS 类型的数据。

用法：value.toJS()
#### 3. is()
作用：对两个对象进行比较。

用法：is(map1,map2)

简介：和 js 中对象的比较不同，在 js 中比较两个对象比较的是地址，但是在 Immutable 中比较的是这个对象 hashCode 和 valueOf，只要两个对象的 hashCode 相等，值就是相同的，避免了深度遍历，提高了性能。
#### 4. List 和 Map
##### 创建：List() 和 Map()
作用：用来创建一个新的 List/Map 对象
##### List.of() 和 Map.of()
作用：创建一个新的包含 value 的 List/Map 对象
##### 判断：List.isList() 和 Map.isMap()
作用：判断一个数据结构是不是 List/Map 类型
##### 长度：size
作用：获取 List/Map 的长度
##### 数据读取：get() 、 getIn()
作用：获取数据结构中的数据
##### has() 、 hasIn()
作用:判断是否存在某一个 key
##### includes()
作用：判断是否存在某一个 value
##### first() 、 last()
作用：用来获取第一个元素或者最后一个元素，若没有则返回 undefined
### 3. 数据修改

注：这里对于数据的修改，是对原数据进行操作后的值赋值给一个新的数据，并不会对原数据进行修改，因为 Immutable 是不可变的数据类型。
#### 设置 set()
作用：设置第一层 key、index 的值
#### setIn()
作用：设置深层结构中某属性的值
#### 删除 delete
作用：用来删除第一层结构中的属性
#### deleteIn()
用来删除深层数据，用法参考 setIn
#### deleteAll() (Map 独有，List 没有)
作用：用来删除 Map 中的多个 key

用法：deleteAll(keys: Iterable<K>): this
#### 更新 update()
作用：对对象中的某个属性进行更新，可对原数据进行相关操作
#### updateIn()
用法参考 setIn
#### 清除 clear()
作用：清除所有数据

用法：clear(): this

#### List 中的各种删除与插入

List 对应的数据结构是 js 中的数组，所以数组的一些方法在 Immutable 中也是通用的，比如 push，pop,shift，unshift，insert。

* push()：在 List 末尾插入一个元素
* pop(): 在 List 末尾删除一个元素
* unshift: 在 List 首部插入一个元素
* shift: 在 List 首部删除一个元素
* insert：在 List 的 index 处插入元素

### 关于 merge
#### merge
作用：浅合并，新数据与旧数据对比，旧数据中不存在的属性直接添加，就数据中已存在的属性用新数据中的覆盖
#### mergrWith
作用：自定义浅合并，可自行设置某些属性的值
#### mergeIn
作用：对深层数据进行浅合并
#### mergeDeep
作用：深合并，新旧数据中同时存在的的属性为新旧数据合并之后的数据
#### mergeDeepIn
作用：对深层数据进行深合并
#### mergrDeepWith
作用:自定义深合并，可自行设置某些属性的值

### 



### 参考文档
1. [immutable入坑指南](http://www.aliued.com/?p=4175)
2. [Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)
3. [Immutable 常用 API 简介](https://wolfx.cn/immutable-api/?)
4. [immutable-js](https://facebook.github.io/immutable-js/)
5. [Immutable 操作在 React 中的实践](https://juejin.im/post/5aefff6a518825672a02d7d8)
6. [我们需要注意的 immutable 操作](https://juejin.im/post/5aa8ae316fb9a028bd4c0202)
7. [Immutable 操作在 React 中的实践](https://juejin.im/post/5aefff6a518825672a02d7d8)
8. [如何用React+Redux+ImmutableJS进行SPA开发](http://yunlaiwu.github.io/blog/2016/12/01/react+redux+immutablejs/)
9. [精读 Immutable 结构共享](https://zhuanlan.zhihu.com/p/27133830)
10. [为什么用Immutable.js代替普通js对象？](https://zhuanlan.zhihu.com/p/29983598)
11. [可变对象与 immutable.js](https://zhuanlan.zhihu.com/p/34231785)
12. [Immutable.js 以及在 react+redux 项目中的实践](https://juejin.im/post/5948985ea0bb9f006bed7472)
13. [Immutable 详解及 React 中实践](https://www.cnblogs.com/dhsz/p/6855336.html)