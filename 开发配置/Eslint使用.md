### 1. 安装包
```js
$ npm install --save-dev babel-eslint eslint eslint-plugin-react
```
在项目根目录下新建配置文件 `.eslintrc`：

```js
{
    "extends":"eslint:recommended",
    "ecmaFeatures":{
        "jsx":true,
        "modules":true
    },
    "env":{
        "browser":true,
        "node":true,
        "es6":true
    },
    "parser":"babel-eslint",
    "rules":{
        "strict":0, //0表示屏蔽这条规则
        "valid-jsdoc":2, //2表示不符合规则的话会以错误形式提示
        "react/jsx-uses-react":2, //1表示不符合规则的话会以警告形式提示
        "react/jsx-uses-vars":2,
        "react/react-in-jsx-scope":2
    },
    "plugins":[
        "react"
    ]
}
```
### 2. 常用规则说明
>**ps: 配置的value对应的值：**

* 0 => off
* 1 => warning
* 2 => error

>**具体规则如下：**

* **"space-after-keywords":** 1, //关键字后面是否要空一格
* **"no-console":** 2, //禁止使用console
* **"no-const-assign":** 2, //禁止修改const声明的变量
* **"strict":** 0, //使用严格模式
* **"no-undef":** 0, //不能有未定义的变量
* **"no-multi-spaces"**: 1,//不能用多余的空格
* **"valid-jsdoc":** 1, //jsdoc规则
* "react/jsx-uses-react": 1,
* "react/wrap-multilines": 1, //将多行的JSX标签写在 ()里
* "react/jsx-uses-vars": 1,
* "react/react-in-jsx-scope": 1,
* "react/jsx-wrap-multilines": 1, //多行JSX标签写在()里
* "react/jsx-space-before-closing": 1, // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
* "react/jsx-tag-spacing": 1: 在自动关闭的标签前加一个空格，正常情况下不需要换行
* "jsx-quotes": 1,
* "react/jsx-key": 1, 数组结构的子节点需要加key
* "react/jsx-closing-bracket-location": 1, //如果组件有多行的属性, 关闭标签时新建一行
* "react/jsx-curly-spacing": 1, //不要在JSX中的{}两边加空格
* "react/jsx-boolean-value": 1, // 如果属性值为 true, 可以直接省略
* "react/no-string-refs": 1, // 总是使用回调函数方式定义ref
* "react/self-closing-comp": 1, // 对于没有子元素的标签,总是自己关闭标签
* "react/jsx-no-bind": 1, // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
* "react/sort-comp": 1,// 按照具体规范的React.createClass 的生命周期函数书写代码
* "react/jsx-pascal-case": 1 // React模块名使用帕斯卡命名，实例使用骆驼式命名
* "react/no-multi-comp": 1, //每个文件只能定义一个组件，多个无状态组件可以放在一个文件中
* "no-class-assign": 0,
* "no-unused-vars": 1,
* "no-empty": 1,
* "comma-dangle": 0 //是否在列表项最后一项加逗号
* "prefer-template": 0 //强制必须使用ES6的模板字符串
* "camelcase": 1 //使用驼峰格式命名
* "prefer-destructuring": 0, //最好使用结构赋值

### 3. airbnb
```
npm install eslint eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb -D
```

### 参考文档
1. [ESlint官网](http://eslint.cn/docs/user-guide/configuring)
2. [前端开发规范之React应用使用ESLint](https://juejin.im/post/5a3c672451882506e50cd2cc)
3. [Eslint 规则说明](https://www.jianshu.com/p/254d2f6bb6fa)
4. [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
5. [React/JSX 编码规范（Airbnb）](https://www.imooc.com/article/20073)
