[TOC]
## 手写webpack
```bash
npm init -y
npm i webpack webpack-cli -D
```
>`webpack.config.js`：

```js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```
执行`npx webpack`，生成文件`bundle.js`：

```js
(function (modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {

        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        module.l = true;

        return module.exports;
    }


    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
    "./src/a.js":
        (function (module, exports, __webpack_require__) {
            eval("let b = __webpack_require__(/*! ./base/b */ \"./src/base/b.js\")\n\nmodule.exports = 'a'+ b\n\n\n\n//# sourceURL=webpack:///./src/a.js?");
        }),
    "./src/base/b.js":
        (function (module, exports) {
            eval("module.exports = 'b'\n\n\n//# sourceURL=webpack:///./src/base/b.js?");
        }),
    "./src/index.js":
        (function (module, exports, __webpack_require__) {
            eval(" let str = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\n\n console.log(str);\n\n\n//# sourceURL=webpack:///./src/index.js?");
        })

});
```
新建项目用于自己的`webpack`，这里叫`may-pack`

```bash
npm init -y
```
在node中，如果想执行命令，需要创建`bin`文件，再创建`may-pack.js`。配置`package.json`：

```js
{
  "name": "may-pack",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "bin": {
    "may-pack": "./bin/may-pack.js"
  }
}
```

`may-pack.js`

```js
#!  /usr/bin/env node
// node环境
console.log('start');
```
运行`npm link`将npm模块链接到对应的运行项目中去，方便地对模块进行调试和测试。

link成功后，在我们本地`/Users/liujie26/.nvm/versions/node/v8.16.0/bin`目录下就会多一个`my-webpack`文件，其对应是`/Users/liujie26/.nvm/versions/node/v8.16.0/lib`目录下的`/node_modules/my-webpack/bin/my-webpack.js`文件。
```js
/Users/liujie26/.nvm/versions/node/v8.16.0/bin/my-webpack -> /Users/liujie26/.nvm/versions/node/v8.16.0/lib/node_modules/my-webpack/bin/my-webpack.js
/Users/liujie26/.nvm/versions/node/v8.16.0/lib/node_modules/my-webpack -> /Users/liujie26/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/my-webpack
```
>运行：
```js
my-webpack
// 输出
hello my-webpack
```
在想运行`my-webpack`的项目中运行`npm link my-webpack`。
```js
npm link my-webpack
/Users/liujie26/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/webpack-dev/node_modules/my-webpack -> /Users/liujie26/.nvm/versions/node/v8.16.0/lib/node_modules/my-webpack -> /Users/liujie26/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/my-webpack
```
>运行：
```js
npx my-webpack
// 输出
hello my-webpack
```

>需要注意：`#!  /usr/bin/env node`是说明当前代码需要在Node环境下执行。

