# webshell学习总结

## 目录
- [介绍](#介绍)
- [简单使用](#简单使用)
  - [安装](#安装)
  - [初始化](#初始化)
  - [插件](#插件)

## 介绍
>xterm.js是什么?

xterm是一个使用TypeScript编写的前端终端组件，并在Vscode等热门项目中得到了应用。

## 简单使用
### 安装
```js
npm install xterm -S
```
### 初始化
```js
import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';

// 初始化终端
const xterm = new Terminal();

// 将xterm挂载到响应的dom节点上
xterm.open(document.getElementById('xterm-container'));

xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
```
**[⬆ 返回顶部](#webshell学习总结)**

### 插件

## API文档
### 属性
- cols
- element
- markers
- rows
- textarea
- strings





**[⬆ 返回顶部](#webshell学习总结)**
## 参考文档
1. [https://xtermjs.org/](https://xtermjs.org/)
2. [xterm.js](https://github.com/xtermjs/xterm.js/)
3. [初窥Xterm.js](https://segmentfault.com/a/1190000018712469)