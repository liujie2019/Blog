### 使用babel-polyfill的场景
ie9和一些低版本的高级浏览器对es6新语法并不支持，安装了`babel-polyfill`后，就可以使这些浏览器支持所有es6的新特性。
### 安装
```
npm install babel-polyfill --save-dev
```
### 使用
```
# babel-polyfillde 引用方式有三种：

1.require("babel-polyfill");
2.import "babel-polyfill";
3.module.exports = {
　　entry: ["babel-polyfill", "./app/js"]
};
```
注意：第三种方法适用于使用webpack构建的同学，加入到webpack配置文件(`webpack.config.js`)entry项中。