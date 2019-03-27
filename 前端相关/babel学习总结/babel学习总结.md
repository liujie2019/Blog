## babel学习总结
Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
### 1. 基础安装
如果在CLI(command-line interface命令行界面)使用babel的话，请安装`babel-cli`：

```
# 全局安装
$ npm install -g babel-cli
```

如果想结合`node.js`来使用的话，需要安装`babel-core`：

```
$ npm install -g babel-core
```

### 2. 插件和预设(Plugins and Presets)
babel6里并没有默认的转换规则，所以你安装了如上两项，用babel运行你的文件会发现并没有什么变化，因此我们需要安装所需插件，并在`.babelrc`文件做一些设置:
#### 2.1 例如使用箭头函数

```
$ npm install --save-dev babel-plugin-transform-es2015-arrow-functions
```

同时在`.babelrc`文件添加：

```
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

当然还有很多细节我们不可能一点点全部去安装，我们如果想要转换某些特性的话，可以去安装某个版本的预置，babel可以去向下兼容：

```
# 把ES2015(即ES6）编译成ES5(目前已经废弃)
$ npm install --save-dev babel-preset-es2015
# 在.babelrc文件中添加：
{
  "presets": ["es2015"]
}
```
如果想包含所有javascript版本的话：

```
$ npm install --save-dev babel-preset-env
# 在.babelrc文件中添加
{
  "presets": ["env"]
}
```
> 配置项目所支持浏览器所需的polyfill和transform。只编译所需的代码会使你的代码包更小。

```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```
上面的例子只包含了支持每个浏览器最后两个版本和safari大于等于7版本所需的polyfill和代码转换。我们使用 `browserslist` 来解析这些信息，所以你可以使用 [browserslist](https://github.com/browserslist/browserslist) 支持的有效的查询格式。

>同样，如果你目标开发 Node.js 而不是浏览器应用的话，你可以配置 babel-preset-env 仅包含特定版本所需的polyfill和transform:

```
{
  "presets": [
    ["env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```
>方便起见，你可以使用"node": "current" 来包含用于运行Babel的Node.js最新版所必需的polyfills和transforms。

```
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```
[具体配置详见](https://www.babeljs.cn/docs/plugins/preset-env/)

#### 2.2 Plugin/Preset 排序
插件中每个访问者都有排序问题。

这意味着如果两次转译都访问相同的程序节点，则转译将按照**plugin 或 preset** 的规则进行排序然后执行。

1. Plugin 会运行在 Preset 之前;
2. Plugin 会从第一个开始顺序执行;
3. Preset 的顺序则刚好相反(从最后一个逆序执行)。

```
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
#将先执行 transform-decorators-legacy 再执行 transform-class-properties

一定要记得 preset 的顺序是反向的。举个例子:

{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
#按以下顺序运行: stage-2，react，最后es2015
```
这主要是为了保证向后兼容，因为大多数用户会在`stage-0`之前列出 `es2015`。
#### 2.3 `babel-plugin-transform-runtime`插件
```
# 源代码如下
let obj = {name: 'lisi'};
let obj2 = {age: 23};
let obj3 = Object.assign({}, obj, obj2);

console.log(obj3);
```
```
# 对Object.assign进行编译
# 没有配置babel-plugin-transform-runtime
'use strict';

var obj = { name: 'lisi' };
var obj2 = { age: 23 };
var obj3 = Object.assign({}, obj, obj2);

console.log(obj3);
```
```
# 配置babel-plugin-transform-runtime
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = { name: 'lisi' };
var obj2 = { age: 23 };
var obj3 = (0, _assign2.default)({}, obj, obj2);

console.log(obj3);
```
#### 2.4 babel-polyfill(使得低版本浏览器兼容es6新语法)
```
# 安装
npm install -D babel-polyfill
```
使用方法：

1. require("babel-polyfill");
2. import "babel-polyfill";
3. module.exports = { entry: ["babel-polyfill", "./app/js"] };

**特别说明：第三种方法适用于使用webpack构建的情况，加入到webpack配置文件(webpack.config.js)的entry项中。**

#### 2.5 babel-polyfill和babel-runtime区别
**两种方式的原理：**

* **babel-polyfill：**它不会将代码编译成低版本的ECMAScript，他的原理是当运行环境中并没有实现的一些方法，babel-polyfill中会给做兼容。
* **babel-runtime：**将es6编译成es5去运行，前端可以使用es6的语法来写，最终浏览器上运行的是es5。

**优缺点：**

* **babel-polyfill：**通过向全局对象和内置对象的prototype上添加方法来实现，比如运行环境中不支持Array-prototype.find，引入polyfill，前端就可以放心的在代码里用es6的语法来写；但是这样会造成全局空间污染。比如像Array-prototype.find就不存在了，还会引起版本之前的冲突。不过即便是引入babel-polyfill，也不能全用，代码量比较大。
* **babel-runtime：**不会污染全局对象和内置的对象原型。比如当前运行环境不支持promise，可以通过引入babel-runtime/core-js/promise来获取promise，或者通过babel-plugin-transform-runtime自动重写你的promise。但是它不会模拟内置对象原型上的方法，比如Array-prototype.find，就没法支持了，如果运行环境不支持es6，代码里又使用了find方法，就会出错，因为es5并没有这个方法。

**babel-polyfill 与 babel-runtime 的最大区别在于：babel-polyfill改造目标浏览器，让你的浏览器拥有本来不支持的特性；babel-runtime改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。**

### 3. 命令行转码`babel-cli`
在安装了`babel-cli`之后，在命令行使用`babel`命令去编译文件:

```
# 编译文件
babel es6.js  
# 输出编译后的文件
babel es6.js -o compiled.js
# 监听编译文件变动
babel es6.js -o -w compiled.js
```

安装完`babel-cli`和`babel-core`之后，使用`babel-node`命令去编译并运行文件(不适于生产环境)

```
# 编译并运行文件
$ babel-node es6.js
```
### 4. 配置文件`.babelrc`
Babel的配置文件是 `.babelrc` ，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。**babel 会自动读取 `.babelrc` 里的配置并应用到编译中。**

该文件用来设置转码规则和插件，基本格式如下：

```
{
  "presets": [],
  "plugins": []
}
```
`presets` 字段设定转码规则，官方提供以下的规则集，你可以根据需要安装：

```
ES2015转码规则
$ npm install --save-dev babel-preset-es2015

react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个,其中0功能最全
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
然后，将这些规则加入 `.babelrc`：

```
 {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```
**注意：** 所有Babel工具和模块的使用，都必须先写好 `.babelrc` 。

需要注意的是：`babel-preset-env` 等同于 `babel-preset-latest`，同时又等同于`babel-preset-es2015`, `babel-preset-es2016`和`babel-preset-es2017`三者的集合。

```
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 1 Chrome versions"] //表示只想支持最新版本的Chrome
      }
    }]
  ]
}
```
最新版本的 Chrome 已经支持箭头函数、class、const，所以 babel 在编译过程中，不会编译它们。这也是为什么我们把 `@babel/preset-env` 称为 JavaScript 的 `Autoprefixer`。

### 5. babel-cli(命令行转码)
Babel提供 `babel-cli` 工具，用于命令行转码。
安装命令如下:

```
# 局部安装
npm install --save-dev babel-cli
# 全局安装
npm isntall babel-cli -g
```
基本用法:

```
# 将转码结果输出到标准输出(输出到命令行窗口)
$ babel example.js
# 局部安装使用
# 转码结果写入一个新的文件，--out-file 或 -o 参数指定输出文件
node_module/.bin/babel example.js --out-file compiled.js
# 全局安装使用
babel example.js --out-file compiled.js
# 或者
babel example.js -o compiled.js
# 整个目录转码，使用--out-dir 或 -d 参数指定输出目录
babel src --out-dir lib
或者
$ babel src -d lib
# 使用-s参数来生成source map文件
$ babel src -d lib -s
```
在上面给出的转码命令是在全局环境下利用Babel进行转码。也就是说，如果项目要运行，全局环境必须有Babel，这就导致项目对环境产生了依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。
尽管你可以把 Babel CLI 全局安装在你的机器上，但是在项目中安装会更好。
有两个主要的原因：

1. 在同一台机器上的不同项目或许会依赖不同版本的 Babel 并允许你有选择的更新。
2. 这意味着项目对工作环境没有隐式依赖，这可以让项目有很好的可移植性并且易于安装。
对这一问题，相应的解决办法是将 `babel-cli` 安装在项目中：

然后，在 `package.json` 文件中的 `scripts` 字段中加入：

```
"scripts": {
    "build": "babel src -d lib"
  }
