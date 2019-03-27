### 1. IF/ELSE
既然 JSX 支持 js 与 html 混写，那么交替使用就能解决条件渲染的问题：

```
function render() {
  if (renderComponent1) {
    return <Component1 />;
  } else {
    return <div />;
  }
}
return null;
```
如果不想渲染空元素，最好使用 null 代替空的 div：

```
function render() {
  if (renderComponent1) {
    return <Component1 />;
  } else {
    return null;
  }
}
```
这样对 React 渲染效率有提升。
### 2. 组件变量
将组件赋值到变量，就可以在 return 前任意修改它了。

```
function render() {
  let component = null;

  if (renderComponent1) {
    component = <Component1 />;
  }

  return component;
}
```
### 3. 三元运算符
三元运算符的语法如下：

```
condition ? expr_if_true : expr_if_false
```
用在 JSX 上也很方便：

```
function render() {
  return renderComponent1 ? <Component1 /> : null;
}
```
但三元运算符产生嵌套时，理解成本会变得很高。
### 4. &&
这个是最常用了，因为代码量最少。

```
function render() {
  return renderComponent1 && <Component1 />;
}
```
### 参考文档
1. [精读《React 八种条件渲染》](https://zhuanlan.zhihu.com/p/38220426)