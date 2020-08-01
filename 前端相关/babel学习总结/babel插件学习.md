Babel 是一个通用的多功能的 JavaScript 编译器。你为 Babel 提供一些 JavaScript 代码，Babel 更改这些代码，然后返回给你新生成的代码。
### 名词解释
* **AST：**Abstract Syntax Tree(抽象语法树)
* **DI:** Dependency Injection(依赖注入)
* **babel-types**: 存放AST中的所有节点类型

### 1. 抽象语法树(Abstract syntax tree)
```js
let a = 2;
#对应的抽象语法树如下：
```
```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",//变量声明
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    }
                }
            ],
            "kind": "let"
        }
    ],
    "sourceType": "script"
}
```
抽象语法树是一个对象，该对象会有一个顶级的type属性`Program`,第二个属性是body是一个数组。

* 变量节点：`Identifier`

```js
type:描述该语句的类型 --变量声明语句
kind：变量声明的关键字 -- var
declarations: 声明的内容数组，里面的每一项也是一个对象
	type: 描述该语句的类型
	id: 描述变量名称的对象
		type：定义
		name: 是变量的名字
    init: 初始化变量值得对象
		type: 类型
		value: 值 "is tree" 不带引号
		row: "\"is tree"\" 带引号

```
#### 1.1 抽象语法树-解析器
通过什么工具或库来实现源码转化为抽象语法树？那就是javascript Parser 解析器，他会把js源码转化为抽象的语法树。

**常用的javascript Parser:**

* esprima
* traceur
* acorn
* shift

### 2. Babel的解析引擎
Babel使用的引擎是babylon，babylon并非由babel团队自己开发的，而是fork的acorn项目，不过acorn引擎只提供基本的解析ast的能力，遍历还需要配套的acorn-travesal, 替换节点需要使用acorn-，而这些开发，在Babel的插件体系开发下，变得一体化了。

在loader中配置插件有两种方式：**presets及plugins**，这里要注意presets配置的也是插件，只是优先级比较高，而且它的执行顺序是从左到右的，而plugins的优先级顺序则是从右到左的。

### 3. 使用Babel做代码转换使用到的模块及执行流程
Babel将源码转换AST之后，通过遍历AST树（其实就是一个js对象），对树做一些修改，然后再将AST转成code，即成源码。

将js源码转换为AST用到的模块叫：**babylon**，对树进行遍历并做修改用到的模块叫：**babel-traverse**，将修改后的AST再生成js代码用到的模块则是：**babel-generator**。而babel-core模块则是将三者结合使得对外提供的API做了一个简化，使用babel-core只需要执行以下的简单代码即可：

```js
import { transform } from 'babel-core';
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```
#### 3.1 解析（parse）
使用 `babylon` 解析器对输入的源代码字符串进行解析并生成初始 AST（File.prototype.parse）。

利用 `babel-traverse` 这个独立的包对 AST 进行遍历，并解析出整个树的 path，通过挂载的 metadataVisitor 读取对应的元信息，这一步叫 set AST 过程。
#### 3.2 转换（transform）
transform 过程：遍历 AST 树并应用各 transformers（plugin） 生成变换后的 AST 树
babel 中最核心的是 `babel-core`，它向外暴露出 `babel.transform` 接口。

```js
let result = babel.transform(code, {
    plugins: [
        arrayPlugin
    ]
})
```
#### 3.3 生成（generate）
利用 `babel-generator` 将 AST 树输出为转码后的代码字符串。

### 5. demo
* **参数path:** 是捕获到的节点对应的信息，我们可以通过path.node获得这个节点的AST，在这个基础上进行修改就能完成了我们的目标。Path 是一个对象，它表示两个节点之间的连接。

```js
const babel = require('babel-core');

//babel插件
let MyVisitor = function({types: t}) {
    return {
        visitor: {
            AssignmentExpression(path) {
                if(path.node.operator !== '=') {
                    return;
                }
                //改变当前节点的left和right
                path.node.left = t.identifier('new-name');
                path.node.right = t.identifier('new-lisi');
            }
        }
    };
}

const code = `name = lisi`;
let demo = babel.transform(code, {
    //使用插件
    plugins: [MyVisitor]
});

console.log(demo); //new-name = new-lisi;
```
### 参考文档
1. [理解 Babel 插件](http://web.jobbole.com/88236/)
2. [astexplorer(分析AST结构工具)](https://astexplorer.net/)
3. [babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430)
4. [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-introduction)
5. [Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-introduction)
6. [如何写好.babelrc？Babel的presets和plugins配置解析](https://excaliburhan.com/post/babel-preset-and-plugins.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
7. [babel-types(babel对js代码语法提供的各种类型)](https://www.npmjs.com/package/babel-types)
8. [剖析Babel——Babel总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)
9. [探索 babel 和 babel 插件是怎么工作的](http://web.jobbole.com/94060/?utm_source=blog.jobbole.com&utm_medium=relatedPosts)
10. [如何写好.babelrc？Babel的presets和plugins配置解析](https://excaliburhan.com/post/babel-preset-and-plugins.html)
11. [Babel 从入门到插件开发](http://web.jobbole.com/91277/)
12. [Babel.js插件开发之二 - 开始编写](https://segmentfault.com/a/1190000002986694)
13. [Babel工作原理及Babel插件开发探索](https://fanerge.github.io/Babel%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E5%8F%8ABabel%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8E%A2%E7%B4%A2.html)
14. [babel插件入门-AST](https://juejin.im/post/5ab9f2f3f265da239b4174f0)
15. [babel-types文档链接](https://github.com/babel/babel/tree/master/packages/babel-types)
16. [抽象语法树 Abstract syntax tree](https://juejin.im/post/5ab83f67f265da237e09b2f6)
17. [Esprima](http://esprima.org/demo/parse.html#)
18. [在线可视化AST](http://resources.jointjs.com/demos/javascript-ast)
19. [一看就懂的JS抽象语法树](https://juejin.im/post/5a2bf2dd6fb9a044fd11b0d2)
20. [你真的会用 Babel 吗?](https://juejin.im/post/59b9ffa8f265da06710d8e89)
21. [Babel 内部原理分析](https://octman.com/blog/2016-08-27-babel-notes/)
22. [入门babel--实现一个es6的class转换器](https://juejin.im/post/5ac1c5bf518825558949f898)
23. [13 个示例快速入门 JS 抽象语法树](https://juejin.im/post/5b4d759d51882519a62f5b64)
24. [Babel插件开发入门指南](https://juejin.im/post/5b14257ef265da6e5546b14b)