[返回目录](#目录)
## webpack分析及处理

`may-pack.js`

```js
#!  /usr/bin/env node

// node环境

console.log('start');

let path = require('path')

// 拿到配置文件webpack.config.js
let config = require(path.resolve('webpack.config.js'));


let Compiler = require('../lib/Compiler.js');

let compiler = new Compiler(config);

// 标识运行编译
compiler.run()

```

创建`lib`文件`Compiler.js`

```js
let path = require('path');
let fs = require('fs');

class Compiler {
    constructor(config) {
        // entry  output
        this.config = config
        // 需要保存入口文件的路径
        this.entryId = '';   // './src/index.js'
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry  // 入口文件
        // 工作目录
        this.root = process.cwd(); // 当前运行npx的路径
    }

    // 构建模块
    // modulePath表示模块路径
    // isEntry标识是否是入口模块
    buildModule(modulePath, isEntry) {

    }

    // 发射文件
    emitFile() {
        // 用数据 渲染想要的
    }

    run() {
        // 执行创建模块的依赖关系
        // true表示是入口模块
        this.buildModule(path.resolve(this.root, this.entry), true)  // path.resolve(this.root, this.entry) 得到入口文件的绝对路径
        // 发射打包后的文件
        this.emitFile()
    }
}
module.exports = Compiler;
```
主要两个任务
1. 拿到入口Id
2. 解析模块，也就是实现`buildModule`方法

[返回目录](#目录)
## 创建依赖关系

`may-pack`中`Compiler.js`

```js
let path = require('path');
let fs = require('fs');
// babylon  主要把源码转成ast Babylon 是 Babel 中使用的 JavaScript 解析器。
// @babel/traverse 对ast解析遍历语法树 负责替换，删除和添加节点
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成

let babylon = require('babylon');
let traverse = require('@babel/traverse').default;
let type = require('@babel/types');
let generator = require('@babel/generator').default;
class Compiler {
    constructor(config) {
        // entry  output
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId = '';   // './src/index.js'
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry ; // 入口文件
        // 工作目录
        this.root = process.cwd(); // 当前运行npx的路径
    }
    // 拿到模块内容
    getSource (modulePath) {
        let content = fs.readFileSync(modulePath, 'utf8');
        return content;
    }
    parse (source, parentPath) {
        console.log(source, parentPath);
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块内容
        let source = this.getSource(modulePath); // 得到入口文件的内容
        // 模块id modulePath(需要相对路径) = modulePath(模块路径) - this.root(项目工作路径)   src/index.js
        let moduleName = './' + path.relative(this.root, modulePath);
        console.log(source, moduleName);  // 拿到代码 和相对路径 ./src/index.js
        if (isEntry) {
            this.entryId = moduleName;
        }
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));   // ./src
        // 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
    }

    // 发射文件
    emitFile() {
        // 用数据 渲染想要的
    }

    run() {
        // 执行 创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);  // path.resolve(this.root, this.entry) 得到入口文件的绝对路径
        console.log(this.modules, this.entryId);
        // 发射打包后的文件
        this.emitFile();
    }
}

module.exports = Compiler;
```
[返回目录](#目录)
## AST递归解析
* `parse`方法主要靠解析语法树来进行转义；
* `babylon`  主要把源码转成ast Babylon 是 Babel 中使用的 JavaScript 解析器。
* `@babel/traverse` 对ast解析遍历语法树 负责替换，删除和添加节点；
* `@babel/types` 用于AST节点的Lodash-esque实用程序库；
*`@babel/generator`结果生成

```bash
npm i babylon @babel/traverse @babel/types @babel/generator
```

`may-pack`中`Compiler.js`

```js
let path = require('path')
let fs = require('fs')
// babylon  主要把源码转成ast Babylon 是 Babel 中使用的 JavaScript 解析器。
// @babel/traverse 对ast解析遍历语法树 负责替换，删除和添加节点
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成

let babylon = require('babylon')
let traverse = require('@babel/traverse').default;
let type = require('@babel/types');
let generator = require('@babel/generator').default
class Compiler {
    constructor(config) {
        // entry  output
        this.config = config
        // 需要保存入口文件的路径
        this.entryId = '';   // './src/index.js'
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry  // 入口文件
        // 工作目录
        this.root = process.cwd(); // 当前运行npx的路径
    }
    // 拿到模块内容
    getSource (modulePath) {
        let content = fs.readFileSync(modulePath, 'utf8')
        return content
    }
    parse (source, parentPath) {
        // AST解析语法树
        let ast = babylon.parse(source)
        let dependencies = []; // 依赖的数组
        // https://astexplorer.net/
        traverse(ast, {
            // 调用表达式
            CallExpression(p) {
                let node = p.node; //对应的节点
                if(node.callee.name === 'require') {
                   node.callee.name = '__webpack_require__'
                    let moduledName = node.arguments[0].value   // 取到模块的引用名字
                    moduledName = moduledName + (path.extname(moduledName) ? '' : '.js');  // ./a.js
                    moduledName = './' + path.join(parentPath, moduledName)  // './src/a.js'
                    dependencies.push(moduledName)
                    node.arguments = [type.stringLiteral(moduledName)] // 改掉源码
                }
            }
        })
        // 重新生成
        let sourceCode = generator(ast).code
        return { sourceCode, dependencies }
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块内容
        let source = this.getSource(modulePath)  // 得到入口文件的内容
        // 模块id modulePath(需要相对路径) = modulePath(模块路径) - this.root(项目工作路径)   src/index.js
        let moduleName = './' + path.relative(this.root, modulePath)
        // console.log(source, moduleName);  // 拿到代码 和相对路径 ./src/index.js
        if (isEntry) {
            this.entryId = moduleName
        }
        // 解析把source源码进行改造， 返回一个依赖列表
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName))   // ./src
        // 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode
        dependencies.forEach(dep => {  // 附模块的加载 递归加载
             // false标识不是入口模块
            this.buildModule(path.join(this.root, dep), false)
        })
    }

    // 发射文件
    emitFile() {
        // 用数据 渲染想要的
    }

    run() {
        // 执行 创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true)  // path.resolve(this.root, this.entry) 得到入口文件的绝对路径
        console.log(this.modules, this.entryId);
        // 发射打包后的文件
        this.emitFile()
    }


}

module.exports = Compiler;

```
[返回目录](#目录)
## 生成打包结果

使用ejs模板

`may-pack`中`main.ejs`
```js
(function (modules) {
var installedModules = {};

function __webpack_require__(moduleId) {

if (installedModules[moduleId]) {
return installedModules[moduleId].exports;
}
var module = installedModules[moduleId] = {
i: moduleId,
l: false,
exports: {}
};

modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

module.l = true;

return module.exports;
}


// Load entry module and return exports
return __webpack_require__(__webpack_require__.s = "<%-entryId %>");
})({
<% for(let key in modules){ %>
    "<%- key %>":
    (function (module, exports,__webpack_require__) {
eval(`<%-modules[key] %>`);
}),
<% } %>
});
```
[ejs入门](https://ejs.bootcss.com/)

```bash
yarn add ejs
```
`may-pack`中`Compiler.js`

```js
let ejs = require('ejs');
```

```js
// 发射文件
    emitFile() {
        // 用数据 渲染想要的
        // 输出到那个目录下
        let main = path.join(this.config.output.path, this.config.output.filename)
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'))
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules})
        this.assets = {}
        // 路径对应的代码
        this.assets[main] = code
        fs.writeFileSync(main, this.assets[main])
    }
```

在`webpack-training`项目中运行`npx may-pack`, 得到`bundle.js`，运行得到结果。

[返回目录](#目录)
## 增加loader

创建`loader`文件夹，创建`less-loader.js`和`style-loader.js`

`yarn add less`

[less使用](http://lesscss.cn/#using-less)

`less-loader`

```js
// 将less转为css
let less = require('less')

function loader(source) {
    let css = ''
    less.render(source, function (err, output) {
        css = output.css
    })
    css = css.replace(/\n/g, '\\n');
    return css
}

module.exports = loader;
```
`style-loader`：

```js
// 将css插入到html头部
function loader(source) {
    console.log(111);
    let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
   `
    return style;
}
module.exports = loader;
// JSON.stringify(source) 可以将代码转为一行
```
`webpack.config.js`：
```js
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'style-loader'),
                    path.resolve(__dirname, 'loader', 'less-loader')
                ]
            }
        ]
    }
}
```
>创建`index.less`：

```css
body {
  background: red
}
```
`index.js`
```js
 let str = require('./a.js');
 require('./index.less');
 console.log(str);
