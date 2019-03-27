### 1. 安装npm
直接下载`NodeJs`安装即可。[NodeJs官网](https://nodejs.org/zh-cn/)
### 2. 创建项目目录

```
# 创建项目文件夹
mkdir webpack_react_test
# 进入项目目录
cd webpack_react_test
# 生成项目配置的package.json文件
# npm init -y
```
初始配置如下：

![](../static/packagejson.png)

**特别注意：name不能跟我们的模块和项目文件目录同名。**
#### 2.1 在项目文件夹下创建src和dist两个文件夹
src文件夹用来存放原始数据和我们将写的js模块，dist是项目的打包目录。在`index.html`入口文件中写入最基本的html代码。
最终项目目录如下：

![](../static/project.png)
### 3. 安装相关npm包
#### 3.1 安装webpack

```
# 全局安装
npm install -g webpack 
# 项目目录安装
npm install --save-dev webpack 
```
#### 3.2 安装babel相关工具包

```
# 全局安装babel
npm install -g babel
# 在项目目录下安装相关包
npm install --save-dev babel-loader babel-core babel-preset-env babel-preset-react
```
#### 3.3 安装react相关工具包

```
npm install --save react react-dom
```
#### 3.4 在package.json文件的script标签中进行相关配置
配置如下所示：

![](../static/packagejson2.png)

```
# 编译生成生产模式下的bundle.js
npm run build
# 生成开发模式下的bundles以及启动本地server
npm run dev
```
### 4. 构建本地服务器(webpack-dev-server)
`webpack-dev-server`一个跑在`8080`端口上的`Express`服务器。这个服务器会在内部调用`webpack`。用`webpack-dev-server`的好处在于：它提供了实时刷新浏览器的"Live Reloading"功能和只替换发生改动的模块的"Hot Module Replacement"（HMR）功能。

通过对webpack进行相关配置，来让浏览器监听你的代码修改，并自动刷新显示修改后的结果。其实webpack提供一个可选的本地开发服务器，这个本地服务器基于`node.js`构建，可以实现你想要的这些功能，不过它是一个单独的组件，在`webpack`中进行配置之前需要单独安装它作为项目依赖。

```
npm install --save-dev webpack-dev-server
```
`devserver`作为webpack配置选项中的一项，以下是它的一些配置选项，更多配置可参考[webpack官网](https://webpack.js.org/configuration/dev-server/)

* **contentBase** ：默认`webpack-dev-server`会为根目录提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录。
* **port** ：设置默认监听端口，如果省略，默认为'8080'。
* **inline** ：设置为true，当源文件改变时会自动刷新页面。
* **historyApiFallback** ：在开发单页应用时非常有用，它依赖于`HTML5 history API`，如果设置为true，所有的跳转将指向`index.html`。

#### 4.1 向`webpack-dev-server`传递参数

```
//1.通过命令行参数形式传递
webpack-dev-server --hot --inline

//2.通过在webpack.config.js配置文件中配置
devServer: {
 inline: true,//热加载
 hot:true//热替换
}
```
`inline`参数为整个页面添加了实时刷新(Live Reloading)功能;
`hot`参数开启了模块热更新(Hot Module Reloading)功能，这样就会尝试着重载发生变化的组件，而不是整个页面。

```
//当项目的源码发生改变时，下面三种命令都会导致重新打包，但是有所不同：
//1. 不会重载浏览器中的页面
$ webpack-dev-server
//2. 会重载整个页面
$ webpack-dev-server --inline
//3. 只是重载发生改变的模块（HMR），如果HMR失败的话就重载整个页面
$ webpack-dev-server  --inline --hot
```

### 5. 增加`.babelrc`文件
Babel其实可以完全在`webpack.config.js`中进行配置。但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。

### 6. 去除dist文件夹中的残余文件
打包后的文件添加了`hash`之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件`clean-webpack-plugin`。

```
npm install clean-webpack-plugin --save-dev
```
引入`clean-webpack-plugin`插件后,在配置文件的`plugins`中做相应配置即可：

```
const CleanWebpackPlugin = require("clean-webpack-plugin");
  plugins: [
    new CleanWebpackPlugin('dist/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
  })
  ]
```
### 7. webapck配置文件

```
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, 'src/index.jsx')//__dirname是node.js中的一个全局变量，指向当前执行脚本所在的目录
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: 'bundle.[hash].jsx'
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			exclude: /node_modules/,
			use: ['react-hot-loader/webpack', {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
			}]
		}]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有,翻版必究'),
		new webpack.HotModuleReplacementPlugin(),//热加载插件
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
            template: './index.tmpl.html' 
        }),
        new webpack.optimize.UglifyJsPlugin(),//压缩JS代码
        //清除dist文件夹中重复的文件
        new CleanWebpackPlugin(
        	'dist/assets/bundle.*.jsx', //匹配删除的文件
        	{
		      root: __dirname,//项目根目录
		      verbose: true,//开启在控制台输出信息
		      dry: false//启用删除文件
		})
	],
	devServer: {
		contentBase: './', //本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新
		hot: true
	},
	//由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
    devtool: 'eval-source-map', 
    resolve: {  
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。  
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']  
    }  
};
```

### 参考文档
1. [webpack中文文档](https://doc.webpack-china.org/concepts/)
2. [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
3. [webpack解惑](https://zhuanlan.zhihu.com/p/24744677)
4. [Webpack——解决疑惑,让你明白](https://www.imooc.com/article/13357)