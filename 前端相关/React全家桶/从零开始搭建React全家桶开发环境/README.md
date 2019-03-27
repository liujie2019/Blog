## 目录
1. [项目说明](#desciption)
* [项目初始化](#init)
* [webpack](#webpack)
* [babel](#babel)
* [react](#react)
* [react-router](#react-router)
* [webpack-dev-server](#webpack-dev-server)
* [模块热替换（Hot Module Replacement）](#HMR)


### <a id="desciption"></a>1. 项目说明

### <a id="init"></a>2. 项目初始化

### <a id="webpack"></a>3. webpack
webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包。webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件。

### webpack核心概念
1. **Entry：** 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
2. **Module：** 模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
3. **Chunk：** 代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
4. **Loader：** 模块转换器，用于把模块原内容按照需求转换成新内容。
5. **Plugin：** 扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
6. **Output：** 输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果

### webpack执行流程
webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module，每找到一个module, 就会根据配置的loader去找相应的转换规则，对module进行转换后，再解析当前module所依赖的module，这些模块会以entry为分组，一个entry和所有相依赖的module也就是一个chunk，最后webpack会把所有chunk转换成文件输出，在整个流程中webpack会在恰当的时机执行plugin的逻辑。

### 安装和使用
```
# npm全局安装
npm install webpack webpack-cli -g 

# yarn安装
yarn global add webpack webpack-cli

# 全局执行webpack命令
webpack --help

#在项目目录中安装
npm install webpack webpack-cli -D
```
**特别注意：** `webpack-cli` 是使用 `webpack` 的命令行工具，在 `webpack4.x` 版本之后不再作为 `webpack` 的依赖了，我们使用时需要单独安装这个工具。

引入了 mode 配置项，开发者可在 none，development（开发 ） 以及 production（产品）三种模式间选择。该配置项缺省情况下默认使用 production 模式。

**webpack4有两种模式：development和production，默认为production。**

```
#生产环境
webpack --mode production

#开发环境
webpack --mode development
```
**在`package.json`文件中的`scripts`字段中进行如下配置：**

```
"scripts": {
    "build": "webpack --mode production --config webpack.production.config.js",
    "dev": "webpack-dev-server --mode development --open"
  }
```
### 1. 入口(entry)
webpack 在构建时需要有入口文件。webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。`webpack4` 默认从项目根目录下的 `./src/index.js` 中加载入口模块。默认的入口文件就是 `./src/index.js`。

我们常见的项目中，如果是单页面应用，那么可能入口只有一个；如果是多个页面的项目，那么经常是一个页面会对应一个构建入口。

入口可以使用 `entry` 字段来进行配置，`webpack` 支持配置多个入口来进行构建：

```
module.exports = {
  entry: './src/index.js' 
}

// 上述配置等同于
module.exports = {
  entry: {
    main: './src/index.js'
  }
}

// 或者配置多个入口
module.exports = {
  entry: {
    foo: './src/page-foo.js',
    bar: './src/page-bar.js', 
    // ...
  }
}

// 使用数组来对多个文件进行打包
// 可以理解为多个文件作为一个入口，webpack 会解析两个文件的依赖后进行打包
module.exports = {
  entry: {
    main: [
      './src/foo.js',
      './src/bar.js'
    ]
  }
}
```
### 2. 输出(output)
webpack 的输出即指 webpack 最终构建出来的静态文件，可以看看上面 webpack 官方图片右侧的那些文件。当然，构建结果的文件名、路径等都是可以配置的，使用 `output` 字段：

```
module.exports = {
  // ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://cdn.eaxmple.com/assets/'
  },
}

// 或者多个入口生成不同文件
module.exports = {
  entry: {
    foo: './src/foo.js',
    bar: './src/bar.js',
  },
  output: {
    filename: '[name].js', //[name]是entry里的key
    path: __dirname + '/dist',
  },
}

// 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时线上使用浏览器缓存
module.exports = {
  // ...
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/[hash]',
  },
}
```
#### 2.1 publicPath属性
**publicPath属性：**指定了在浏览器中用什么地址来引用静态文件，包括图片、js脚本以及css样式加载的地址，一般用于线上发布以及CDN部署的时候使用。具体例子如下：

```
<link href="http://cdn.eaxmple.com/assets/main.css" rel="stylesheet"></head>
<body>
    <div id="root"></div>
	<script type="text/javascript" src="http://cdn.eaxmple.com/assets/bundle.7e74c10f3f0fabe41a65.js">
	</script>
</body>
```
之所以会自动使用`publicPath`属性中设置的值，主要在于使用了`html-webpack-plugin`插件来自动生成项目首页文件，这样一来，**link中的href属性和script中的src属性**都会被自动替换。
### 3. 安装项目需要用到的工具包
#### 3.1 安装bable相关工具包
```
# 全局安装babel
npm install -g babel

# 在项目目录下安装相关包
npm install babel-loader babel-core babel-preset-env babel-preset-react -D
```
说明：`--save-dev`：项目开发时候依赖的包；`--save`：项目发布后还要依赖的包。
两者表面上的区别是：`--save` 会把依赖包名称添加到 package.json 文件 `dependencies` 键下，`--save-dev` 则添加到 package.json 文件 `devDependencies` 键下。
举个例子：如果项目是用 ES6 代码写的，现在你想编译成 ES5 发布，那么 `babel` 就是`devDependencies`；如果项目中还用了 lodash，由于发布之后还是依赖lodash，所以lodash是`dependencies`。
正常使用npm install时，会下载dependencies和devDependencies中的模块，当使用npm install --production或者注明NODE_ENV变量值为production时，只会下载dependencies中的模块。
##### 3.1.1 在项目根目录新建`.babelrc`文件
进行如下配置：

```
{
  "presets": ["env", "react"]
}
```
#### 3.2 安装react相关工具包
```
npm install --save-dev react react-dom
```
### 4. loader
`webpack` 中提供一种处理多种文件格式的机制，便是使用 `loader`。我们可以把 `loader` 理解为是一个转换器，负责把某种文件格式的内容转换成 `webpack` 可以支持打包的模块。

在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 `.hbs` 的模板文件以及一个 `.css` 的样式文件，那么我们需要 `handlebars-loader` 来处理 `.hbs` 文件，需要 `css-loader` 和 `style-loader`来处理 `.css` 文件，最终把不同格式的文件都解析成 `js` 代码，以便打包后在浏览器中运行。

当我们需要使用不同的 loader 来解析处理不同类型的文件时，我们可以在 `module.rules` 字段下来配置相关的规则。
#### 4.1 css相关loader
##### 4.1.1 postcss-loader
`postcss-loader`用来自动给css属性加浏览器兼容性前缀。需要注意的是`webpack4.x`版本后，`postcss-loader`需要结合`postcss-cssnext`来使用，而不是`autoprefixer`。在此之前，需要先在根目录下创建一个`postcss.config.js`文件(类似于`.babelrc`文件)。

```
#postcss.config.js相关配置
module.exports = {
    plugins: [
        require('postcss-cssnext')
    ]
}
```

```
#处理scss文件
#特别注意除了安装sass-loader之外，还需要安装node-sass
npm install sass-loader node-sass postcss-loader postcss-cssnext -D
```
```
#相关配置
rules:[
    {
        test: /\.css$/,
        use: [
            'style-loader', 
            {
                loader:'css-loader',
                options:{
                    modules:true, //css模块化
                    minimize: true //在开发环境下压缩css
                }
            }
        ],
        include: path.resolve(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/ //排除打包目录
    }, {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', {
            loader:'less-loader',
            options:{
                modifyVars:{
                    "color":"#ccc"  //设置变量
                }
            }
        }]
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', {
                loader: 'postcss-loader',
                options: {
                    config: {
                      path: './postcss.config.js'//得在项目根目录创建此文件
                    }
                }
            }, 'sass-loader']
        }),
        include: path.resolve(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/ //排除打包目录
    }
]
```
### 4.2 处理图片
#### 4.2.1 file-loader和url-loader的区别
其实`url-loader`封装了`file-loader`。`url-loader`不依赖于`file-loader`。我们在使用`url-loader`的时候，只需要安装`url-loader`，因为`url-loader`内置了`file-loader`。

`url-loader`在处理图片资源时分两种情况：

1. **图片大小小于limit参数：**`url-loader`将会把文件转为base64编码字符串`DataURL`；
2. **图片大小大于limit参数：**`url-loader`会调用`file-loader`进行处理。

```
#file-loader：在输出目录生成对应的图片，解决css等文件中引入图片路径的问题
{
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}

#url-loader
{
    module:{
        rules:[
            {
                test:/\.(jpg|gif|jpeg|gif|png)$/,
	            use:[
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 图片会被打包在 dist/images 目录下
                            limit: 1024 * 10, //小于10kb进行base64转码引用
                            name: '[hash:8].[name].[ext]'//打包后图片的名称，在原图片名前加上8位hash值
                        }
                    }
                ]
            }
        ]
    }
}
```

### 5. plugin
在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务。可以这么理解，模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。

#### 5.1 extract-text-webpack-plugin
该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。

```
#安装
npm install extract-text-webpack-plugin --save-dev 或 -D

#特别注意：webpack4.x，现在要安装一下版本
npm install extract-text-webpack-plugin@next -D
```
```
#引入插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', {
                loader: 'postcss-loader',
                options: {
                    config: {
                      path: './postcss.config.js'//需要在项目根目录创建此文件
                    }
                }
            }, 'sass-loader']
        }),
        include: path.resolve(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/ //排除打包目录
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].css' //放到dist/css/下
    })
  ]
}
```
**该插件有三个参数：**

* **use：**指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader；
* **fallback：**编译后用什么loader来提取css文件；
* **publicfile：**用来覆盖项目路径,生成该css文件的文件路径
#### 5.2 uglifyjs-webpack-plugin(压缩js)

```
#如果是生产模式下，会自动压缩，不需要使用该插件进行压缩
webpack --mode production

#开发环境下
#安装该插件
npm install uglifyjs-webpack-plugin -D
#引入插件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
#调用插件
plugins: [
    new UglifyjsWebpackPlugin()
]
```
#### 5.3 清空打包输出目录
```
#安装
npm install clean-webpack-plugin -D

#引入插件
const CleanWebpackPlugin = require('clean-webpack-plugin');

#调用插件
new CleanWebpackPlugin('./dist/bundle.*.js')
```
#### 5.4 DefinePlugin
webpack.DefinePlugin相当于是给配置环境定义了一组全局变量，业务代码可以直接使用定义在里面的变量。
#### 5.5 ProvidePlugin(暴露全局变量)

#### 5.6 (copy-webpack-plugin)复制静态资源
```
#安装
npm install copy-webpack-plugin

#引入插件
const CopyWebpackPlugin = require('copy-webpack-plugin');

#调用
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, 'static'),
    to: path.resolve(__dirname, 'pages/static'),
    ignore: ['.*']
  }
])
```
### 6. webpack-dev-server配置
#### 6.1 安装相应的依赖包
```
#react-hot-loader用来支持react热加载
npm install webpack-dev-server react-hot-loader -D
```
#### 6.2 配置文件中进行相关配置
```
#在webpack配置文件中添加devServer相应的配置
devServer: {
        contentBase: './dist',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新,
        compress: true,
        port: 8088,
        hot: true //热加载
}
```
**还需要在`.babelrc`文件中进行插件项配置：**

```
{
    "presets": ["env", "react"],
    "plugins": ["react-hot-loader/babel"] //新增加
}
```
### 7. 配置文件
#### 7.1 开发环境配置文件`webpack.config.js`
```
#rules是一个规则数组，每一项是一个对象，配置loader
rules:[
    {
        test:'匹配文件正则',
        include:'在哪个目录匹配',
        exclude:'排除哪个目录',
        use:[
            //配置多个loader，从右往左依次执行
            {
                loader:"需要的loader",
                options:{
                    //loader的相关配置项
                }
            }
        ]
    }
]
```
```
const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: { 
                        minimize: true
                    }
                }
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新,
        compress: true,
        port: 8088,
        hot: true //热加载
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        //每次打包都会先清除当前目录中dist目录下的文件
        new CleanWebpackPlugin('./dist/bundle.*.js'),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ],
    //由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
    devtool: 'eval-source-map', 
    resolve: {  
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。  
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']  
    } 
};
```
#### 7.2 生产环境配置文件`webpack.production.config.js`
```
const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                              path: './postcss.config.js'  // 得在项目根目录创建此文件
                            }
                        }
                    }, 'sass-loader']
                }),
                include: path.resolve(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/ //排除打包目录
            }, {
                test: /\.html$/,
                use: {
                        loader: 'html-loader',
                        options: { 
                            minimize: true
                        }
                }
            }, {
                test:/\.(jpg|gif|jpeg|gif|png)$/,
	            use:[
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 图片会被打包在 dist/images 目录下
                            limit: 10240, //小于10kb进行base64转码引用
                            name: '[hash:8].[name].[ext]'//打包后图片的名称，在原图片名前加上8位hash值
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack实战练习',
            template: './src/index.html'
        }),
        //每次打包都会先清除当前目录中dist目录下的文件
        new CleanWebpackPlugin('./dist/bundle.*.js'),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    //由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
    devtool: 'eval-source-map', 
    resolve: {  
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。  
        extensions: ['.js', '.jsx', '.coffee', '.css', '.scss']  
    } 
};
```

webpack 的配置其实是一个 Node.js 的脚本，这个脚本对外暴露一个配置对象，webpack 通过这个对象来读取相关的一些配置。因为是 Node.js 脚本，所以可玩性非常高，你可以使用任何的 Node.js 模块，如上述用到的 path 模块，当然第三方的模块也可以。

创建了 webpack.config.js 后再执行 webpack 命令，webpack 就会使用这个配置文件的配置了。

### 7. 脚手架中的 webpack 配置
现今，大多数前端框架都提供了简单的工具来协助快速生成项目基础文件，一般都会包含项目使用的 webpack 的配置，如：

* [create-react-app](https://github.com/facebook/create-react-app)

create-react-app 的 webpack 配置在这个项目下：[react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts)。

* [vue-cli](https://github.com/vuejs/vue-cli/)

vue-cli 使用 webpack 模板生成的项目文件中，webpack 相关配置存放在 build 目录下。

* [angular/devkit/build-webpack](https://github.com/angular/devkit/tree/master/packages/angular_devkit/build_webpack)

通常 angular 的项目开发和生产的构建任务都是使用 angular-cli 来运行的，但 angular-cli 只是命令的使用接口，基础功能是由 [angular/devkit](https://github.com/angular/devkit)来实现的，webpack 的构建相关只是其中一部分，详细的配置可以参考[webpack-configs](https://github.com/angular/devkit/tree/master/packages/angular_devkit/build_webpack/src/angular-cli-files/models/webpack-configs)。

### <a id="babel"></a>4. babel
>Babel 把用最新标准编写的 JavaScript 代码向下编译成浏览器可以识别的版本。 这一过程叫做"源码到源码"编译， 也被称为转换编译。

* babel-core 调用Babel的API进行转码
* babel-loader
* babel-preset-env 用于解析 ES6,ES7等
* babel-preset-react 用于解析 JSX

```
// 安装相应的npm包
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```
>新建babel配置文件.babelrc

```
touch .babelrc
```
```
 {
   "presets": [
     "env",
     "react"
   ],
   "plugins": []
 }
```
>修改webpack.config.js，增加babel-loader相关的配置

```
 /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
 module: {
     rules: [{
         test: /\.js$/,
         use: ['babel-loader?cacheDirectory=true'],
         include: path.join(__dirname, 'src')
     }]
 }
```
### <a id="react"></a>5. react
```
npm install --save react react-dom
```

### <a id="react-router"></a>6. react-router
React-router4采用了单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包，分别是：

* react-router：React Router 核心
* react-router-dom：用于 DOM 绑定的 React Router
* react-router-native：用于 React Native 的 React Router
* react-router-redux：React Router 和 Redux 的集成
* react-router-config：静态路由配置的小助手

>引用react-router 还是 react-router-dom？

在 React 的使用中，我们一般要引入两个包，`react`和`react-dom`，那么`react-router`和`react-router-dom`是不是两个都要引用呢？

答案是否定的，它们两个只要引用一个就行了。不同之处在于：后者比前者多出了`<Link>` <BrowserRouter> 这样的 DOM 类组件。
因此我们只需引用 react-router-dom 这个包就行了。当然，如果搭配 redux ，你还需要使用 react-router-redux。

```
npm install --save react-router-dom
```
##### 6.1 `<BrowserRouter>`
一个使用了 HTML5 history API 的高阶路由组件，保证你的UI界面和URL保持同步。

该组件拥有以下属性：

* basename: string

作用：为所有位置添加一个基准URL；
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。

```
<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```

* getUserConfirmation: func

作用：导航到此页面前执行的函数，默认使用 window.confirm；
使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。

```
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```
* forceRefresh: bool

作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
使用场景：同上。

```
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```
* keyLength: number

作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
使用场景：按需设置。

```
<BrowserRouter keyLength={12} />
```
* children: node

作用：渲染唯一子元素。
使用场景：作为一个 Reac t组件，天生自带 children 属性。
#### `<HashRouter>`
Hash history 不支持 location.key 和 location.state。另外由于该技术只是用来支持旧版浏览器，因此更推荐大家使用 BrowserRouter，此API不再作多余介绍。

#### 

#### `<Switch>`
Switch用于渲染第一个被location匹配到的并且作为子元素的<Route>或者<Redirect>。

>使用<Switch>包裹多个<Route>和直接用多个<Route>有什么区别呢？

`<Switch>`是唯一的，因为它仅仅只会渲染一个路径。相比之下（不使用<Switch>包裹的情况下），每一个被location匹配到的<Route>将都会被渲染。

```
<Route path="/" component={Home} />
<Route path="/Life" render={() => <Redirect to="/User" />} />
<Route path="/Study" component={Study} />
<Route path="/User" component={User} />
<Route path="/:id" component={Match} />
```
对于上面的路由，如果匹配路径是`/Study`的话，将会渲染如下的几个组件：

```
<Route path="/" component={Home} />
<Route path="/Study" component={Study} />
<Route path="/:id" component={Match} />
```
为了解决上述问题，使用<Switch>包裹<Route>，具体代码如下：

```
<Switch>
    <Route path="/" component={Home} />
    <Route path="/Life" render={() => <Redirect to="/User" />} />
    <Route path="/Study" component={Study} />
    <Route path="/User" component={User} />
    <Route path="/:id" component={Match} />
</Switch>
```
但是这样实现之后，由于'/'与其他所有的`path`都匹配，所以导致无论切换到哪个路由，都只是渲染`<Route path="/" component={Home} />`。

此时只能借助于`<Route>`的`exact`属性来解决了，`exact`是精确的意思。当`<Route>`添加`exact`属性后，只有`URL`和该`<Route>`的path属性完全相同的情况下，该`<Route>`才会被渲染。

```
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Life" render={() => <Redirect to="/User" />} />
    <Route path="/Study" component={Study} />
    <Route path="/User" component={User} />
    <Route path="/:id" component={Match} />
</Switch>
```

### <a id="webpack-dev-server"></a>7. webpack-dev-server

### <a id="HMR"></a>8. 模块热替换

### 参考文档
1. [babel配置-各阶段的stage的区别](https://www.vanadis.cn/2017/03/18/babel-stage-x/)
2. [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
3. [react-router](http://reacttraining.cn/web/guides/quick-start)
4. [从零搭建React全家桶框架教程](https://github.com/brickspert/blog/issues/1#init)