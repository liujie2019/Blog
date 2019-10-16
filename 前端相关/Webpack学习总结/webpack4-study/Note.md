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
  - [全局暴露](#%e5%85%a8%e5%b1%80%e6%9a%b4%e9%9c%b2)
  - [在每个模块中都注入](#%e5%9c%a8%e6%af%8f%e4%b8%aa%e6%a8%a1%e5%9d%97%e4%b8%ad%e9%83%bd%e6%b3%a8%e5%85%a5)
  - [在index.html中通过script标签引入jquery, 但是在js中，用import会重新打包jquery，如何避免？](#%e5%9c%a8indexhtml%e4%b8%ad%e9%80%9a%e8%bf%87script%e6%a0%87%e7%ad%be%e5%bc%95%e5%85%a5jquery-%e4%bd%86%e6%98%af%e5%9c%a8js%e4%b8%ad%e7%94%a8import%e4%bc%9a%e9%87%8d%e6%96%b0%e6%89%93%e5%8c%85jquery%e5%a6%82%e4%bd%95%e9%81%bf%e5%85%8d)
- [图片打包处理](#%e5%9b%be%e7%89%87%e6%89%93%e5%8c%85%e5%a4%84%e7%90%86)
  - [在js中创建图片来引入](#%e5%9c%a8js%e4%b8%ad%e5%88%9b%e5%bb%ba%e5%9b%be%e7%89%87%e6%9d%a5%e5%bc%95%e5%85%a5)
  - [在css中引入，如`background('url')`](#%e5%9c%a8css%e4%b8%ad%e5%bc%95%e5%85%a5%e5%a6%82backgroundurl)
  - [`<img src="" alt="" />`；](#img-src%22%22-alt%22%22)
- [打包文件分类](#%e6%89%93%e5%8c%85%e6%96%87%e4%bb%b6%e5%88%86%e7%b1%bb)
  - [打包图片](#%e6%89%93%e5%8c%85%e5%9b%be%e7%89%87)
  - [打包样式(CSS、Less等)](#%e6%89%93%e5%8c%85%e6%a0%b7%e5%bc%8fcssless%e7%ad%89)
  - [给静态资源js/css/img等添加前缀](#%e7%bb%99%e9%9d%99%e6%80%81%e8%b5%84%e6%ba%90jscssimg%e7%ad%89%e6%b7%bb%e5%8a%a0%e5%89%8d%e7%bc%80)
- [打包多页面应用](#%e6%89%93%e5%8c%85%e5%a4%9a%e9%a1%b5%e9%9d%a2%e5%ba%94%e7%94%a8)
- [配置source-map](#%e9%85%8d%e7%bd%aesource-map)
- [watch用法](#watch%e7%94%a8%e6%b3%95)
- [webpack小插件应用](#webpack%e5%b0%8f%e6%8f%92%e4%bb%b6%e5%ba%94%e7%94%a8)
  - [clean-webpack-plugin](#clean-webpack-plugin)
  - [copy-webpack-plugin](#copy-webpack-plugin)
  - [BannerPlugin](#bannerplugin)
- [webpack跨域问题](#webpack%e8%b7%a8%e5%9f%9f%e9%97%ae%e9%a2%98)
  - [特殊场景一：如果后端给的请求路径中没有/api：](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%b8%80%e5%a6%82%e6%9e%9c%e5%90%8e%e7%ab%af%e7%bb%99%e7%9a%84%e8%af%b7%e6%b1%82%e8%b7%af%e5%be%84%e4%b8%ad%e6%b2%a1%e6%9c%89api)
  - [特殊场景二：前端单纯mock数据](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%ba%8c%e5%89%8d%e7%ab%af%e5%8d%95%e7%ba%afmock%e6%95%b0%e6%8d%ae)
  - [特殊场景三：有服务端，不用代理](#%e7%89%b9%e6%ae%8a%e5%9c%ba%e6%99%af%e4%b8%89%e6%9c%89%e6%9c%8d%e5%8a%a1%e7%ab%af%e4%b8%8d%e7%94%a8%e4%bb%a3%e7%90%86)
- [resolve属性的配置](#resolve%e5%b1%9e%e6%80%a7%e7%9a%84%e9%85%8d%e7%bd%ae)
  - [配置modules属性](#%e9%85%8d%e7%bd%aemodules%e5%b1%9e%e6%80%a7)
  - [配置alias属性](#%e9%85%8d%e7%bd%aealias%e5%b1%9e%e6%80%a7)
  - [配置mainFields属性](#%e9%85%8d%e7%bd%aemainfields%e5%b1%9e%e6%80%a7)
  - [配置extensions属性：](#%e9%85%8d%e7%bd%aeextensions%e5%b1%9e%e6%80%a7)
- [定义环境变量](#%e5%ae%9a%e4%b9%89%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)
- [区分不同环境](#%e5%8c%ba%e5%88%86%e4%b8%8d%e5%90%8c%e7%8e%af%e5%a2%83)
- [webpack优化](#webpack%e4%bc%98%e5%8c%96)
  - [noParse](#noparse)
  - [exclude&include](#excludeinclude)
  - [IgnorePlugin](#ignoreplugin)
  - [dllPlugin](#dllplugin)
  - [happyPack](#happypack)
- [webpack自带的优化](#webpack%e8%87%aa%e5%b8%a6%e7%9a%84%e4%bc%98%e5%8c%96)
  - [tree-shaking(仅仅支持import语法，require不支持)](#tree-shaking%e4%bb%85%e4%bb%85%e6%94%af%e6%8c%81import%e8%af%ad%e6%b3%95require%e4%b8%8d%e6%94%af%e6%8c%81)
  - [作用域提升](#%e4%bd%9c%e7%94%a8%e5%9f%9f%e6%8f%90%e5%8d%87)
- [抽取公共代码](#%e6%8a%bd%e5%8f%96%e5%85%ac%e5%85%b1%e4%bb%a3%e7%a0%81)
  - [抽离自有模块](#%e6%8a%bd%e7%a6%bb%e8%87%aa%e6%9c%89%e6%a8%a1%e5%9d%97)
  - [抽离第三方模块](#%e6%8a%bd%e7%a6%bb%e7%ac%ac%e4%b8%89%e6%96%b9%e6%a8%a1%e5%9d%97)
- [懒加载](#%e6%87%92%e5%8a%a0%e8%bd%bd)
- [热更新](#%e7%83%ad%e6%9b%b4%e6%96%b0)

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
```js
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
```bash
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
```js
npm i css-loader style-loader -D
```
```js
module: { // 模块
    rules: [ // 规则
        // style-loader 把css插入head标签中
        // loader功能单一
        // 多个loader 需要 []
        // 顺便默认从右到左
        // 也可以写成对象方式
        {
            test: /\.css$/,   // css 处理
            // use: 'css-loader'
            // use: ['style-loader', 'css-loader'],
            // loader配置成对象方便设置参数即options
            use: [
                // {
                //     loader: 'style-loader',
                //     options: {
                //         insertAt: 'top' // 将css标签插入最顶头，这样可以自定义style不被覆盖
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
```bash
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
        MiniCssExtractPlugin.loader, // 这样相当于抽离成一个css文件，如果希望抽离成分别不同的css，需要再引入MiniCssExtractPlugin，再配置
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
```bash
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
        MiniCssExtractPlugin.loader, // 抽离
        'css-loader', // css-loader 用来解析@import这种语法,
        'postcss-loader'
    ]
}
```
抽离css插件文件时可使用`optimize-css-assets-webpack-plugin`优化压缩css以及js文件。

[返回目录](#目录)
### 压缩css和js
```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

optimization: {   // 优化项目
    minimizer: [
        new UglifyJsPlugin({  // 优化js
            cache: true, // 是否缓存
            parallel: true, // 是否并发
            // sourceMap: true // 源码映射 set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}) // css 的优化
    ]
}

```
[返回目录](#目录)
### css加兼容浏览器的前缀
```js
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
```bash
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
const webpack = require('webpack');
new webpack.ProvidePlugin({
  $: 'jquery'
})
```
其他情况：
### 全局暴露
```js
// 暴露全局变量的loader
npm i expose-loader -D
```
可以在js中`import $ from 'expose-loader?$!jquery'`全局，暴露jquery为$符号，这样就可以调用window.$。

也可在`webpack.config.js`中配置`rules`：

```js
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}
```
以后在`.js`文件中引入
```js
import $ from 'jquery';
```
### 在每个模块中都注入
```js
const webpack = require('webpack');

// 在plugins中配置
new webpack.ProvidePlugin({
    $: 'jquery'
})
```
### 在index.html中通过script标签引入jquery, 但是在js中，用import会重新打包jquery，如何避免？

>解决方法：从输出的bundle中排除依赖。

```js
 externals: {
    jquery: 'jQuery'
    // jquery: '$'
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

### 在js中创建图片来引入
```js
import logo from './logo.png'; // 把图片引入，返回的结果是一个新的图片地址
let image = new Image();
// image.src = './logo.png'; // 这样写就是一个普通字符串，webpack并不会去打包相应的图片
console.log(logo); // 可以手动打印出来查看
image.src = logo; // logo实际存储的是图片打包后的路径
document.body.appendChild(image);
```
>注意：图片地址要`import`或者`require`方式引入，如果直接写图片的地址，会默认为字符串，webpack并不会去打包相应的图片。

### 在css中引入，如`background('url')`
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
### `<img src="" alt="" />`；

这种情况下，需要解析`html`中的`image`。

```bash
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
```bash
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
```js
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
### 打包图片
```js
 {
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少，用base64,否则用file-loader产生真实的图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 1,  // 200k 200 * 1024
            outputPath: 'img/' // 打包后输出在dist/img目录下
        }
    }
 },
```
### 打包样式(CSS、Less等)
```js
plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.css'
    })
]
```
### 给静态资源js/css/img等添加前缀
在打包输出的时候，给这些静态资源js/css/img等加上前缀，传到CDN服务器上也能访问，需要进行如下配置：
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
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024, // 当图片小于200k ，用base64，否则用file-loader产生真实的图片
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
            chunks: ['other', 'home'] // other.html里有other.js和home.js
        }),
    ]
}
```
[返回目录](#目录)
## 配置source-map
```bash
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
    // 不监听的文件或文件夹，支持正则匹配，默认为空
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
[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)：每次打包之前先删除`dist`目录(即webpack配置的打包输出目录)下的文件。
```js
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
将静态资源拷贝到打包输出目录dist中。
```js
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
该插件是webpack内置模块，用于版权声明。
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

app.get('/api/user', (req, res) => {
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
      '/api': 'http://localhost:3000' // 配置一个反向代理
  }
},
```
### 特殊场景一：如果后端给的请求路径中没有/api：
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
    before(app) { // 钩子
        app.get('/api/user', (req, res) => {
            res.json({name: 'liujie-before'})
        })
    }
},
```
### 特殊场景三：有服务端，不用代理
在服务端启动webpack，端口用服务端端口。

>在`server.js`中启动`webpack`：

```js
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
### 配置modules属性
设置模块查找目录：
```js
resolve: {
    // 在当前目录node_modules中查找
    modules: [path.resolve('node_modules')]
},
```
```js
// 以bootstrap为例
npm i bootstrap  -D
```
```js
// bootstrap前面没有加./，说明是一个安装好的模块，会去当前目录下的node_modules下查找
import 'bootstrap'
```
index.js：
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
```js
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
### 配置alias属性
解决模块路径引入很长问题。
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
### 配置mainFields属性
配置优先使用的入口文件。
```js
resolve: {
    // mainFields指定主入口字段名称
    mainFields: ['style', 'main'], // 先用bootstrap中在package中的style，没有style再用main
    // mainFiles: []  // 入口文件的名字 默认index
}
```
### 配置extensions属性：
省略扩展名。
```js
resolve: {
    extensions: ['.js', '.css', '.json'] // 当没有扩展名的时候，先默认js、css次之、json最后
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
    url = 'http://www.baidu.com';
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

```js
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
        // process.cwd()执行打包命令所在的路径
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
```js
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
noParse优化：当某些包是独立的个体即没有依赖时，通过配置告知webpack不要去解析该模块的依赖库。

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

```js
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
```js
npm i react react-dom
```
正常使用：webpack.config.js
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
        libraryTarget: 'var' // 配置如何暴露library，默认为var
        // commonjs 结果放在export属性上，umd统一资源模块, 默认是var
    },
    plugins: [
       new webpack.DllPlugin({
           // 这里的name要和output中的library名称一致
           name: '_dll_[name]', // name === library
           path: path.resolve(__dirname, 'dist', 'manifest.json') // manifest.json 定义了各个模块的路径
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
```js
npm run build
```
打包后的`bundle.js`文件变小，可以理解为先把react和react-dom打包，后面每次都直接使用react和react-dom打包后的结果而不是重新打包。

[返回目录](#目录)
### happyPack
happyPack主要实现了多线程打包。
```js
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

css启用多线程：
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
## webpack自带的优化
### tree-shaking(仅仅支持import语法，require不支持)
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
import在生产环境下会自动去除掉没有用到的代码`minus`，这叫`tree-shaking`，将没有用的代码自动删掉。

>`index.js`：

```js
const calc = require('./test');
// test模块是es6语法导出，导出结果放在default属性上，default是一个对象
console.log(calc);
// 所以这里需要使用calc.default.sum
console.log(calc.default.sum(1, 2));
```
>需要注意：require引入es6模块，打包build后并不会把多余minus代码删除掉，不支持`tree-shaking`。

[返回目录](#目录)
### 作用域提升
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
console.log(6, "---------");
```
在webpack中可以省略一些可以简化的代码。

[返回目录](#目录)
## 抽取公共代码
### 抽离自有模块
webpack.config.js：
```js
optimization: {
    splitChunks: { // 分割代码块，针对多入口
        cacheGroups: { // 缓存组
            common: { // 公共模块
                minSize: 0, // 大于多少抽离
                minChunks: 2, // 使用多少次以上抽离
                chunks: 'initial' // 从什么地方开始，initial表示刚开始
            }
        }
    }
},
```
[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)
分别有a.js和b.js，index.js和other.js分别引入a和b两个js。

index.js：
```js
import './a';
import './b';

console.log('index.js');
```
other.js:
```js
import './a';
import './b';

console.log('other.js');
```
webpack.config.js：
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
### 抽离第三方模块
比如jquery，index.js和other.js分别引入：
```js
import $ from 'jquery';
console.log($);
```
webpack.config.js：
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
                priority: 1, // 增加权重，先抽离第三方模块
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
```js
npm i @babel/plugin-syntax-dynamic-import -D
```
source.js：
```js
export default 'liujie';
```
index.js：
```js
const button = document.createElement('button');

button.innerHTML = 'test';
button.addEventListener('click', function () {
    console.log('click');
    // es6草案中的语法，jsonp实现动态加载文件
    // import('./source.js')返回promise
    import('./source.js').then(data => {
        console.log(data.default);
    })
});

document.body.appendChild(button);
```
webpack.config.js：
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
热更新：即当页面只更新改变的部分，而不是重新打包。
webpack.config.js：
```js
devServer: {
    hot: true, // 启动热更新
    port: 3000,
    progress: true, // 打包进度条
    // contentBase: '', // 起服务的地址
    open: true, // 自动打开浏览器
    // compress: true // 服务器压缩
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
index.js：
```js
import str from './source';
console.log(str);

if (module.hot) {
    module.hot.accept('./source', () => {
        console.log('文件更新了');
        // 文件更新后，用require重新引入新的文件
        // 这里用require来引入文件而不是用import，原因是import只能写在文件顶部
        const str = require('./source');
        console.log(str);
    })
}
```
[返回目录](#目录)