### 1.引入webpack-dev-server的好处

```
const path = require("path");
module.exports = {
	entry: {
		index: ["./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "[name].js"
	}
};
```
上面给出的是一个最基本的webpack打包配置，该配置文件提供一个入口和一个出口， webpack 根据这个配置文件来进行资源文件的打包和编译工作。
虽然 webpack 提供了` webpack --watch` 的命令来动态监听文件的改变并实时打包，输出新 index.js 文件，这样文件多了之后打包速度会很慢。此外，这样的打包方式不能做到 hot replace ，即每次 webpack 编译之后，你还需要手动刷新浏览器。

对于上述的问题，使用`webpack-dev-server`可以得到很好的处理。 `webpack-dev-server`主要通过启动了一个 express 服务器 。其主要是用来伺服资源文件 ，此外这个服务器 和 client 使之间使用了 websocket 通讯协议，原始文件作出改动后， `webpack-dev-server `会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，而是存放在了内存中。
### 2.相关介绍
`webpack-dev-server`是一个小型的`Node.js Express`服务器，它使用`webpack-dev-middleware`来服务于`webpack`的包。

**注意:** webpack-dev-server是一个独立的NPM包,你可以通过`npm install webpack-dev-server --save-dev`命令来安装它。
### 3.webpack-dev-server配置
#### 基本目录配置(ContentBase)
`webpack-dev-server`默认会以当前目录(一般为webpack.config.js所在的目录)为基本目录，除非指定特定的目录，可以通过指定content base来修改这个默认行为。

```
$ webpack-dev-server --content-base dist/
```
上述命令是在命令行中执行的，它将dist目录作为根目录(需要将主页面即index.html也放到该目录下)。还有一点需要注意的是：`webpack-dev-server`生成的包并没有放在真实目录中，而是放在了**内存中**。

**需要注意的是：**
在 `webpack.config.js` 文件中，如果配置了 output 的 `publicPath` 这个字段的话，在 index.html 文件里面也应该做出调整。 因为 `webpack-dev-server `伺服的文件是相对 `publicPath` 这个路径的 。
因此，如果你的 `webpack.config.js` 配置成这样的：

```
module.exports = {
        entry: './src/index.js',
        output: {
            path: './dist',
            filename: 'bundle.js'，
            publicPath: '/assets/'
        }
    }
```
那么，在 index.html 文件当中引入的路径也发生相应的变化:

```
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
    </head>
    <body>
        <script src="/assets/bundle.js"></script>
    </body>
    </html>
```
如果在 `webpack.config.js` 里面没有配置` output` 的 `publicPath` 的字段，那么`index.html `最后引入的文件 js文件路径应该是下面这样的：
```
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo</title>
    </head>
    <body>
        <script src="bundle.js"></script>
    </body>
    </html>
```
#### 自动刷新
`webpack-dev-server`支持两种模式来自动刷新页面：

 - iframe模式

页面放在iframe中,当发生改变时重载。使用这种模式不需要额外的配置,只需要以下面这种URL格式访问即可:
```
http://«host»:«port»/webpack-dev-server/«path»
```
例如：`http://localhost:8080/webpack-dev-server/index.html`

 - inline模式

将`webpack-dev-sever`的客户端入口添加到包(bundle)中。
`inline`模式下我们访问的URL不用发生变化,启用这种模式分两种情况：
1.当以命令行启动`webpack-dev-server`时，需要做两点：

在命令行中添加`--inline`命令
在`webpack.config.js`中添加`devServer:{inline:true}`

特别注意：**默认情况下使用`--inline`模式**，如果需要切换到`--iframe`模式，只需要设置：
```
devServer:{
		inline: false
	}
```

2.当以Node.js API启动webpack-dev-server时,我们也需要做两点:

 - 由于`webpack-dev-server`的配置中无inline选项，我们需要添加`webpack-dev-server/client?http://«path»:«port»/`到webpack配置的entry入口中。
 - 将`<script src="http://localhost:8080/webpack-dev-server.js"></script>`添加到html文件中。

**两种模式的区别：**
配置的方式和访问的路径稍微有点区别，最主要的区别还是 iframe模式是在网页中嵌入了一个 iframe ，将我们自己的应用注入到这个 iframe 当中去，因此每次你修改的文件后，都是这个 iframe 进行了 reload 。

**对于Iframe模式：**
该模式下，不需要在命令行中添加其他的内容，浏览器访问的路径是:
```
localhost:8080/webpack-dev-server/index.html
```
这个时候这个页面的 header部分 会出现整个 reload消息 的状态。当时改变源文件的时候，即可以完成自动编译打包，页面自动刷新的功能。

如下图所示：
![这里写图片描述](http://img.blog.csdn.net/20170525135324638?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGl1amllMTk5MDEyMTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**对于Inline模式 ：**
需要在命令行`webpack-dev-server`中添加`--inline`参数需要写成：

```
webpack-dev-server --inline
```
相应的访问的路径需要改写为:

```
localhost:8080/index.html
```
该模式下也能完成自动编译打包，页面自动刷新的功能。但是没有的`header 部分`的 reload 消息的显示，不过在**控制台中会显示 reload 的状态**。
`webpack-dev-server` 会在你的 `webpack.config.js `的入口配置文件中添加一个入口：

```
module.exports = {
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:8080/',
                './src/js/index.js'
            ]
        },
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }
```
不过 `Iframe mode` 和` Inline mode` 最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的 reload 的。
两种模式都支持热模块替换(Hot Module Replacement)。热模块替换的好处是：**只替换更新的部分，而不是页面重载**。

### 4.Hot Module Replacement(模块热替换)
开启 `Hot Module Replacement`功能，只需要在命令行中添加 `--hot`参数

```
webpack-dev-server --hot --inline --content-base ./dist
```
其他配置选项：

```
--quiet 控制台中不输出打包的信息
--compress 开启gzip压缩
--progress 显示打包的进度
--open 打开默认浏览器的url
```
### 5.extract-text-webpack-plugin 的使用及安装
`extract-text-webpack-plugin`插件的作用是：将样式抽取出来为独立的文件。
这样做有好处也有坏处。好处是：减少了HTTP请求数；坏处也很明显：就是当你的样式文件很大时，造成编译的js文件也很大，同时有可能引起页面样式加载错乱的现象。
该插件的安装方法：

```
npm install extract-text-webpack-plugin --save-dev
```
首先进入项目的根目录，然后执行以上命令进行插件的安装，插件安装完成后，接下来我们要做的就是在webpack.config.js中引入该插件：

```
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```
该插件有三个参数意义分别如下：

 - **fallback:** 编译后用什么loader来提取css文件，即`style-loader`
 - **use:** 指需要什么样的loader去编译文件，这里由于源文件是`.css`所以选择`css-loader`
 - **publicfile:** 用来覆盖项目路径，生成该css文件的文件路径

### 参考文章
1. [详解webpack-dev-server的使用](https://segmentfault.com/a/1190000006964335)
2. [详情介绍webpack-dev-server，iframe与inline的区别](http://blog.csdn.net/chengnuo628/article/details/52441977)
