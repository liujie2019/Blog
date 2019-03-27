###  webpack 4的默认值约定

* entry 的默认值是 ./src
* output.path 的默认值是 ./dist
* mode 的默认值是 production
* UglifyJs 插件默认开启 caches 和 parallizes


在 `develoment mode` 默认：

* 开启 output.pathinfo
* 关闭 optimization.minimize

在 `production mode` 默认：

* 关闭 in-memory caching
* 开启 NoEmitOnErrorsPlugin
* 开启 ModuleConcatenationPlugin
* 开启 optimization.minimize

### 1. 区分开发和生产环境

>通常我们在开发网页时需要区分构建环境

* 开发环境(development)：开发过程中方便调试的环境
* 生产环境(production)：发布到线上使用的运行环境

通过`cross-env`模块设置环境变量，`cross-env`跨平台地设置及使用环境变量，而不必担心为平台正确设置或使用环境变量。

```
# 安装cross-env模块
npm i cross-env -D
```
在`package.json`文件的scripts中使用：

```
"scripts": {
    "build": "cross-env NODE_ENV=production webpack --config webpack.production.config.js --mode production",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --mode development --open",
    "dll": "webpack --config webpack_dll.config.js --mode development"
  }
```
执行npm命令切换环境

```
# 生产环境 process.env.NODE_ENV === 'production'
npm run build
# 开发环境 process.env.NODE_ENV === 'development'
npm run dev
```
接下来我们就可以在`webpack.config.js`通过`process.env.NODE_ENV`来获取当前环境标识。