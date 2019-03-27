### 1. SplitChunkPlugin使用遇到的问题
>问题描述：在webpack4.x中CommonChunkPlugin已被废弃，webpack4.x推荐使用SplitChunkPlugin来提取公共模块。

使用SplitChunkPlugin有两种方式：

#### 1.1 optimization.splitChunks
```
optimization: {
        //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
        //主要用于多页面
        //例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
        //SplitChunksPlugin配置，其中缓存组概念目前不是很清楚
        splitChunks: {
            // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            chunks: "all",
            // 表示在压缩前的最小模块大小，默认为0；
            minSize: 30000,
            //表示被引用次数，默认为1
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 3,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
            name: true,
            //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
            cacheGroups: {
                //缓存组信息，名称可以自己定义
                commons: {
                    //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
                    name: "test",
                    // 同上
                    chunks: "all",
                    // 同上
                    minChunks: 3,
                    // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                    enforce: true,
                    //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
                    test:""
                },
                //设置多个缓存规则
                vendor: {
                    test: /node_modules/,
                    chunks: "all",
                    name: "vendor",
                    //表示缓存的优先级
                    priority: 10,
                    enforce: true
                }
            }
        }
    }
```
#### 1.2 new webpack.optimize.SplitChunksPlugin
具体配置同`optimization.splitChunks`。
### 2. 提取CSS到单独文件
在之前版本中使用`extract-text-webpack-plugin`来提取CSS文件，不过在webpack 4.x中则应该使用`mini-css-extract-plugin`来提取CSS到单独文件中。

基于webpack 3.0的Vue项目：

```
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    //...
    new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:7].css')
    })
}
```
基于webpack 4.0的Vue项目：

```
const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    //...
    new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:7].css')
    })
}
```
### 3. chunkFilename(为按需加载的文件命名)
### 4. devtool配置对比

### 参考文档
1. [common-chunk-and-vendor-chunk](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)
2. [webpack学习中遇到的坑](https://segmentfault.com/a/1190000013998339?utm_source=tag-newest/*&^%$#articleHeader3)
3. [Vue项目升级到Webpack 4.x初步踩坑总结](https://blog.csdn.net/harsima/article/details/80819747)
4. [webpack解惑：多入口文件打包策略](https://www.cnblogs.com/lvdabao/p/5944420.html)
5. [[webpack] devtool配置对比](https://www.cnblogs.com/hhhyaaon/p/5657469.html)