```
要对项目文件进行转码的时候，就执行下面的命令：

```
$ npm run build
```
**注意：** 由于全局运行 Babel 是一个坏习惯，如果你要卸载全局安装的版本可以执行：

```
npm uninstall -g babel-cli
```

### 6. babel-node(运行代码，是babel-cli 下的一个 command)
`babel-cli` 工具自带一个 `babel-node `命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。`babel-node`实现了 node 执行脚本和命令行写代码的能力。

它不用单独安装，而是随 `babel-cli` 一起安装。然后，执行 `babel-node` 就进入PEPL环境。

```
$ babel-node
> (x => x * 3)(2)
6
```
`babel-node` 命令可以直接运行ES6脚本。将上面的代码放入脚本文件demo.js，然后直接运行:

```
$ babel-node demo.js
6
```
`babel-node` 也可以安装在项目中:

```
$ npm install --save-dev babel-node
```
然后，改写package.json文件中的 `scripts` 字段：

```
  "scripts": {
    "script-name": "babel-node script.js"
  }
```
上面代码中，使用 `babel-node` 替代 `node` ，这样script.js本身就不用做任何转码处理。

### 7. babel-register
`babel-register` 模块改写 `require` 命令，为它加上一个钩子。此后，每当使用 `require` 加载 `.js` 、 `.jsx` 后缀名的文件，就会先用 `Babel` 进行转码。

```
$ npm install --save-dev babel-register
```
使用时，必须首先加载 `babel-register` 。

```
require("babel-register");
require("./index.js");
```
然后，就不需要手动对index.js转码了。
需要注意的是， `babel-register` 只会对 `require` 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在 **开发环境** 中使用。

### 8. babel-core
`babel-core`可以看做`babel`的编译器。`babel`的核心`api`都在这里面。
如果某些代码需要调用babel的API进行转码，就要使用 `babel-core` 模块。
安装命令如下：

```
$ npm install babel-core --save
```
然后，在项目中就可以调用 `babel-core` ：

```
var babel = require('babel-core');
```
### 9. 使用`webpack`工具

#### 9.1 安装
除了安装`babel`自己的包，还需要多装一个`babel-loader`配合`webpack`使用。

```
npm install --save-dev babel-loader babel-core
```
#### 9.2 使用
在`webpack.config.js`中加入`loader`相应的配置：

```
module: {
  rules: [
    { 
    	test: /\.js$/, 
    	exclude: /node_modules/, 
    	use: ['babel-loader'] 
    }
  ]
}
```
### 10. babel 的配置
目前`babel`官方推荐是写到`.babelrc`文件下，你还可以在`package.json`里面添加`babel`字段。不用配置文件的话，可以把配置当做参数传给`babel-cli`。
#### 10.1 使用`.babelrc`配置文件

```
{
"presets": [
 	[
 		"env",
 		{
        "targets": { // 配支持的环境
          "browsers": [ // 浏览器
            "last 2 versions",
            "safari >= 7"
          ],
          "node": "current"
        },
        "modules": true,  //设置ES6 模块转译的模块格式 默认是 commonjs
        "debug": true, // debug，编译的时候 console
        "useBuiltIns": false, // 是否开启自动支持 polyfill
        "include": [], // 总是启用哪些 plugins
        "exclude": []  // 强制不启用哪些 plugins，用来防止某些插件被启用
      }
 	]
],
"plugins": [
 ["transform-runtime", {
   "helpers": true,
   "polyfill": true,
   "regenerator": true,
   "moduleName": "babel-runtime"
 }]
]
}
```
#### 10.2 在`package.json`文件中配置

```
"babel": {
"presets": [
  "env"
],
}
```
#### 10.3 在命令行参数中配置

```
babel example.js --plugins=transform-runtime --presets=env
```
### 11. `webpack`和`babel`配置`react`开发环境
#### 11.1 安装`react`
```
# 安装以下两个包
npm install --save react react-dom
```
#### 11.2 安装babel以及相应的包
要让`babel`转换`react`代码，首先要安装好`babel`，再装`babel`转化`react`的包。

```
npm install --save-dev babel-core babel-preset-react babel-preset-env
# babel-preset-env这个插件很全，能把所有es6语法都转化
```
创建`.babelrc`文件，并进行如下配置：

```
{
  "presets": ["env", "react"]
}
```
但是，有时候我们不需要那么全的功能，比如说只需要能转化async函数即可。`babel-plugin-transform-async-to-generator`这个插件就能办到。

```
npm install --save-dev babel-plugin-transform-async-to-generator
```
安装完之后，直接在命令行里转化：

```
babel index.js --out-file main.js --plugins=transform-async-to-generator
```
[更多插件详见](https://babeljs.io/docs/plugins/)
#### 11.3 在`webpack`中配置`babel-loader`
需要在`webpack`中使用一个`loader`来转化`react`的代码。

```
# 安装相应的loader
npm install --save-dev babel-loader
```

```
# 相应的配置文件webpack.config.js
module.exports = {
  entry: './src/app.js',
  ...
  module: {
    rules: [
       { 
	      	test: /\.(js | jsx)$/, 
	      	loader: 'babel-loader', 
	      	exclude: /node_modules/ 
      	}
    ]
  }
};
```
### 12. 问题处理
#### 对ES7async的支持
使用 eES7的async 会报：`ReferenceError: regeneratorRuntime is not defined".`

```
$ npm i --save-dev babel-plugin-transform-runtime
```
在 `.babelrc` 文件中添加：

```
"plugins": [[
    "transform-runtime",
    {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }
 ]]
 ```

### 参考文章
1. [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
2. [babel 教程](https://blog.zfanw.com/babel-js/)
3. [Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
4. [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
5. [plugins](https://babeljs.cn/docs/plugins/)
6. [babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430)
7. [Babel 全家桶](https://github.com/brunoyang/blog/issues/20)
8. [Runtime transform · Babel](https://babeljs.io/docs/plugins/transform-runtime/)
9. [Polyfill · Babel](https://babeljs.io/docs/usage/polyfill/#usage-in-node--browserify--webpack)
10. [babel-polyfill vs babel-runtime](https://blog.souche.com/babel-polyfill-vs-babel-runtime/)
11. [babel到底该如何配置？](https://juejin.im/post/59ec657ef265da431b6c5b03)