```
`may-pack`中`Compiler.js`
```js
// 拿到模块内容
    getSource (modulePath) {
        // 匹配各种文件的规则
        let rules= this.config.module.rules;   // webpack.config.js 中rules的数组
        let content = fs.readFileSync(modulePath, 'utf8')

        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i]
            let {test, use} = rule
            let len = use.length - 1

            if (test.test(modulePath)) {
                // console.log(use[len]);
                function normalLoader () {
                    // console.log(use[len--]);
                    let loader = require(use[len--])
                    content = loader(content)
                    // 递归调用loader 实现转化
                    if (len >= 0) {
                        normalLoader()
                    }
                }
                normalLoader()
            }

        }
        return content
    }
```

运行`npx may-pack`

[返回目录](#目录)
## 增加plugins
```
npm i tapable
```

`may-pack`中`Compiler.js`

```js
constructor(config) {
    // entry  output
    this.config = config;
    // 需要保存入口文件的路径
    this.entryId = '';   // './src/index.js'
    // 需要保存所有的模块依赖
    this.modules = {};
    this.entry = config.entry;  // 入口文件
    // 工作目录
    this.root = process.cwd(); // 当前运行npx的路径

    this.hooks = {
        entryOption: new SyncHook(),  // 入口选项
        compile: new SyncHook(), // 编译
        afterCompile: new SyncHook(),  // 编译完成
        afterPlugins: new SyncHook(),   // 编译完插件
        run: new SyncHook(), // 运行
        emit: new SyncHook(), // 发射
        done: new SyncHook() // 完成
    }
    // 如果传递了plugins参数
    let plugins = this.config.plugins
    if (Array.isArray(plugins)) {
        plugins.forEach(plugin => {
            plugin.apply(this); // 这里只是appLy方法不是改变this指向
        })
    }
    this.hooks.afterPlugins.call();
}
```

在`webpack.config.js`中写插件方法

```js
class P {
    apply(compiler) {   // 这里只是appLy方法不是改变this指向
        // 绑定
        compiler.hooks.emit.tap('emit', function () {
            console.log('emit');
        })
    }
}

class P1 {
    apply(compiler) {   // 这里只是appLy方法不是改变this指向
        // 绑定
        compiler.hooks.afterPlugins.tap('emit', function () {
            console.log('afterPlugins');
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'style-loader'),
                    path.resolve(__dirname, 'loader', 'less-loader')
                ]
            }
        ]
    },
    plugins: [
        new P(),
        new P1()
    ]
}
```
然后在各个地方调用，`may-pack`中`may-pack.js`：

```js
// 调用
compiler.hooks.entryOption.call()
// 标识运行编译
compiler.run()
```

`may-pack`中`Compiler.js`
```js
run() {
    this.hooks.run.call();

    this.hooks.compile.call();
    // 执行 创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);  // path.resolve(this.root, this.entry) 得到入口文件的绝对路径
    // console.log(this.modules, this.entryId);
    this.hooks.afterCompile.call()
    // 发射打包后的文件
    this.emitFile()
    this.hooks.emit.call()
    this.hooks.done.call()
}
```

运行`npx may-pack`

[返回目录](#目录)
