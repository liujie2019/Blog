```
# 执行npm link
/usr/local/bin/hello -> /usr/local/lib/node_modules/node-cli/bin/hello.js
/usr/local/lib/node_modules/node-cli -> /Users/liujie26/study/node/expressDemo/node-cli
```

### npm link
开发NPM模块的时候，有时我们会希望，边开发边试用，比如本地调试的时候，`require('myModule')`会自动加载本机开发中的模块。Node规定，使用一个模块时，需要将其安装到全局的或项目的`node_modules`目录之中。对于开发中的模块，解决方法就是在全局的`node_modules`目录之中，生成一个符号链接，指向模块的本地目录。

`npm link`就能起到这个作用，会自动建立这个符号链接。

请设想这样一个场景，你开发了一个模块myModule，目录为`src/myModule`，你自己的项目myProject要用到这个模块，项目目录为`src/myProject`。首先，在模块目录（`src/myModule`）下运行npm link命令。

```
src/myModule$ npm link
```
上面的命令会在NPM的全局模块目录内，生成一个符号链接文件，该文件的名字就是package.json文件中指定的模块名。

```
/path/to/global/node_modules/myModule -> src/myModule
```
这个时候，已经可以全局调用myModule模块了。但是，如果我们要让这个模块安装在项目内，还要进行下面的步骤。

切换到项目目录，再次运行npm link命令，并指定模块名。

```
src/myProject$ npm link myModule
```
上面命令等同于生成了本地模块的符号链接。

```
src/myProject/node_modules/myModule -> /path/to/global/node_modules/myModule
```
然后，就可以在你的项目中，加载该模块了。

```
var myModule = require('myModule');
```
这样一来，myModule的任何变化，都可以直接反映在myProject项目之中。但是，这样也出现了风险，任何在myProject目录中对myModule的修改，都会反映到模块的源码中。

如果你的项目不再需要该模块，可以在项目目录内使用npm unlink命令，删除符号链接。

```
src/myProject$ npm unlink myModule
```
### 参数解析
```
#! /usr/bin/env node

console.log(process.argv);
const argv = process.argv.slice(2);
console.log(argv);
const name = argv[0];
console.log(`hello, ${name}`);
```
```
# 执行 hello liujie
# 结果如下：
[ '/usr/local/bin/node', '/usr/local/bin/hello', 'liujie' ]
[ 'liujie' ]
hello, liujie
```
>命令行参数可通过系统变量`process.argv`获取。 `process.argv`返回一个数组 第一个是node 第二个是脚本文件 第三个是输入的参数，`process.argv[2]`开始得到才是真正的参数部分。

### Commander.js
对于参数处理，我们一般使用commander，commander是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能如：自记录代码、自动生成帮助、合并短参数（“ABC”==“-A-B-C”）、默认选项、强制选项、命令解析、提示符。

```
#!/usr/bin/env node 

var program = require('commander');
 program
 	.version('0.0.1')
 	.option('-p, --peppers', 'Add peppers')
 	.option('-P, --pineapple', 'Add pineapple')
 	.option('-b, --bbq-sauce', 'Add bbq sauce')
 	.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
 	.parse(process.argv);
 	
 	console.log('you ordered a pizza with:');
 	if (program.peppers) console.log(' - peppers');
 	if (program.pineapple) console.log(' - pineapple');
 	if (program.bbqSauce) console.log(' - bbq');
 	console.log(' - %s cheese', program.cheese);
```
#### Commander API
* Option(): 初始化自定义参数对象，设置关键字和描述；
* Command(): 初始化命令行参数对象，直接获得命令行输入；
* Command#command(): 定义一个命令名字；
* Command#action(): 注册一个callback函数；
* Command#option(): 定义参数，需要设置关键字和描述，关键字包括简写和全写两部分，以',','|,'空格'做分隔；
* Command#parse(): 解析命令行参数argv；
* Command#description(): 设置description值；
* Command#usage(): 设置usage值。

### 开发命令行翻译工具
```
# 安装相关依赖
npm install commander superagent cli-table2 --save
```
```
新建bin/translator.js文件，并加入package.json文件中

"bin": {
	"translator": "bin/translator.js"
}

然后执行：npm link
```
```
#! /usr/bin/env node
// 引入需要的模块
const program = require('commander');
const Table = require('cli-table2'); // 表格输出
const superagent = require('superagent'); // http请求
// 初始化commander
program
    .allowUnknownOption()
    .version('0.0.1')
    .usage('translator <cmd> [input]');

// 有道api
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1';

// 添加自定义命令
program
    .command('query')
    .description('翻译输入')
    .action((word) => {
        // 发起请求
        superagent.get(API)
        .query({ q: word})
        .end((err, res) => {
            if(err){
                console.log('excuse me, try again');
                return false;
            }
            const data = JSON.parse(res.text);
            const result = {};

            // 返回的数据处理
            if(data.basic) {
                result[word] = data['basic']['explains'];
            }
            else if(data.translation) {
                result[word] = data['translation'];
            }
            else {
                console.error('error');
            }

            // 输出表格
            const table = new Table();
            table.push(result);
            console.log(table.toString());
        })
    })

// 没有参数时显示帮助信息
if (!process.argv[2]) {
    program.help();
    console.log();
}

program.parse(process.argv);
```
```
# 执行：translator query food
┌──────┬───────────────┐
│ food │ n. 食物；养料 │
```



### 参考文档
1. [Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
2. [commander.js](https://github.com/tj/commander.js)
3. [Commander写自己的Nodejs命令](http://blog.fens.me/nodejs-commander/)
4. [Node.js+commander开发命令行工具](https://www.jianshu.com/p/2cae952250d1)
5. [一起来学习如何用 Node 来制作 CLI](https://juejin.im/post/5b581795e51d453509561b34)
6. [node命令行小工具开发](https://www.imooc.com/article/16997)
7. [npm link 命令解析](https://www.cnblogs.com/or2-/p/3572174.html)
8. [npm模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)
9. [commander.js](http://tj.github.io/commander.js/)
10. [有道API](http://fanyi.youdao.com/openapi?path=data-mode)
11. [SuperAgent-发起http请求](http://visionmedia.github.io/superagent/)
12. [cli-table2-命令行表格输出](http://npm.taobao.org/package/cli-table2)
13. [Node命令行工具开发【看段子小工具】](https://www.imooc.com/article/17048#)
14. [cheerio-可理解为服务端的jQuery](https://cheerio.js.org/)
15. [[译] SuperAgent中文使用文档](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd)