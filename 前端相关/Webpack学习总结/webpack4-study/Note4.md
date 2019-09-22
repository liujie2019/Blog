[TOC]
## loader
[手写loader](https://juejin.im/post/59e6a5de518825469c7461da)

`webapck.config.js`
```js
const path = require('path');

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
创建自定义loader文件my-loader.js
```js
console.log(22);

function loader(source) {  // loader的参数就是源代码
    return source
}
module.exports = loader
```
webpack.config.js

```js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: path.resolve(__dirname, 'loaders', 'my-loader')
                use: 'my-loader' // 如何找到这个my-loader

            }
        ]
    },
    resolveLoader: {
      // 别名
      // alias: {
      //     my-loader: path.resolve(__dirname, 'loaders', 'my-loader')
      // }
        // 让webpack自己去找，先找node_modules，再去loaders中找
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
}

```
如何找到这个自定义的my-loader？有3种方法：

1. 直接在rules中指定：use: path.resolve(__dirname, 'loaders', 'my-loader')；
2. 通过配别名alias；
3. 通过modules(推荐)。

`npx webpack`

[返回目录](#目录)
### loader配置
#### 数组方式
先分别在`loader`文件下创建，`loader2.js`和`loader3.js`

```js
function loader(source) {  // loader的参数就是源代码
    console.log('loader2');  // loader3.js类似
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
my-loader1
my-loader2
my-loader3
```
#### 对象方式
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
my-loader1
my-loader2
my-loader3
```
>特别注意：`loader`的执行顺序: 从右到左, 从下到上。

也可以通过配置不同的参数改变`loader`的执行顺序，`pre` 前面的，`post`在后面的，`normal`正常。

```js
{
    test: /\.js$/,
    use: ['loader1'],
    enforce: 'pre'
},
{
    test: /\.js$/,
    use: ['loader2']
},
{
    test: /\.js$/,
    use: ['loader3'],
    enforce: 'post'
},
```
#### loader的分类和执行顺序
loader的分类：
* pre：前置loader
* normal：普通loader
* post：后置loader
* inline：行内loader

执行顺序：pre -> normal -> inline -> post

#### 行内loader
在loaders文件中新建inline-loader。
```js
function loader(source) {  // loader的参数就是源代码
    console.log('inline');
    return source;
}
module.exports = loader;
```
./src/a.js：
```js
module.exports = 'may';
```
./src/index.js：
```js
console.log('hello');
const a = require('-!inline-loader!./a');
```
##### 符号的含义
* `-!`禁用pre和normal loader
* `!`禁用normal loader
* `!!`禁用pre、post和normal loader

1. `-!`禁用`pre-loader`和`normal-loader`

```js
my-loader1
my-loader2
my-loader3
inline-loader
my-loader3
```
2. `!`禁用`normal-loader`

```js
my-loader1
my-loader2
my-loader3
my-loader1
inline-loader
my-loader3
```
3. `!!` 禁用`pre-loader`、`normal-loader`、`post-loader`，只能行内处理

```js
my-loader1
my-loader2
my-loader3
inline-loader
```
```js
const a = require('inline-loader!./a'); // 不加限制，所有loader都调用
const a = require('-!inline-loader!./a'); // -!禁用pre-loader、normal-loader，只使用post-loader和inline-loader处理处理a.js
const a = require('!inline-loader!./a'); // !禁用normal-loader，只使用pre-loader、post-loader和inline-loader处理处理a.js
const a = require('!!inline-loader!./a'); // !!禁用pre-loader、normal-loader、post-loader，只使用inline-loader处理处理a.js
```
##### pitchLoader和normalLoader
每个loader都由两部分组成pitchLoader和normalLoader，pitch和normal的执行顺序正好相反，当pitch没有定义或者没有返回值时，会先依次执行再获取资源执行loader。如果定义的某个pitch有返回值，则会跳过读取资源和自己的loader。

`use: [my-loader3, my-loader2, my-loader1]`

* 无返回值: 先执行pitch方法，从左到右，再获取资源。

所有的pitchLoader都没有返回值。
```js
pitch   loader3 → loader2 → loader1
                                    ↘
                                      资源
                                    ↙
normal   loader3 ← loader2 ← loader1
```
```js
我是loader3 的pitch
我是loader2 的pitch
我是loader1 的pitch
my-loader1
my-loader2
my-loader3
```
有返回值：直接跳过后续所有的`loader`包括自己的，跳到之前的`loader`，可用于阻断。

[loader](https://webpack.docschina.org/api/loaders/)
```js
use: [my-loader3, my-loader2, my-loader1]
```
my-loader2的pitchLoader有返回值。
```js
pitch   loader3 → loader2  loader1
                     ↙
               有返回值               资源
               ↙
normal  loader3  loader2  loader1
```
`my-loader2.js`
```js
function loader(source) {  // loader的参数就是源代码
    console.log('loader2');
    return source
}

loader.pitch = () => {
    // console.log('我是loader2 的pitch');
    return '我有返回值-阻断了';
}
module.exports = loader;
```
```js
// 执行结果
我是loader3 的pitch
my-loader3
```
[返回目录](#目录)
### babel-loader实现
```bash
yarn add @babel/core @babel/preset-env
```
webpack.config.js：
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
在loader文件创建`babel-loader2.js`(如果你已经装过`babel-loader`)。

拿到`babel`的参数：
```js
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
    validateOptions(schema, options, 'banner-loader')  // 自己的校验格式，自己的写的配置，对应的loader名字
    if (options.filename) {
        // this.cacheable(false); // 传false表示不要缓存，如果有大量计算，推荐缓存
        this.cacheable && this.cacheable();
        // 开启watch模式，当文件发生变化时
        this.addDependency(options.filename); // 自动增加依赖
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

1. 修改`banner.js`的内容后, `webpack`进行监控，打包`webapck.config.js`配置`watch: true`。
2. `loader`缓存

### file-loader和url-loader实现
```js
yarn add mime
```
mime主要用途是：设置某种扩展名的文件的响应程序类型。

[mime](https://github.com/broofa/node-mime#readme)

创建my-file-loader.js
```js
// 拿到babel的参数 需要工具 loaderUtils
const loaderUtils = require('loader-utils');

function loader(source) {  // loader的参数就是源代码
    // file-loader需要返回路径
    // interpolateName根据文件内容生成新的文件名
    const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source })
    this.emitFile(filename, source); // 发射文件
    console.log('loader1');
    return `module.exports="${filename}"`;
}
loader.raw = true; // 二进制
module.exports = loader;
```
创建url-loader.js
```js
// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils = require('loader-utils');
let mime = require('mime');  // 作用是设置某种扩展名的文件的响应程序类型

function loader(source) {  // loader的参数就是源代码
    const {limit} = loaderUtils.getOptions(this);
    console.log(this.resourcePath);
    // 如果图片小于limit，则使用base64编码
    if (limit && limit > source.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require('./file-loader').call(this, source);
    }
}
loader.raw = true; // 二进制
module.exports = loader;
```
webpack.config.js
```js
{
    test: /\.png$/,
    // 目的是根据图片生成md5 发射到dist目录下，file-loader还会返回当前图片路径
    // use: 'file-loader'
    // 处理路径
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024
        }
    }
}
```
`index.js`引入图片
```js
import p from './photo.png';

let img = document.createElement('img');
img.src = p;
document.body.appendChild(img);

```
[返回目录](#目录)

### less-loader和css-loader实现
先安装less
```js
yarn add less
```
分别创建style-loader、css-loader、less-loader。

#### css-loader
主要用来处理css中的图片链接，需要把url转换成require。
`webpack.config.js`
```js
{
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
}
```
创建index.less
```css
@base: #f938ab;
body {
  background: @base;
  background: url('./photo.png');
}
```
less-loader.js
```js
// 将less转为css
let less = require('less');

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
`css-loader.js`
```js
// css-loader 用来解析@import这种语法，包括css中引入的图片
function loader(source) {
    let reg = /url\((.+?)\)/g; // 匹配括号
    let pos = 0;
    let current;
    let arr = ['let list = []'];
    while (current = reg.exec(source)) {
        let [matchUrl, g] = current;  // matchUrl -> 'url("./photo.png")', g  -> '"./photo.png"'
        // console.log(matchUrl, g);
        let lastIndex = reg.lastIndex - matchUrl.length; // 拿到css从开通到地址链接之前的index
        arr.push(`list.push(${JSON.stringify(source.slice(pos, lastIndex))})`); // 拼入开始和地址之前的代码
        pos = reg.lastIndex
        // 把g替换成require的写法
        arr.push(`list.push('url('+ require(${g}) +')')`)    // 拼入图片地址
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);  // 拼入地址到结尾的代码
    arr.push(`module.exports = list.join('')`);
    // console.log(arr.join('\r\n'));
    // let list = []
    // list.push("body {\\n  background: #f938ab;\\n  background: ")
    // list.push('url('+ require("./photo.png") +')')
    // list.push(";\\n}\\n")
    // module.exports = list.join('')
    return arr.join('\r\n');
}
module.exports = loader;
```
`style-loader.js`
```js
const loaderUtils = require('loader-utils');

// 将css插入到html头部
function loader(source) {
    let str = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
   `;
    return str;
}

// style-loader写了pitch，有返回后面的跳过，自己的写不会走
// remainingRequest-剩余的请求
loader.pitch = function (remainingRequest) {
    console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest));
    // 让style-loader 处理 less-loader 和css-loader拼接的结果
    // 得到 /Users/liuhuimin/work/webpack/loader/css-loader2.js!/Users/liuhuimin/work/webpack/loader/less-loader2.js!/Users/liuhuimin/work/webpack/src/index.less
    // 剩余的请求 css-loader!less-loader!./index.less
    // console.log(remainingRequest, 1223);
    // require路径 返回的就是css-loader处理好的结果require('!!css-loader!less-loader!./index.less')
    let str = `
    let style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
    document.head.appendChild(style)
   `
    // stringifyRequest方法用来将绝对路径转为相对路径
    return str;
}
module.exports = loader;
```
```js
use: ['style-loader', 'css-loader', 'less-loader']

    pitch loader - 有返回值

pitch   style-loader2 → css-loader2  less-loader2
                     ↙
               有返回值               资源
               ↙
normal  style-loader2  css-loader2  less-loader2
```

在`style-loader`中引用了`less-loader`、`css-loader`和`less`文件。

[返回目录](#目录)
## webpack中的插件
`yarn add webpack webpack-cil -D`

webpack.config.js
```js
let path = require('path');
let DonePlugin = require('./plugins/DonePlugins');
let AsyncPlugins = require('./plugins/AsyncPlugins');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DonePlugin(), // 同步
        new AsyncPlugins() // 异步
    ]
}
```
`node_modules/webpack/lib`中查看`Compiler.js`

1. 同步`plugins/DonePlugins`

打包完成
```js
class DonePlugins {
    apply(compiler) {
        console.log(1);
        // tap的第一个参数一般是插件的名称
        compiler.hooks.done.tap('DonePlugin', stats => {
            console.log('编译完成');
        })
    }
}
module.exports = DonePlugins;
```

2. 异步`plugins/AsyncPlugins`

```js
class AsyncPlugins {
    apply(compiler) {
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
module.exports = AsyncPlugins;
```
[返回目录](#目录)
### 文件列表插件
希望生成一个文件，描述打包出来的文件。

在`plugins`中新建`FileListPlugin`

```js
class FileListPlugin {
    constructor({filename}) {
        this.filename = filename;
    }
    apply(compiler) {
        // 文件已经准备好了 要进行发射
        // emit
        compiler.hooks.emit.tap('FileListPlugin', compilation => {
            // assets为当前要打包的资源
            let assets = compilation.assets;
            // console.log(assets);
            let content = `## 文件名  资源大小\r\n`
            // [ [bundls.js, {}], [index.html, {}]]
            // size方法获取文件大小
            Object.entries(assets).forEach(([filename, stateObj]) => {
                content += `- ${filename}    ${stateObj.size()}\r\n`
            })
            // 向资源对象中添加新的打包资源文件
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
module.exports = FileListPlugin;
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
生成`list.md`。
[返回目录](#目录)
### 内联webpack插件
新建`index.css`引入`index.js`
```js
yarn add css-loader mini-css-extract-plugin -D
```

希望打包后`css、js`内联在`index.html`文件中

创建`plugins`中`InlineSourcePlugins.js`

```js
yarn add --dev html-webpack-plugin@next
```

[HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)

`webpack.config.js`

```js
let path = require('path')
let DonePlugin = require('./plugins/DonePlugins')
let AsyncPlugins = require('./plugins/AsyncPlugins')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')
let InlineSourcePlugins = require('./plugins/InlineSourcePlugins')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        // 只处理js和css结尾的文件
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
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 把外链的标签 变成内联的标签
class InlineSourcePlugins {
    constructor({match}) {
        this.reg = match;  // 正则
    }
    // 处理某一个标签
    processTag(tag, compilation) {
        let newTag = {};
        let url = '';
        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style',
                attributes: {type: 'text/css'}
            }
            url = tag.attributes.href;
        } else if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script',
                attributes: {type: 'application/javascript'}
            }
            url = tag.attributes.src;
        }
        if (url) {
            // 将文件内容放到innerHTML属性中
            newTag.innerHTML = compilation.assets[url].source();
            delete compilation.assets[url] ; // 删除原有的资源
            return newTag;
            // console.log(compilation.assets[url].source());
        }
        return tag;
    }

    // 处理引入标签的数据
    processTags(data, compilation) {
        const headTags = [];
        const bodyTags = [];
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation))
        });
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation))
        });
        // console.log({...data, headTags, bodyTags})
        return {...data, headTags, bodyTags};
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
                    data = this.processTags(data, compilation); // compilation.assets 资源的链接
                    callback(null, data);
                })
        })

    }
}
module.exports = InlineSourcePlugins;
```
[返回目录](#目录)
## 打包后自动发布
将打包好的文件自动上传到七牛。

需要这几个参数
```js
bucket: ''  // 七牛的存储空间
domain: '',
accessKey: '', // 七牛云的两对密匙
secretKey: '' // 七牛云的两对密匙
```
注册七牛，并在对象存储里面新建存储空间列表`test`，`bucket: 'test'`。

内容管理外链接默认域名 `domain: 'xxxxxxxx'`

右上角个人面板里面个人中心，密钥管理分别对应`accessKey`和`secretKey`

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
let qiniu = require('qiniu');
let path = require('path');

class UploadPlugin {
    constructor (options = {}) {
        // 参考 https://developer.qiniu.com/kodo/sdk/1289/nodejs
        let { bucket = '', domain = '', accessKey = '', secretKey = ''} = options;
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket
        });
        this.uploadToken = putPolicy.uploadToken(mac);
        let config = new qiniu.conf.Config();
        this.formUploader = new qiniu.form_up.FormUploader(config);
        this.putExtra = new qiniu.form_up.PutExtra();
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', complication => {
            // complication.assets资源文件
            let assets = complication.assets;
            let promises = [];
            Object.keys(assets).forEach(filename => {
                promises.push(this.upload(filename));
            });
            return Promise.all(promises);
        })
    }

    upload(filename) {
        return new Promise((resolve, reject) => {
            let localFile = path.resolve(__dirname, '../dist', filename);
            this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, function(respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                if (respInfo.statusCode === 200) {
                    resolve(respBody);
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            });
        })
    }
}

module.exports = UploadPlugin;
```
[返回目录](#目录)
