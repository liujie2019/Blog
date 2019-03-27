`Inquirer.js`试图为NodeJs做一个可嵌入式的美观的命令行界面。

它是非常容易去处理以下几种事情的：

* 提供错误回调
* 询问操作者问题
* 获取并解析用户输入
* 检测用户回答是否合法
* 管理多层级的提示

### 安装和使用
```
npm install inquirer
```
```
# demo
const inquirer = require('inquirer');

inquirer.prompt([{
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true
}, {
    type: 'input',
    name: 'phone',
    message: 'What is your phone number?',
    default: true
}]).then((data) => {
    console.log('结果为：');
    console.log(data);
});
```
```
# 结果为：
{ test: true, phone: '1234567890' }
```
从这个小demo可以看出来，通过Inquirer的prompt方法就可以在命令行中对用户提出问题。

### Questions(问题)
问题的标题和默认结果值都是可以预设的。而在回答完成后会返回一个Promise对象，在其then方法中可以获取到用户输入的所有回答。其中传递给prompt方法的参数为一个question问题数组，数组中的每个元素都是一个问题对象。其包含的属性共有以下几种：

* type: String, 表示提问的类型，下文会单独解释
* name: String, 在最后获取到的answers回答对象中，作为当前这个问题的键
* message: String|Function, 打印出来的问题标题，如果为函数的话
* default: String|Number|Array|Function, 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。假如为函数时，函数第一个参数为当前问题的输入答案。
* choices: Array|Function, 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。为数组时，数组的每个元素可以为基本类型中的值。
* validate: Function, 接受用户输入，并且当值合法时，函数返回true。当函数返回false时，一个默认的错误信息会被提供给用户。
* filter: Function, 接受用户输入并且将值转化后返回填充入最后的answers对象内。
* when: Function|Boolean, 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。也可以是简单类型的值。
* pageSize: Number, 改变渲染list,rawlist,expand或者checkbox时的行数的长度。

>其中，default, choices, validate, filter, when等函数都能被异步调用。同时返回一个promise或者通过使用`this.async()`函数来进行回调获取最终值

```
{
  /* 首选使用 promise */
  filter: function () {
    return new Promise(/* etc... */);
  },
 
  /* 也可以使用 this.async */
  validate: function (input) {
    // Declare function as asynchronous, and save the done callback 
    var done = this.async();
 
    // 进行异步操作
    setTimeout(function () {
      if (typeof input !== 'number') {
        // Pass the return value in the done callback 
        done('You need to provide a number');
        return;
      }
      // Pass the return value in the done callback 
      done(null, true);
    }, 3000);
  }
}
```
### Answers(回答)
Answers是一个包含有用户客户端输入的每一个问题的答案的对象
键：问题对象的name属性。值：取决于问题的类型，confirm类型为Boolean，Input类型为用户输入的字符串，rawlist和list类型为选中的值，也为字符串类型。

### Separator(分隔)
可以为任意的choices数组选项添加分隔，方便在多选项时划分选项类别。
### Prompt types(问题类型)
* List  

```
{type: 'list'}
```
问题对象中必须有type,name,message,choices等属性，同时，default选项必须为默认值在choices数组中的位置索引(Boolean)

* Raw list

```
{type: 'rawlist'}
```
与List类型类似，不同在于，list打印出来为无序列表，而rawlist打印为有序列表

* Expand

```
{type: 'expand'}
```
同样是生成列表，但是在choices属性中需要增加一个属性：key，这个属性用于快速选择问题的答案。类似于alias或者shorthand的东西。同时这个属性值必须为一个小写字母。

* Checkbox

```
{type: 'checkbox'}
```
其余诸项与list类似，主要区别在于，是以一个checkbox的形式进行选择。同时在choices数组中，带有checked: true属性的选项为默认值。

* Confirm

```
{type: 'confirm'}
```
提问，回答为Y/N。若有default属性，则属性值应为Boolean类型

* Input

```
{type: 'input'}
```
获取用户输入字符串

* Password

```
{type: 'password'}
```
与input类型类似，只是用户输入在命令行中呈现为XXXX

* Editor

```
{type: 'editor'}
```
终端打开用户默认编辑器，如vim，notepad。并将用户输入的文本传回

### 参考文档
1. [Inquirer.js](https://github.com/sboudrias/Inquirer.js)

