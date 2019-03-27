CSS 模块化重要的是要解决好两个问题：CSS 样式的导入和导出。

```
{
	disabled: "src-style-Button__disabled--IFy68"
	normal: "src-style-Button__normal--3Lbcj"
}
```
注意到 `src-style-Button__disabled--IFy68` 是 CSS Modules 按照 localIdentName 自动生成的 class 名。其中的 `IFy68` 是按照给定算法生成的序列码。经过这样混淆处理后，class 名基本就是唯一的，大大降低了项目中样式覆盖的几率。同时在生产环境下修改规则，生成更短的 class 名，可以提高 CSS 的压缩率。

CSS Modules 对 CSS 中的 class 名都做了处理，使用对象来保存原 class 和混淆后 class 的对应关系。

```
babel-plugin-react-css-modules
```

### 参考文档
1. [选择器权重计数表](https://www.w3.org/TR/selectors/#specificity)
2. [CSS Modules详解及React中实践](https://segmentfault.com/a/1190000004300065)
3. [[译] react-css-modules](https://segmentfault.com/a/1190000004530909)
4. [CSS Modules 入门及 React 中实践](http://www.alloyteam.com/2017/03/getting-started-with-css-modules-and-react-in-practice/)
5. [谈谈PostCSS](https://segmentfault.com/a/1190000011595620)
6. [CSS Modules Webpack Demo](https://css-modules.github.io/webpack-demo/)
7. [CSS Modules实践](https://segmentfault.com/a/1190000010301977)
8. [CSS Modules 用法教程](https://cloud.tencent.com/developer/article/1095727)