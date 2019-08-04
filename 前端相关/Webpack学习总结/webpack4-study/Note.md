## 目录
- [目录](#%e7%9b%ae%e5%bd%95)
- [webpack基础配置](#webpack%e5%9f%ba%e7%a1%80%e9%85%8d%e7%bd%ae)
  - [项目初始化](#%e9%a1%b9%e7%9b%ae%e5%88%9d%e5%a7%8b%e5%8c%96)
- [webpack打包输出文件分析](#webpack%e6%89%93%e5%8c%85%e8%be%93%e5%87%ba%e6%96%87%e4%bb%b6%e5%88%86%e6%9e%90)
- [webpack-dev-server](#webpack-dev-server)
- [自动生成html](#%e8%87%aa%e5%8a%a8%e7%94%9f%e6%88%90html)
- [样式处理](#%e6%a0%b7%e5%bc%8f%e5%a4%84%e7%90%86)
  - [处理css](#%e5%a4%84%e7%90%86css)
  - [处理less](#%e5%a4%84%e7%90%86less)
  - [抽离样式文件](#%e6%8a%bd%e7%a6%bb%e6%a0%b7%e5%bc%8f%e6%96%87%e4%bb%b6)
  - [压缩css和js](#%e5%8e%8b%e7%bc%a9css%e5%92%8cjs)
  - [css加兼容浏览器的前缀](#css%e5%8a%a0%e5%85%bc%e5%ae%b9%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e5%89%8d%e7%bc%80)
- [转化es6+语法](#%e8%bd%ac%e5%8c%96es6%e8%af%ad%e6%b3%95)
- [全局变量引入](#%e5%85%a8%e5%b1%80%e5%8f%98%e9%87%8f%e5%bc%95%e5%85%a5)
- [图片打包处理](#%e5%9b%be%e7%89%87%e6%89%93%e5%8c%85%e5%a4%84%e7%90%86)
- [打包文件分类](#%e6%89%93%e5%8c%85%e6%96%87%e4%bb%b6%e5%88%86%e7%b1%bb)
- [打包多页面应用](#%e6%89%93%e5%8c%85%e5%a4%9a%e9%a1%b5%e9%9d%a2%e5%ba%94%e7%94%a8)
- [配置source-map](#%e9%85%8d%e7%bd%aesource-map)
- [watch用法](#watch%e7%94%a8%e6%b3%95)
- [webpack小插件应用](#webpack%e5%b0%8f%e6%8f%92%e4%bb%b6%e5%ba%94%e7%94%a8)
  - [clean-webpack-plugin](#clean-webpack-plugin)
  - [copy-webpack-plugin](#copy-webpack-plugin)
  - [BannerPlugin](#bannerplugin)
- [webpack跨域问题](#webpack%e8%b7%a8%e5%9f%9f%e9%97%ae%e9%a2%98)
  - [特殊场景一：如果后端给的请求路径中没有`/api`：](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%b8%80%e5%a6%82%e6%9e%9c%e5%90%8e%e7%ab%af%e7%bb%99%e7%9a%84%e8%af%b7%e6%b1%82%e8%b7%af%e5%be%84%e4%b8%ad%e6%b2%a1%e6%9c%89api)
  - [特殊场景二：前端单纯mock数据](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%ba%8c%e5%89%8d%e7%ab%af%e5%8d%95%e7%ba%afmock%e6%95%b0%e6%8d%ae)
  - [特殊场景三：有服务端，不用代理](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%b8%89%e6%9c%89%e6%9c%8d%e5%8a%a1%e7%ab%af%e4%b8%8d%e7%94%a8%e4%bb%a3%e7%90%86)
- [resolve属性的配置](#resolve%e5%b1%9e%e6%80%a7%e7%9a%84%e9%85%8d%e7%bd%ae)
- [定义环境变量](#%e5%ae%9a%e4%b9%89%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)
- [区分不同环境](#%e5%8c%ba%e5%88%86%e4%b8%8d%e5%90%8c%e7%8e%af%e5%a2%83)
- [webpack优化](#webpack%e4%bc%98%e5%8c%96)
  - [noParse](#noparse)
  - [exclude&include](#excludeinclude)
  - [IgnorePlugin](#ignoreplugin)
  - [dllPlugin](#dllplugin)
  - [happyPack](#happypack)
  - [webpack自带的优化](#webpack%e8%87%aa%e5%b8%a6%e7%9a%84%e4%bc%98%e5%8c%96)
    - [tree-shaking](#tree-shaking)
    - [作用域提升](#%e4%bd%9c%e7%94%a8%e5%9f%9f%e6%8f%90%e5%8d%87)
- [抽取公共代码](#%e6%8a%bd%e5%8f%96%e5%85%ac%e5%85%b1%e4%bb%a3%e7%a0%81)
- [懒加载](#%e6%87%92%e5%8a%a0%e8%bd%bd)
- [热更新](#%e7%83%ad%e6%9b%b4%e6%96%b0)
- [tapable介绍](#tapable%e4%bb%8b%e7%bb%8d)
  - [SyncHook](#synchook)
  - [SyncBailHook](#syncbailhook)
  - [SyncWaterfallHook](#syncwaterfallhook)
  - [SyncLoopHook](#syncloophook)
  - [AsyncParallelHook&AsyncParallelBailHook](#asyncparallelhookasyncparallelbailhook)
    - [AsyncParallelHook](#asyncparallelhook)
    - [AsyncParallelBailHook](#asyncparallelbailhook)
  - [异步串行](#%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8c)
    - [AsyncSeriesHook](#asyncserieshook)
  - [AsyncSeriesBailHook](#asyncseriesbailhook)
  - [AsyncSeriesWaterfallHook](#asyncserieswaterfallhook)
- [手写webpack](#%e6%89%8b%e5%86%99webpack)
- [webpack分析及处理](#webpack%e5%88%86%e6%9e%90%e5%8f%8a%e5%a4%84%e7%90%86)
- [创建依赖关系](#%e5%88%9b%e5%bb%ba%e4%be%9d%e8%b5%96%e5%85%b3%e7%b3%bb)
- [AST递归解析](#ast%e9%80%92%e5%bd%92%e8%a7%a3%e6%9e%90)
- [生成打包结果](#%e7%94%9f%e6%88%90%e6%89%93%e5%8c%85%e7%bb%93%e6%9e%9c)
- [增加loader](#%e5%a2%9e%e5%8a%a0loader)
- [增加plugins](#%e5%a2%9e%e5%8a%a0plugins)
- [loader](#loader)
  - [loader配置](#loader%e9%85%8d%e7%bd%ae)
  - [babel-loader实现](#babel-loader%e5%ae%9e%e7%8e%b0)
  - [banner-loader实现](#banner-loader%e5%ae%9e%e7%8e%b0)
  - [file-loader和url-loader实现](#file-loader%e5%92%8curl-loader%e5%ae%9e%e7%8e%b0)
  - [less-loader和css-loader](#less-loader%e5%92%8ccss-loader)
- [`css-loader`](#css-loader)
- [webpack中的插件](#webpack%e4%b8%ad%e7%9a%84%e6%8f%92%e4%bb%b6)
  - [文件列表插件](#%e6%96%87%e4%bb%b6%e5%88%97%e8%a1%a8%e6%8f%92%e4%bb%b6)
  - [内联webpack插件](#%e5%86%85%e8%81%94webpack%e6%8f%92%e4%bb%b6)
- [打包后自动发布](#%e6%89%93%e5%8c%85%e5%90%8e%e8%87%aa%e5%8a%a8%e5%8f%91%e5%b8%83)

## webpack基础配置
### 项目初始化
```bash
npm init -y
npm i webpack webpack-cli -D
```

```js
const path = require('path');

module.exports = {
    mode: 'production', // 模式，默认production和development两种
    entry: './src/index', // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名hash: 8只显示8位
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
        publicPath: 'http://www.baidu.cn' // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath
    }
}
```
[返回目录](#目录)
## webpack打包输出文件分析
```js
// 打包结果是一个自执行的匿名函数
 (function(modules) { // webpackBootstrap webpack启动函数
   	// The module cache 先定义一个缓存
 	var installedModules = {};

 	// The require function 实现了require方法
 	function __webpack_require__(moduleId) { // "./src/index.js"

 		// Check if module is in cache 模块是否在缓存中
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

         // Flag the module as loaded
         // l标识模块是否加载完成
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 入口模块
 })
 ({ // 匿名函数参数是一个对象
 "./src/index.js": // key
    (function(module, exports) { // value
        eval("console.log(1, '------');\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});
```
[返回目录](#目录)
## webpack-dev-server
```
npm i webpack-dev-server -D
```
```js
devServer: {
    port: 3000,
    progress: true, // 打包进度条
    // contentBase: '', // 起服务的地址
    open: true, // 自动打开浏览器
    // compress: true // 压缩
}
```
[返回目录](#目录)
## 自动生成html
```
npm i html-webpack-plugin -D
```

```js
let HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [ // 放着所有webpack插件
    new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
      template: './index.html', // 模板文件
      filename: 'index.html', // 打包后生成文件
      hash: true, // 添加hash值解决缓存问题
      minify: { // 对打包的html模板进行压缩
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 折叠空行变成一行
      }
    })
]

```
具体配置详见：[html-webpack-plugin#options](https://github.com/jantimon/html-webpack-plugin#options)

[返回目录](#目录)
## 样式处理
### 处理css
```
npm i css-loader style-loader -D
```
```js
module: {    // 模块
        rules: [   // 规则
            // style-loader 把css插入head标签中
            // loader 功能单一
            // 多个loader 需要 []
            // 顺便默认从右到左
            // 也可以写成对象方式
            {
                test: /\.css$/,   // css 处理
                // use: 'css-loader'
                // use: ['style-loader', 'css-loader'],
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader', // css-loader 用来解析@import这种语法,
                    'postcss-loader'
                ]
            }
        ]
}
```
[返回目录](#目录)
### 处理less
```
npm i less-loader -D
```

```js
{
    test: /\.less$/, // less 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 这样相当于抽离成一个css文件， 如果希望抽离成分别不同的css, 需要再引入MiniCssExtractPlugin，再配置
        'css-loader', // css-loader 用来解析@import这种语法
        'postcss-loader',
        'less-loader' // less-loader less -> css
        // sass node-sass sass-loader
        // stylus stylus-loader
    ]
}
```
[返回目录](#目录)
### 抽离样式文件
```
npm i mini-css-extract-plugin -D
```

[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

```js
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.css'
    })
]

{
    test: /\.css$/,   // css 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 抽离
        'css-loader', // css-loader 用来解析@import这种语法,
        'postcss-loader'
    ]
}
```
抽离css插件文件时可使用`optimize-css-assets-webpack-plugin`优化压缩css以及js文件。

[返回目录](#目录)
### 压缩css和js

```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

optimization: {   // 优化项目
    minimizer: [
        new UglifyJsPlugin({     // 优化js
            cache: true,   // 是否缓存
            parallel: true,   // 是否并发
            // sourceMap: true // 源码映射 set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})    // css 的优化
    ]
}

```
[返回目录](#目录)
### css加兼容浏览器的前缀
```
npm i postcss-loader autoprefixer -D
```

```js
// css
{
    test: /\.css$/,   // css 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,
        'css-loader', // css-loader 用来解析@import这种语法,
        'postcss-loader'
    ]
}
// less
{
    test: /\.less$/,   // less 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 这样相当于抽离成一个css文件， 如果希望抽离成分别不同的css, 需要再引入MiniCssExtractPlugin，再配置
        'css-loader', // css-loader 用来解析@import这种语法
        'postcss-loader',
        'less-loader' // less-loader less -> css
        // sass node-sass sass-loader
        // stylus stylus-loader
    ]
},
```
`postcss`需要配置文件`postcss.config.js`，具体配置见[postcss-loader](https://github.com/postcss/postcss-loader)

```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
[返回目录](#目录)
## 转化es6+语法

```
npm i babel-loader @babel/core  @babel/preset-env -D
```

```js
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins:[
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
        }
    }
}
```
>es7的语法：
```js
// class
npm i @babel/plugin-proposal-class-properties -D
// 装饰器
npm i @babel/plugin-proposal-decorators -D
```
[返回目录](#目录)
## 全局变量引入

例如`jQuery`的引入：

```js
npm i jquery -S
```

```js
let webpack = require('webpack');

new webpack.ProvidePlugin({
  $: 'jquery'
})
```

其他情况：

>1. 暴露全局

```
暴露全局变量的loader
npm i expose-loader -D
```

可以在js中`import $ from 'expose-loader?$!jquery'`// 全局暴露jquery为$符号，这样就可以调用window.$。

也可在`webpack.config.js`中配置`rules`：

```js
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}
```
以后在`.j`s文件中引入
```js
import $ from 'jquery';
```

>2. 在每个模块中都注入：

```js
let webpack = require('webpack');

// 在plugins中配置
new webpack.ProvidePlugin({
    $: 'jquery'
})
```
>3. 在index.html中通过script标签引入jquery, 但是在js中，用import会重新打包jquery，如何避免？

>解决方法：从输出的bundle中排除依赖。

```js
 externals: {
  jquery: 'jQuery'
 }
```
此时在index.js上
```js
import $ from 'jquery';
console.log($, 123456); // 可以正常运行
```
[返回目录](#目录)
## 图片打包处理
使用webpack打包我们项目中的图片，在项目中使用图片有如下三种方式：

>1. 在js中创建图片来引入：
```js
import logo from './logo.png'; // 把图片引入，返回的结果是一个新的图片地址
let image = new Image();
// image.src = './logo.png'; // 这样写就是一个普通字符串，webpack并不会去打包相应的图片
console.log(logo); // 可以手动打印出来查看
image.src = logo; // logo实际存储的是图片打包后的路径
document.body.appendChild(image);
```
>注意：图片地址要`import`或者`require`方式引入，如果直接写图片的地址，会默认为字符串，webpack并不会去打包相应的图片。

>2. 在css中引入，如`background('url')`；
```css
.box {
    background: url('./logo.png');
}
```
这种情况下，`css-loader`会将`css`里面的图片引用转化为`require`的格式，有了`require`，相当于引用了图片，webpack就会对相应的图片打包。例如上述代码实际上被转化为：
```css
.box {
    background: url(require('./logo.png'));
}
```
>3. `<img src="" alt=""/>`；

这种情况下，需要解析`html`中的`image`。

```
npm i html-withimg-loader -D
```
在webpack中增加如下配置：
```js
{
    test: /\.html$/,
    use: 'html-withimg-loader'
}
```
这样一来，我们可以在`html`文件通过`<img src="" alt=""/>`来引入图片了，打包后图片会自动切换成打包后的路径。
```
npm i file-loader -D
```
>file-loader默认会在内部生成一张图片到webpack的打包目录(默认是dist)下，并且把生成的图片的路径返回回来。

具体配置如下：适用于上述情况。
```js
{
    test: /\.(png|jpg|gif)$/,
    use: 'file-loader'
}
```

我们都知道，引用图片都将会发送`http`请求，为了减少页面请求数，可以对图片做下限制，当图片小于指定大小时，使用base64编码；
如果大于指定限制，则使用file-loader生成原图片。

```
// url-loader是依赖file-loader的，因此这里也会自动安装file-loader
npm i url-loader -D
```
```js
{
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少k时使用base64，否则用file-loader生成原图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024,  // 200k
            outputPath: 'img/', // 打包后输出路径
        }
    }
}
```
[返回目录](#目录)
## 打包文件分类

>1. 打包图片：

```js
 {
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少，用base64,否则用file-loader产生真实的图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 1,  // 200k 200 * 1024
            outputPath: 'img/'   // 打包后输出地址 在dist/img
        }
    }
 },
```
>2. 打包样式CSS、Less等
```js
plugins: [
 new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
]
```
>3. 在打包输出的时候，给这些静态资源js/css/img等加上前缀，传到CDN服务器上也能访问，需要进行如下配置：

```js
output: {
    filename: 'bundle.[hash:8].js', // hash: 8只显示8位
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://www.baidu.cn' // 给静态资源统一加(js/css/img)
},
```
>如果只需要处理图片，则只单独给图片配置：
```js
{
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少，用base64,否则用file-loader产生真实的图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024, // 200k
            // 注意img前面要多加一个/。否则打包后地址不对
            outputPath: '/img/', // 打包后输出地址
            publicPath: 'http://www.baidu.cn' // 设置存放静态资源的服务器地址，将会在打包输出的文件中静态文件前面加上该地址
        }
    }
}
```
[返回目录](#目录)
## 打包多页面应用

```js
// 多入口
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home'] // home.html里只有home.js
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other', 'home'] // other.html里有 other.js和home.js
        }),
    ]
}
```
[返回目录](#目录)
## 配置source-map
```
npm i @babel/core @babel/preset-env babel-loader webpack-dev-server -D
```
```js
devtool: 'source-map' // 增加映射文件，可以帮助我们调试源代码
```

1. **source-map**：源码映射，打包后会单独生成一个source-map文件，出错了会标识当前报错的列和行，特点：大而全；
2. **evl-source-map**：不会生成单独的文件 但是可以显示行和列(实际上是把source-map文件放到了打包后的js文件中)，特点：集成到打包后的文件中；
3. **cheap-module-source-map(用的少)**：不会产生列，但是生成一个单独的映射文件；
4. **cheap-module-eval-source-map**：不会产生文件，集成在打包后的文件中，不会产生列(即不会定位到精确的报错列)；

[返回目录](#目录)
## watch用法
`wacth`用于监听代码的变更，进行代码实时编译打包。具体配置如下：
```js
module.exports = {
  // 只有在开启监听模式时，watchOptions才有意义
  // 默认为false，也就是不开启
  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后等300ms再去执行动作，防抖
    // 防止文件更新太快而导致重新编译频率太快。默认为300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停地询问系统指定文件有没有变化实现的
    // 默认每秒询问1000次
    poll: 1000
  }
};
```
[返回目录](#目录)

## webpack小插件应用

### clean-webpack-plugin
>1. [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)：每次打包之前先删除`dist`目录(即webpack配置的打包输出目录)下的文件。
```
npm i clean-webpack-plugin -D
```
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
output: {
    path: path.resolve(process.cwd(), 'dist')
},
plugins: [
    new CleanWebpackPlugin()
]
```
### copy-webpack-plugin
>2. copy-webpack-plugin：将静态资源拷贝到打包输出目录dist中。

```
npm i copy-webpack-plugin -D
```

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  plugins: [
     new CopyWebpackPlugin([
        {
            from: './doc',
            to: './'
        }
    ])
  ]
}
```
### BannerPlugin
>3. BannerPlugin：该插件是webpack内置模块，用于版权声明。

```js
const webpack = require('webpack');

new webpack.BannerPlugin('edit by liujie');
// or
new webpack.BannerPlugin({
    banner: 'edit by liujie'
});
```
[返回目录](#目录)

## webpack跨域问题
重启一个服务，其实`webpack-dev-server`内含`express`。

>`server.js`
```js
const express = require('express');
const app = express();

app.get('/api/user', res => {
    res.json({name: 'liujie'});
});
app.listen(3000, () => {
    console.log('服务启动在3000端口');
});
```
>启动服务：`node server.js`，访问`http://localhost:3000/api/user`，可见内容。

>`index.js`
```js
// 发送一个请求
const xhr = new XMLHttpRequest();
// 默认访问 http://localhost:8080 webpack-dev-server的服务，再转发给3000
xhr.open('GET', '/api/user', true);
xhr.onload = () => {
    console.log(xhr.response);
}
xhr.send();
```
>`webpack.config.js`
```js
devServer: {
  // webpack-dev-server服务转发给http://localhost:3000
  proxy: {
      '/api': 'http://localhost:3000' // 配置一个代理
  }
},
```
### 特殊场景一：如果后端给的请求路径中没有`/api`：

我们的请求还以`/api`开头，在请求转发的时候删掉`/api`，具体配置如下：

```js
devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api': ''}
        }
    }
}
```
### 特殊场景二：前端单纯mock数据
```js
devServer: {
    before(app) {  // 钩子
        app.get('/api/user', (req, res) => {
            res.json({name: 'liujie-before'})
        })
    }
},
```
### 特殊场景三：有服务端，不用代理
在服务端启动webpack，端口用服务端端口。

>在`server.js`中启动`webpack`：

```
npm i webpack-dev-middleware -D
```
>`server.js`

```js
const express = require('express');
const webpack = require('webpack');
const app = express();
// 中间件
// webpack-dev-middleware用于在服务端启动webpack
const middle = require('webpack-dev-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);
app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({name: 'liujie'});
});

app.listen(3000, () => {
    console.log('服务启动在3000端口');
});
```
[返回目录](#目录)

## resolve属性的配置
resolve属性的配置Webpack如何寻找模块对应的文件。

```
// 以bootstrap为例
npm i bootstrap  -D
```
```js
// bootstrap前面没有加./，说明是一个安装好的模块，会去当前目录下的node_modules下查找
import 'bootstrap'
```

`index.js`：

```js
import 'bootstrap/dist/css/bootstrap.css';
```

>报错
```js
ERROR in ./node_modules/bootstrap/dist/css/bootstrap.css 7:0
Module parse failed: Unexpected token (7:0)
You may need an appropriate loader to handle this file type.
|  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
|  */
> :root {
|   --blue: #007bff;
|   --indigo: #6610f2;
 @ ./src/index.js 22:0-42
 @ multi (webpack)-dev-server/client?http://localhost:8081 ./src/index.js
```
这是因为`bootstrap 4.0`的`css`引入了新的特性，`CSS Variables`。

>安装：
```
npm i postcss-custom-properties -D
```
>配置`webpack.config.js`：
```js
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('postcss-custom-properties')
                ]
            }
        }
    ]
}
```
>配置`modules`属性，设置模块查找目录：
```js
resolve: {
    // 在当前目录查找
    modules: [path.resolve('node_modules')]
},
```
>配置`alias`属性，解决模块路径引入很长问题。
```js
resolve: {
    alias: { // 别名配置
        'bootstrap-css': 'bootstrap/dist/css/bootstrap.css'
    }
},
```
```js
import 'bootstrap-css';  // 在node_modules查找
```
>配置`mainFields`属性：配置优先使用的入口文件。
```js
resolve: {
    mainFields: ['style', 'main'], // 先用bootstrap中在package中的style，没有style再用main
    // mainFiles: []  // 入口文件的名字 默认index
}
```
>配置`extensions`属性：省略扩展名。
```js
resolve: {
    extensions: ['.js', '.css', '.json'] // 当没有拓展命的时候，先默认js、css次之、json最后
}
```
[返回目录](#目录)
## 定义环境变量
`DefinePlugin`允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和生产模式的构建允许不同的行为非常有用。

```js
let url = '';
if (DEV === 'dev') {
    // 开发环境
    url = 'http://localhost:3000';
} else {
    // 生产环境
    url = 'http://www.baidu.cn';
}
```
>`webpack.config.js`

```js
new webpack.DefinePlugin({
    // DEV: "'production'", // 注意字符串需要加上双引号
    DEV: JSON.stringify('production'),
    FLAG: 'true', // 单引号会被去掉，实际为布尔值true
    EXPRESSION: '1 + 1' // EXPRESSION值是数字2，如果希望是字符串 JSON.stringify('1 + 1')
})
```
[返回目录](#目录)
## 区分不同环境
1. webpack.base.config.js：公共基础配置；
2. webpack.dev.config.js：开发环境配置；
3. webpack.prod.config.js：生产环境配置；

```
npm i webpack-merge -D
```
>`webpack.base.config.js`：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        home: './src/index.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(process.cwd(), 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader) => [
                            require("postcss-custom-properties")
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}
```
>`webpack.dev.config.js`：控制开发环境

```js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = smart(base, {
    mode: 'development',
    devServer: {},
    devtool: 'source-map'
})
```
>`webpack.prod.config.js`：控制生产环境

```js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = smart(base, {
    mode: 'production'
})
```
>`package.json`配置：

```js
"scripts": {
    "build": "webpack --config webpack.prod.config.js",
    "dev": "webpack-dev-server --config webpack.dev.config.js"
},
```
[返回目录](#目录)

## webpack优化

```
npm i webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react -D
```

>`webpack.config.js`：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
          {
              test: /\.js$/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          '@babel/preset-env',
                          '@babel/preset-react'
                      ]
                  }
              }
          },
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
    ]
}
```
### noParse
`noParse`优化：当某些包是独立的个体即没有依赖时，通过配置告知webpack不要去解析该模块的依赖库。

以`jQuery`为例，`npm i jquery -D`，它是一个独立的包没有依赖，可以在webpack配置中，配置它不再查找依赖，具体配置如下：

```js
module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库
    rules: [
      {
          test: /\.js$/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: [
                      '@babel/preset-env',
                      '@babel/preset-react'
                  ]
              }
          }
      },
  ]
},
```
[返回目录](#目录)
### exclude&include
>优化：给匹配规则设置范围：

```js
rules: [
  {
      test: /\.js$/,
      exclude: '/node_modules/', // 排除相关查找范围
      include: path.resolve('src'), // 限定查找范围
      use: {
          loader: 'babel-loader',
          options: {
              presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
              ]
          }
      }
  }
```
[返回目录](#目录)
### IgnorePlugin
`IgnorePlugin`优化：忽略依赖中不必要的语言包：

```
npm i moment webpack-dev-server -D
```
```js
const webpack = require('webpack');

plugins: [
    // 忽略掉moment的其他语言包
    // 从moment中引入.locale时忽略
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
]
```
>`index.js`:

```js
// 会加载所有的语言包
import moment from 'moment';

// 手动引入所需要的中文语言包
import 'moment/locale/zh-cn';
const r = moment().endOf('day').fromNow(); // 距离现在多少天
console.log(r);
```
[返回目录](#目录)
### dllPlugin
`dllPlugin`即动态链接库。
```
npm i react react-dom
```
>正常使用：`webpack.config.js`

```js
{
  test: /\.js$/,
  exclude: '/node_modules/',
  include: path.resolve('src'),
  use: {
      loader: 'babel-loader',
      options: {
          presets: [
              '@babel/preset-env',
              '@babel/preset-react'
          ]
      }
  }
}
```
>`index.js`：
```js
import React from 'react'
import {render} from 'react-dom'

render(
    <h1>dllPlugin test</h1>,
    document.getElementById('root')
);
```
>`index.html`：
```html
<div id="root"></div>
```
将react、react-dom独立地打包好，打包好再引用，从而减少webpack每次都要打包react。

>创建`webpack.dll.config.js`：

```js
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        // test: './src/test.js'
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', // 生成的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 给输出的结果加个名字，这里叫_dll_react
        // libraryTarget: 'var' // 配置如何暴露library，默认为var
        // commonjs 结果放在export属性上，umd统一资源模块, 默认是var
    },
    plugins: [
       new webpack.DllPlugin({
           name: '_dll_[name]', // name === library
           path: path.resolve(__dirname, 'dist', 'manifest.json')  // manifest.json 定义了各个模块的路径
       })
    ]
}
```
`manifest.json`就是一个任务清单or动态链接库，先在这个清单里面查找react。

>在`index.html`中增加引用：

```html
<body>
<div id="root"></div>
<script src="/_dll_react.js"></script>
</body>
```
在`webpack.config.js`中配置，先在动态链接库`manifest.json`中查找，如果没有找到再打包react：
```js
plugins: [
    new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    })
]

```

```
npm run build
```
打包后的`bunle.js`文件变小，可以理解为先把`react和react-dom`打包，后面每次都直接使用`react和react-dom`打包后的结果而不是重新打包。

[返回目录](#目录)
### happyPack
`happyPack主要实现了多线程打包。
```
npm i happypack -D
```
>`webpack.config.js`：

```js
const Happypack = require('happypack');

rules: [
    {
        test: /\.js$/,
        exclude: '/node_modules/',
        include: path.resolve('src'),
        use: 'happypack/loader?id=js'
    },
]

plugins: [
    new Happypack({
        id: 'js',
        use: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                ]
            }
        }]
    })
]
```
>需要注意：js启用多线程，由于启用多线程也会浪费时间，因此当项目比较大的时候启用效果更好。

>css启用多线程：

```js
{
    test: /\.css$/,
    use: 'happypack/loader?id=css'
}

 new Happypack({
    id: 'css',
    use: ['style-loader', 'css-loader']
}),
```
[返回目录](#目录)
### webpack自带的优化

#### tree-shaking
>`test.js`：
```js
let sum = (a, b) => {
    return a + b + 'sum'
}

let minus = (a, b) => {
    return a - b + 'minus';
}

export default {
 sum,
 minus
}
```

1. 使用import

>`index.js`：

```js
import calc from './test'

console.log(calc.sum(1, 2));
```
import在生产环境下会自动去除掉没有用的代码`minus`，这叫`tree-shaking`，将没有用的代码自动删掉。

>`index.js`：

```js
const calc = require('./test');
// test模块是es6语法导出，导出结果放在default属相上，default是一个对象
console.log(calc);
// 所以这里需要使用calc.default.sum
console.log(calc.default.sum(1, 2));
```
>需要注意：`require`引入`es6`模块，打包`build`后并不会把多余`minus`代码删除掉，不支持`tree-shaking`。

[返回目录](#目录)
#### 作用域提升
Scope Hoisting即作用域提升。

>`index.js`：

```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;

console.log(d, '---------');
```
打包结果如下：

```js
// 加入"---------"，方便在打包后的代码中找到对应代码
console.log(6,"---------")
```
在webpack中可以省略一些可以简化的代码。

[返回目录](#目录)
## 抽取公共代码
>1. 抽离自有模块

>`webpack.config.js`

```js
optimization: {
    splitChunks: {  // 分割代码块，针对多入口
        cacheGroups: { // 缓存组
            common: { // 公共模块
                minSize: 0, // 大于多少抽离
                minChunks: 2, // 使用多少次以上抽离
                chunks: 'initial' // 从什么地方开始，表示initial刚开始
            }
        }
    }
},
```
[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

分别有a.js和b.js，index.js和other.js分别引入a和b两个js。

>`index.js`：
```js
import './a'
import './b'

console.log('index.js');
```

>`other.js`:

```js
import './a'
import './b'

console.log('other.js');
```

>`webpack.config.js`：

```js
optimization: {
    splitChunks: { // 分割代码块，针对多入口
        cacheGroups: { // 缓存组
            common: { // 公共模块
                minSize: 0, // 大于多少抽离
                minChunks: 2, // 使用多少次以上抽离抽离
                chunks: 'initial' // 从什么地方开始,刚开始
            }
        }
    },
},
```
>2. 抽离第三方模块
比如jquery

`index.js` 和 `other.js`分别引入

```js
import $ from 'jquery'

console.log($);
```
>`webpack.config.js`：

```js
optimization: {
    splitChunks: { // 分割代码块，针对多入口
        cacheGroups: { // 缓存组
            common: { // 公共模块
                minSize: 0, // 大于多少抽离
                minChunks: 2, // 使用多少次以上抽离抽离
                chunks: 'initial'  // 从什么地方开始,刚开始
            },
            vendor: {
                priority: 1, // 增加权重，先抽离第三方
                test: /node_modules/,
                minSize: 0, // 大于多少抽离
                minChunks: 2, // 使用多少次以上抽离抽离
                chunks: 'initial' // 从什么地方开始,刚开始
            }
        }
    },
},
```
[返回目录](#目录)
## 懒加载
懒加载即延迟加载。
```
npm i @babel/plugin-syntax-dynamic-import -D
```

>`source.js`：

```js
export default 'liujie';
```
>`index.js`：

```js
const button = document.createElement('button');

button.innerHTML = 'test'
button.addEventListener('click', function () {
    console.log('click');
    // es6草案中的语法，jsonp实现动态加载文件
    import('./source.js').then(data => {
        console.log(data.default);
    })
});

document.body.appendChild(button);
```

>`webpack.config.js`

```js
{
    test: /\.js$/,
    exclude: '/node_modules/',
    include: path.resolve('src'),
    use: [{
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import'
            ]
        }
    }]
}
```
[返回目录](#目录)
## 热更新

>热更新：即当页面只更新改变的部分，而不是重新打包。

>`webpack.config.js`：

```js
devServer: {
    hot: true, // 启动热更新
    port: 3000,
    progress: true, // 打包进度条
    // contentBase: '', // 起服务的地址
    open: true, // 自动打开浏览器
    // compress: true // 压缩
},
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
    }),
    new webpack.NameModulesPlugin(), // 打印更新的模块路径，说明哪个文件热更新了
    new webpack.HotModuleReplacementPlugin() // 热更新插件
]
```
>`index.js`：

```js
import str from './source';

console.log(str);

if (module.hot) {
    module.hot.accept('./source', () => {
        console.log('文件更新了');
        // 文件更新后，用require重新引入新的文件
        // 这里用require来引入文件而不是用import，原因是import只能写在文件顶部
        let str = require('./source');
        console.log(str);
    })
}
```
[返回目录](#目录)
## tapable介绍

[tapable](https://juejin.im/post/5abf33f16fb9a028e46ec352)

`Webpack`本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是`Tapable`，`Tapable`有点类似于nodejs的events库，核心原理也是依赖于**发布-订阅模式**。
```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```
`Webpack`中最核心的负责编译的`Compiler`和负责创建`bundles`的`Compilation`都是`Tapable`的实例。
>hooks概览

常用的钩子主要包含以下几种，分为同步和异步，异步又分为并发执行和串行执行，如下图：
![](./static/Tabable.png)

### SyncHook
`SyncHook`不关心监听函数的返回值

```
npm i tabable -D
```

>`demo1.js`：

```js
const {SyncHook} = require('tapable'); // 结构同步勾子

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅勾子
            arch: new SyncHook(['name']) // 参数可选
        }
    }
    start() {
        this.hooks.arch.call('liujie');
    }
    tap() { // 注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
        });
    }
}
let l = new Lesson();

l.tap();  //注册两个事件
l.start(); // 启动钩子
```

>`case1.js`：`SyncHook`钩子实现。

```js
class SyncHook {  // 钩子是同步的
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}

let hook = new SyncHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name);
});
hook.tap('node', function (name) {
    console.log('node', name);
});
hook.call('liujie');
```
[返回目录](#目录)

### SyncBailHook
`SyncBailHook`为钩子加个保险，当`return`返回不是`undefine`就会停止。

>`demo2.js`：

```js
let {SyncBailHook} = require('tapable'); // 解构同步钩子

class Lesson {
    constructor () {
        this.hooks = {
            // 订阅勾子
            arch: new SyncBailHook(['name'])
        }
    }
    start() {
        // 发布
        this.hooks.arch.call('liujie');
    }
    tap() {   //  注册监听函数,订阅
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
            return '想停止学习';  // 会停止
            // return undefined; // 不会停止
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
            // 没有return语句，默认是return undefined;
        });
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动勾子
```

`case2.js`：`SyncBailHook`钩子实现。

```js
class SyncBailHook {  // 钩子是同步的
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let res; // 当前函数的返回值
        let index = 0; // 当前要执行的第一个
        // 至少要执行一个，没有返回undefined的话再继续执行
        do {
            res = this.tasks[index++](...args);
        } while (res === undefined && index < this.tasks.length)
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('react', function (name) {
    console.log('react', name);
    return '停止学习';
    // return undefined
});
hook.tap('node', function (name) {
    console.log('node', name);
});
hook.call('liujie');
```
[返回目录](#目录)
### SyncWaterfallHook

`SyncWaterfallHook`上一个监听函数的返回值可以传给下一个监听函数。

>`demo3.js`:

```js
let {SyncWaterfallHook} = require('tapable'); // 解构同步钩子
// waterfall 瀑布

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new SyncWaterfallHook(['name'])
        }
    }
    start() {
        // 发布
        this.hooks.arch.call('liujie');
    }
    tap() { //注册监听函数，即订阅
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
            return '学的不错';
        })
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
        })
    }
}
let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>SyncWaterfallHook钩子实现：

```js
class SyncWaterfallHook { // 勾子是同步的 - 瀑布
    constructor(args) { // args => ['name']
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        // 解构获取第一个task和其余剩余的task
        let [first, ...others] = this.tasks;
        // res是第一个task的返回结果
        let res = first(...args);
        // reduce迭代，a是前一个task的返回结果，b是当前task
        others.reduce((a, b) => {
            return b(a);
        }, res);
    }
}

let hook = new SyncWaterfallHook(['name']);

hook.tap('react', function (name) {
    console.log('react', name);
    return 'react Ok';
    // return undefined
})
hook.tap('node', function (name) {
    console.log('node', name);
    return 'node Ok';
})
hook.tap('webpack', function (data) {
    console.log('webpack', data);
})
hook.call('liujie');
```
[返回目录](#目录)

### SyncLoopHook
`SyncLoopHook`当监听函数被触发的时候，如果该监听函数返回`true`时则这个监听函数会多次执行，如果返回`undefined`，则表示退出循环。

>`demo4.js`：

```js
let {SyncLoopHook} = require('tapable'); // 解构同步钩子
// 不返回undefined，会多次执行
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new SyncLoopHook(['name'])
        }
    }
    start() {
        // 发布
        this.hooks.arch.call('liujie');
    }
    tap() { // 注册监听函数,订阅
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : '继续学';
        });
        this.hooks.arch.tap('react', name => {
            console.log('react', name);
        });
    }
}
let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>SyncLoopHook钩子实现：

```js
class SyncLoopHook {  // 钩子是同步的
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => {
            let res;
            do {
                res = task(...args);
            } while(res !== undefined)
        })
    }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function (name) {
    console.log('react', name);
    return ++total === 3 ? undefined : '继续学';
})

hook.tap('node', function (name) {
    console.log('node', name);
})

hook.tap('webpack', function (name) {
    console.log('webpack', name);
})
hook.call('liujie');
```
[返回目录](#目录)
### AsyncParallelHook&AsyncParallelBailHook
异步的钩子分两种`串行`和`并行`，`并行`需要等待所有并发的异步事件执行后执行回调。

>Tapable库中有三种注册方法

1. 同步注册方法`tap`；
2. 异步注册方法`tapAsync(callback)`，有一个回调函数参数；
3. `topPromise`，注册`promise`；

调用的三种方式：

1. call(同步调用)
2. callAsync（异步调用）
3. promise（异步）

#### AsyncParallelHook
`AsyncParallelHook`是异步并行的钩子：不关心监听函数的返回值。

>`demo5.js`：

```js
let {AsyncParallelHook} = require('tapable'); // 解构同步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncParallelHook(['name'])
        }
    }

    start() {
        // 发布callAsync
        // this.hooks.arch.callAsync('liujie', function () { // 所有异步钩子执行完才会执行
        //     console.log('end');
        // });
        // 另一种发布promise
        this.hooks.arch.promise('liujie').then(function () {
                console.log('end');
            }
        );
    }
    tap() {  // 注册监听函数,订阅
        // 注册tapAsync
        // this.hooks.arch.tapAsync('node',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name);
        //         callback();
        //     }, 1000)
        // })
        // this.hooks.arch.tapAsync('react',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('react', name);
        //         callback();
        //     }, 1000)
        // })
        // 另一种订阅 tapPromise
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000);
            });
        });
    }
}
let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>AsyncParallelHook钩子实现：
```js
class AsyncParallelHook { // 钩子是异步的
    constructor(args) { // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop(); // 拿出最终的函数
        let index = 0;
        let done = () => { //类似promise.all的实现
            index++;
            if (index === this.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => {
            task(...args, done); // 这里的args已经把最后一个参数删掉
        });
    }
    promise(...args) {
        let tasks = this.tasks.map(task => task(...args));
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelHook(['name']);
// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback()
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback()
//     }, 1000)
// })

// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback();
//     }, 1000);
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    });
});

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    });
});
// hook.callAsync('liujie', function () {
//     console.log('end');
// })

hook.promise('liujie').then(function () {
    console.log('end');
})
```
[返回目录](#目录)
#### AsyncParallelBailHook
`AsyncParallelBailHook`是一个带保险的异步回调钩子，只要监听函数的返回值不为`null`，就会忽略后面的监听函数执行，直接跳跃到`callAsync`等触发函数绑定的回调函数，然后执行这个被绑定的回调函数。使用和原理与`SyncBailHook`相似。

### 异步串行
#### AsyncSeriesHook
`AsyncSeriesHook`钩子是`异步串行(`one by one)。

>`demo6.js`：

```js
let {AsyncSeriesHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesHook(['name'])
        }
    }

    start() {
        // 发布
        // this.hooks.arch.callAsync('liujie', function () {
        //     console.log('end');
        // })
        // 另一种发布
        this.hooks.arch.promise('liujie').then(function () {
                console.log('end');
            }
        )
    }

    tap() { //注册监听函数,订阅
        // this.hooks.arch.tapAsync('node',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name)
        //         callback()
        //     }, 1000)
        // })
        // this.hooks.arch.tapAsync('react',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('react', name)
        //         callback()
        //     }, 1000)
        // })
        // 另一种订阅
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000);
            })
        })
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>`AsyncSeriesHook`钩子实现：

```js
class AsyncSeriesHook {
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (this.tasks.length === index) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }

    promise(...args) {
        // 将promise串联起来
        let [first, ...other] = this.tasks;
        return other.reduce((p, n) => { // 类似redux源码
             return p.then(() => n (...args))
        }, first(...args));
    }
}

let hook = new AsyncSeriesHook(['name'])
// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback();
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback()
//     }, 1000)
// })
//
// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    })
})

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    })
})

// hook.callAsync('liujie', function () {
//     console.log('end');
// })

hook.promise('liujie').then(function () {
    console.log('end');
})
```
[返回目录](#目录)
### AsyncSeriesBailHook

### AsyncSeriesWaterfallHook
上一个监听函数的中的`callback(err, data)`的第二个参数,可以作为下一个监听函数的参数。
>`demo7.js`：

```js
let {AsyncSeriesWaterfallHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesWaterfallHook(['name'])
        };
    }
    start() {
        // 发布
        this.hooks.arch.callAsync('liujie', function () {
            console.log('end');
        })
        // 另一种发布
        // this.hooks.arch.promise('may').then(function () {
        //         console.log('end');
        //     }
        // )
    }

    tap() { //  注册监听函数,订阅
        this.hooks.arch.tapAsync('node', (name, callback) => {
            setTimeout(() => {
                console.log('node', name);
                // callback(null, 'result')
                callback('error', 'result'); // 如果放error, 会跳过直接后面的钩子，直接走到最终的
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', (name, callback) => {
            setTimeout(() => {
                console.log('react', name);
                callback();
            }, 1000);
        });
        // 另一种订阅
        // this.hooks.arch.tapPromise('node', (name) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('node', name)
        //             resolve()
        //         }, 1000)
        //     })
        // })
        // this.hooks.arch.tapPromise('react', (name) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('react', name)
        //             resolve()
        //         }, 1000)
        //     })
        // })
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>`AsyncSeriesWaterfallHook`钩子实现：

```js
class AsyncSeriesWaterfallHook {  //
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            // 如果task没有取到，则执行最后一个
            if(!task) return finalCallback();
            if (index === 0) {
                // 执行第一个
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        }
        next(); // 先调一次
    }

    promise(...args) {
        // 将promise串联起来
        let [first, ...other] = this.tasks;
        return other.reduce((p, n) => {
             return p.then((data) => n(data));
        }, first(...args));
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);

// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback(null, '结果1')
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback(null, '结果2')
//     }, 1000)
// })
//
// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve('result');
        }, 1000);
    });
})

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    });
});
// hook.callAsync('liujie', function () {
//     console.log('end');
// })
hook.promise('liujie').then(function () {
    console.log('end');
})
```
[返回目录](#目录)
## 手写webpack

```
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

`parse`方法主要靠解析语法树来进行转义
`babylon`  主要把源码转成ast Babylon 是 Babel 中使用的 JavaScript 解析器。
`@babel/traverse` 对ast解析遍历语法树 负责替换，删除和添加节点
`@babel/types` 用于AST节点的Lodash-esque实用程序库
`@babel/generator` 结果生成


```js
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

`yarn add ejs`


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
        this.config = config
        // 需要保存入口文件的路径
        this.entryId = '';   // './src/index.js'
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry  // 入口文件
        // 工作目录
        this.root = process.cwd(); // 当前运行npx的路径

        this.hooks = {
            entryOption: new SyncHook(),  // 入口选项
            compile: new SyncHook(),      // 编译
            afterCompile: new SyncHook(),  // 编译完成
            afterPlugins: new SyncHook(),   // 编译完插件
            run: new SyncHook(),         // 运行
            emit: new SyncHook(),        // 发射
            done: new SyncHook()         // 完成
        }
        // 如果传递了plugins参数
        let plugins = this.config.plugins
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this); // 这里只是appLy方法不是改变this指向
            })
        }
        this.hooks.afterPlugins.call()
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
.....
// 调用
compiler.hooks.entryOption.call()
// 标识运行编译
compiler.run()
```

`may-pack`中`Compiler.js`
```js
run() {
        this.hooks.run.call()

        this.hooks.compile.call()
        // 执行 创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true)  // path.resolve(this.root, this.entry) 得到入口文件的绝对路径
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
## loader

[手写loader](https://juejin.im/post/59e6a5de518825469c7461da)

`webapck.config.js`

```js
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'loader1' // 如何找到这个loader1
            }
        ]
    },
}

```

创建`loader`文件`loader1.js`

```js
console.log(22);

function loader(source) {  // loader的参数就是源代码
    return source
}
module.exports = loader

```
`webpack.config.js`

```js
let path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
      // 别名
      // alias: {
      //     loader1: path.resolve(__dirname, 'loader', 'loader1')
      // }
        modules: ['node_modules', path.resolve(__dirname, 'loader')]  // 先找node_modules, 再去loader中去找
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: [path.resolve(__dirname, 'loader', 'loader1')]
                use: 'loader1' // 如何找到这个loader1

            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         path.resolve(__dirname, 'loader', 'style-loader'),
            //         path.resolve(__dirname, 'loader', 'less-loader')
            //     ]
            // }
        ]
    },
}

```
如何找到这个`loader1`

1. 通过配别名`alias`
2. 通过`modules`

`npx webpack`

[返回目录](#目录)
### loader配置

1. 数组方式

先分别在`loader`文件下创建，`loader2.js`和`loader3.js`

```js
function loader(source) {  // loader的参数就是源代码
    console.log('loader2');  // loader3.js 类似
    return source
}
module.exports = loader

```
`webpack.config.js`：

```js
rules: [
    {
        test: /\.js$/,
        use: ['loader3', 'loader2', 'loader1']
    },
]
```

运行`npx webpack`，分别打出
```js
loader1
loader2
loader3
```

2. 对象方式

```js
rules: [
    {
        test: /\.js$/,
        use: ['loader3']
    },
    {
        test: /\.js$/,
        use: ['loader2']
    },
    {
        test: /\.js$/,
        use: ['loader1']
    }
]
```

运行`npx webpack`，分别打出

```js
loader1
loader2
loader3
```

> `loader`的顺序: 从右到左, 从下到上

也可以通过配置不同的参数改变`loader`的执行顺序，`pre` 前面的， `post`在后面的， `normal`正常

```js
{
    test: /\.js$/,
    use: ['loader1'],
    enforce: "pre"
},
{
    test: /\.js$/,
    use: ['loader2']
},
{
    test: /\.js$/,
    use: ['loader3'],
    enforce: "post"
},
```
`loader` 带参数执行的顺序: `pre  -> normal -> inline -> post`

`inline`为行内`loader`

在`loader`文件中新建`inline-loader`

```js
function loader(source) {  // loader的参数就是源代码
    console.log('inline');
    return source;
}
module.exports = loader;
```

`src/a.js`

```js
module.exports = 'may'
```

`src/index`

```js
console.log('hello')
let srt = require('-!inline-loader!./a')
```

1. `-!`禁用`pre-loader`和`normal-loader`来处理了

```js
loader1
loader2
loader3
inline
loader3
```

2. `!`禁用`normal-loader`

```js
loader1
loader2
loader3
loader1
inline
loader3
```

3. `!!` 禁用`pre-loader`、`normal-loader`、`post-loader`,只能行内处理

```js
loader1
loader2
loader3
inline
```
loader 默认由两部分组成`pitch`和`normal`

`user: [loader3, loader2, loader1]`

无返回值: 先执行pitch方法,从左到右，再获取资源

```js
    pitch loader - 无返回值

pitch   loader3 → loader2 → loader1
                                    ↘
                                      资源
                                    ↙
normal   loader3 ← loader2 ← loader1
```

有返回值: 直接跳过后续所有的`loader`包括自己的,跳到之前的`loader`, 可用于阻断

[loader](https://webpack.docschina.org/api/loaders/)

```js
user: [loader3, loader2, loader1]

    pitch loader - 有返回值

pitch   loader3 → loader2  loader1
                     ↙
               有返回值               资源
               ↙
normal  loader3  loader2  loader1
```

`loadeer2.js`

```js
function loader(source) {  // loader的参数就是源代码
    console.log('loader2');
    return source
}

loader.pitch = function () {
    return '111'
}
module.exports = loader

```
结果：
```js
loader3
```
[返回目录](#目录)
### babel-loader实现

```
yarn add @babel/core @babel/preset-env
```

`webpack.config.js`：

```js
{
    test: '\.js$/',
    use: {
        loader: 'babel-loader2',
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    }
}
```

在`loader`文件创建`babel-loader2.js`(如果你已经装过`babel-loader`)

拿到`babel`的参数

```
npm i loader-utils
```
```js
// 需要在webpack.config.js拿到babel的预设, 通过预设转换模块, 先引入babel
let babel = require('@babel/core');
// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils =require('loader-utils');
function loader(source) {  // loader的参数就是源代码  这里的this就是loader的上下文
    let options = loaderUtils.getOptions(this)
    console.log(this.resourcePath, 444);   // [./src/index.js]
    let callback = this.async(); // babel的转换是异步的,同步的返回是不行的， 不能用return  同步就是直接掉用 异步会在async中
    babel.transform(source, {
        ...options,
        sourceMap: true,         // 是否设置sourceMap 还需要再webpack.config.js 中配置  devtool: 'source-map'
        filename: this.resourcePath.split('/').pop()   //  给生成的`source-map`指定名字
    }, function (err, result) {
        callback(err, result.code, result.map)   // 异步 参数分别是「错误 转化后的代码 和 sourceMap」
    })
    console.log(options);
    // return source  失效
}

module.exports = loader;
```
`index.js`
```js
class May {
    constructor () {
        this.name = 'may';
    }
    getName () {
        return this.name;
    }
}
let may = new May();

console.log(may.getName());
```

`npx webpack`

[返回目录](#目录)
### banner-loader实现

给所有匹配的`js`加一个注释

`webpack.config.js`

```js
{    // 给所有匹配的`js`加一个注释
    test: /\.js$/,
    use: {
        loader: 'banner-loader',
        options: {
           text: 'may',
           filename: path.resolve(__dirname, 'banner.js')
        }
    }
}
```
`banner.js`

```js
二次星球中毒
```
在`loader`文件创建`banner-loader.js`

`npm i schema-utils` 校验自己写的`loader`格式是否正确

[schema-utils](https://github.com/webpack-contrib/schema-utils)

`banner-loader.js`

```js
// 拿到loader的配置
let loaderUtils = require('loader-utils');
// 校验loader
let validateOptions = require('schema-utils');
// 读取文件
let fs = require('fs');  // 异步

function loader(source) {  // loader的参数就是源代码
    let options = loaderUtils.getOptions(this)
    let callback = this.async()  // 读取文件是异步
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader')  // 自己的校验格式， 自己的写的配置， 对应的loader名字
    if (options.filename) {
        this.cacheable(false)  // 不要缓存  如果有大量计算 推荐缓存
        // this.cacheable && this.cacheable()
        this.addDependency(options.filename) // 自动增加依赖
        fs.readFile(options.filename, 'utf8', function (err, data) {
            callback(err, `/**${data}**/${source}`)
        })
    } else {
        callback(null, `/**${options.text}**/${source}`);
    }
    return source;
}
module.exports = loader;

```
>优化:

1. 修改`banner.js`的内容后, `webpack`进行监控，打包`webapck.config.js`配置`watch: true`
2. `loader`缓存

### file-loader和url-loader实现
`yarn add mime`

其主要用途是设置某种扩展名的文件的响应程序类型

[mime](https://github.com/broofa/node-mime#readme)

创建`file-loader.js1`

```js
// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils = require('loader-utils')

function loader(source) {  // loader的参数就是源代码
    // file-loader需要返回路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source })
    this.emitFile(filename, source) // 发射文件
    console.log('loader1');
    return `module.exports="${filename}"`
}
loader.raw = true // 二进制
module.exports = loader

```

创建`url-loader1.js`

```js
// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils = require('loader-utils')
let mime = require('mime')  // 途是设置某种扩展名的文件的响应程序类型

function loader(source) {  // loader的参数就是源代码
    let {limit} = loaderUtils.getOptions(this)
    console.log(this.resourcePath);
    if (limit && limit > source.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require('./file-loader1').call(this, source)
    }
}
loader.raw = true // 二进制
module.exports = loader

```

`webpack.config.js`

```js
{
    test: /\.png$/,
    // 目的是根据图片生成md5 发射到dist目录下，file-loader 返回当前图片路径
    // use: 'file-loader'
    // 处理路径
    use: {
        loader: 'url-loader1',
        options: {
            limit: 200 * 1024
        }
    }
}
```

`index.js`引入图片

```
import p from './photo.png'

let img = document.createElement('img')
img.src = p
document.body.appendChild(img);

```
[返回目录](#目录)

### less-loader和css-loader
先安装`less`

分别创建`style-loader2` `css-loader2` `less-loader2`

`style-loader1` 与 `less-loader1` 同之前的


## `css-loader`

主要用来处理`css`中的图片链接，需要把`url`转换成`require`


`webpack.config.js`

```js
{
    test: /\.png$/,
    // 目的是根据图片生成md5 发射到dist目录下，file-loader 返回当前图片路径
    // use: 'file-loader'
    // 处理路径
    use: {
        loader: 'url-loader1',
        options: {
            limit: 200 * 1024
        }
    }
},
{
    test: /\.less$/,
    use: ['style-loader2', 'css-loader2', 'less-loader2']
}
```

创建`index.less`

```css
@base: #f938ab;
body {
  background: @base;
  background: url("./photo.png");
}
```

`less-loader2.js`

```js
// 将less转为css
let less = require('less')

function loader(source) {
    let css = ''
    // console.log(source, 2222);
    less.render(source, function (err, output) {
        // console.log(output);
        css = output.css
    })
    // css = css.replace(/\n/g, '\\n');
    return css
}

module.exports = loader
```


`css-loader2.js`

```js
// css-loader 用来解析@import这种语法,包括css中引入的图片
function loader(source) {
    let reg = /url\((.+?)\)/g   // 匹配括号

    let pos = 0;
    let current;

    let arr = ['let list = []']

    while (current = reg.exec(source)) {
        let [matchUrl, g] = current   // matchUrl -> 'url("./photo.png")', g  -> '"./photo.png"'
        // console.log(matchUrl, g, 88);
        let lastIndex = reg.lastIndex - matchUrl.length    // 拿到css从开通到地址链接之前的index
        arr.push(`list.push(${JSON.stringify(source.slice(pos, lastIndex))})`)  // 拼入开始和地址之前的代码
        pos = reg.lastIndex
        arr.push(`list.push('url('+ require(${g}) +')')`)    // 拼入图片地址
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)  // 拼入地址到结尾的代码
    arr.push(`module.exports = list.join('')`)
    console.log(arr.join('\r\n'));
    // let list = []
    // list.push("body {\\n  background: #f938ab;\\n  background: ")
    // list.push('url('+ require("./photo.png") +')')
    // list.push(";\\n}\\n")
    // module.exports = list.join('')

    return arr.join('\r\n')
}
module.exports = loader

```

`style-loader2.js`

```js
let loaderUtils = require('loader-utils')

// 将css插入到html头部
function loader(source) {
    let str = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
   `
    return str
}


// style-loader写了pitch,有返回后面的跳过，自己的写不会走
loader.pitch = function (remainingRequest) {  // 剩余的请求
    console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest, 99999999))
    // 让style-loader 处理 less-loader 和css-loader拼接的结果
    // 得到 /Users/liuhuimin/work/webpack/loader/css-loader2.js!/Users/liuhuimin/work/webpack/loader/less-loader2.js!/Users/liuhuimin/work/webpack/src/index.less
    // 剩余的请求 less-loader!css-loader!./index.less
    // console.log(remainingRequest, 1223);
    // require返回的就是css-loader处理好的结果require('!!css-loader!less-loader!./index.less')
    let str = `
    let style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
    document.head.appendChild(style)
   `
    // stringifyRequest 绝对路径转相对路径
    return str
}
module.exports = loader

```


```js
user: ['style-loader2', 'css-loader2', 'less-loader2']

    pitch loader - 有返回值

pitch   style-loader2 → css-loader2  less-loader2
                     ↙
               有返回值               资源
               ↙
normal  style-loader2  css-loader2  less-loader2
```

在`style-loader2`中 引用了`less-loader` `css-loader` 和`less`文件

[返回目录](#目录)
## webpack中的插件
`yarn add webpack webpack-cil -D`

`webpack.config.js`

```js
let path = require('path')
let DonePlugin = require('./plugins/DonePlugins')
let AsyncPlugins = require('./plugins/AsyncPlugins')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DonePlugin(),    // 同步
        new AsyncPlugins()   // 异步
    ]
}

```

`node_modules/webpack/lib`中查看`Compiler.js`

1. 同步`plugins/DonePlugins`

打包完成

```js
class DonePlugins {
    apply (compiler) {
        console.log(1);
        compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log('编译完成');
        })
    }
}


module.exports = DonePlugins

```


2. 异步`plugins/AsyncPlugins`

```js
class AsyncPlugins {
    apply (compiler) {
        console.log(2);
        compiler.hooks.emit.tapAsync('AsyncPlugin', (complete, callback) => {
            setTimeout(() => {
                console.log('文件发射出来');
                callback()
            }, 1000)
        })
        compiler.hooks.emit.tapPromise('AsyncPlugin', (complete, callback) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('文件发射出来 222');
                    resolve()
                }, 1000)
            })
        })
    }
}


module.exports = AsyncPlugins
```
[返回目录](#目录)
### 文件列表插件
希望生成一个文件描述打包出来的文件

在`plugins`中新建`FileListPlugin`

```js
class FileListPlugin {
    constructor ({filename}) {
        this.filename = filename
    }
    apply (compiler) {
        // 文件已经准备好了 要进行发射
        // emit
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            let assets = compilation.assets;
            console.log(assets, 55);
            let content = `## 文件名  资源大小\r\n`
            // [ [bundls.js, {}], [index.html, {}]]
            Object.entries(assets).forEach(([filename, stateObj]) => {
                content += `- ${filename}    ${stateObj.size()}\r\n`
            })
            // 资源对象
            assets[this.filename] = {
                source () {
                    return content;
                },
                size () {
                    return content.length
                }
            }
        })
    }
}

module.exports = FileListPlugin

```

```js
let path = require('path')
let DonePlugin = require('./plugins/DonePlugins')
let AsyncPlugins = require('./plugins/AsyncPlugins')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DonePlugin(),
        new AsyncPlugins(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new FileListPlugin({
            filename: 'list.md'
        })
    ]
}

```

生成`list.md`
[返回目录](#目录)
### 内联webpack插件
新建`index.css`引入`index.js`

`yarn add css-loader mini-css-extract-plugin -D`

希望打包后`css、js`内联在`index.html`文件中

创建`plugins`中`InlineSourcePlugins.js`

`yarn add --dev html-webpack-plugin@next`

[HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)

`webpack.config.js`

```js
let path = require('path')
let DonePlugin = require('./plugins/DonePlugins')
let AsyncPlugins = require('./plugins/AsyncPlugins')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')

let InlineSourcePlugins = require('./plugins/InlineSourcePlugins')

let MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        // new DonePlugin(),
        // new AsyncPlugins(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new InlineSourcePlugins({
            match: /\.(js|css)/
        }),
        // new FileListPlugin({
        //     filename: 'list.md'
        // })
    ]
}

```

`InlineSourcePlugins.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 把外链的标签编程内联的标签
class InlineSourcePlugins {
    constructor({match}) {
        this.reg = match  // 正则
    }

    // 处理某一个标签
    processTag(tag, compilation) {
        let newTag = {}
        let url = ''
        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style',
                attributes: {type: 'text/css'}
            }
            url = tag.attributes.href
        } else if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script',
                attributes: {type: 'application/javascript'}
            }
            url = tag.attributes.src
        }
        if (url) {
            newTag.innerHTML = compilation.assets[url].source(); // 文件内容放到innerHTML属性中
            delete compilation.assets[url]   // 删除原有的资源
            return newTag
            // console.log(compilation.assets[url].source());
        }
        return tag
    }

    // 处理引入标签的数据
    processTags(data, compilation) {
        let headTags = []
        let bodyTags = []
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation))
        })
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation))
        })
        console.log({...data, headTags, bodyTags})
        return {...data, headTags, bodyTags}
    }



    apply(compiler) {
        // 通过webpackPlugin来实现  npm搜索  html-webpack-plugin
        compiler.hooks.compilation.tap('InlineSourcePlugins', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alertPlugin',
                (data, callback) => {
                    // console.log('======');
                    // console.log(data) // 插入html标签的数据
                    // console.log('======');
                    data = this.processTags(data, compilation)   // compilation.assets 资源的链接
                    callback(null, data)
                })
        })

    }
}

module.exports = InlineSourcePlugins

```
[返回目录](#目录)
## 打包后自动发布
打包好的文件自动上传致七牛

需要这几个参数

```
bucket: ''  // 七牛的存储空间
domain: '',
accessKey: '', // 七牛云的两对密匙
secretKey: '' // 七牛云的两对密匙
```

注册七牛，并在对象存储里面,新建存储空间列表`test`,`bucket: 'test'`

内容管理外链接默认域名 `domain: 'xxxxxxxx'`

右上角个人面板里面个人中心,密钥管理分别对应`accessKey`和`secretKey`

[进入开发者中心](https://developer.qiniu.com/) -> SDK&工具 -> 官方SDK -> Node服务端文档 —> 文件上传


[node文件上传](https://developer.qiniu.com/kodo/sdk/1289/nodejs)



`npm install qiniu`

[compiler-hooks](https://webpack.docschina.org/api/compiler-hooks)


`webpack.config.js`

```js
plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new UploadPlugin({
            bucket: 'test',  // 七牛的存储空间
            domain: 'poyrjyh1b.bkt.clouddn.com',
            accessKey: 'xxxxxx', // 七牛云的两对密匙
            secretKey: 'yyyyyy' // 七牛云的两对密匙
        })
    ]
```

`UploadPlugin.js`

```js
let qiniu = require('qiniu')
let path = require('path')

class UploadPlugin {
    constructor (options = {}) {
        // 参考 https://developer.qiniu.com/kodo/sdk/1289/nodejs
        let { bucket = '', domain = '', accessKey = '', secretKey = ''} = options
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket
        });
        this.uploadToken = putPolicy.uploadToken(mac)
        let config = new qiniu.conf.Config();
        this.formUploader = new qiniu.form_up.FormUploader(config)
        this.putExtra = new qiniu.form_up.PutExtra()
    }
    apply (compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', (complication) => {
            let assets = complication.assets
            let promise = []
            Object.keys(assets).forEach(filename => {
                promise.push(this.upload(filename))
            })
            return Promise.all(promise)
        })
    }

    upload (filename) {
        return new Promise((resolve, reject) => {
            let localFile = path.resolve(__dirname, '../dist', filename)
            this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, function(respErr,
                                                                                 respBody, respInfo) {
                if (respErr) {
                    reject(respErr)
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody)
                } else {
                    console.log(respInfo.statusCode)
                    console.log(respBody)
                }
            });
        })
    }
}

module.exports = UploadPlugin

```
[返回目录](#目录)
