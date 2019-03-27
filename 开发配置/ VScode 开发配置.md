### mac_iterm2+zsh命令行调用VS Code
编辑根目录下的zsh配置文件`~/.zshrc`，添加`alias`，具体写法：

```
alias vscode = "/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
```
保存更改并退出，重启iterm2，输入命令`vscode --status`发现正常调用，再使用测试命令`vscode test.txt`发现正确打开test.txt。至此，配置完成。
### 调试 Debug
![](./static/toolbar.png)

* Continue / Pause F5
* Step Over(单步跳过) F10
* Step Into(单步调试) F11
* Step Out(单步跳出) ⇧F11
* Restart ⇧⌘F5
* Stop ⇧F5

* Step Over：在单步执行时，在函数内遇到子函数时不会进入子函数内单步执行，而是将子函数整个执行完再停止，也就是把子函数整个作为一步。有一点，经过我们简单的调试，在不存在子函数的情况下是和Step Into效果一样的（简而言之，越过子函数，但子函数会执行）；
* Step Into：单步执行，遇到子函数就进入并且继续单步执行（简而言之，进入子函数）；
* Step Out：当单步执行到子函数内时，用Step Out就可以执行完子函数余下部分，并返回到上一层函数。

![](./static/debug.png)
在`vscode`中点击调试按钮进入调试状态，代码在第12行断点处停止，按`Step Into`进入`add()`函数，按`Step Out`执行完`add()`函数余下部分，返回入口函数 `fibonacci()` 继续执行，按 `Step Out`直接将 `divide()` 函数执行完。最后单步执行(Step Into)至入口函数结束。

### JavaScript (ES6) Code Snippets (代码片段插件)
用代码片段加快 ES6 开发速度，例如输入`imp`可以自动生成如下JavaScript 代码:

```
import moduleName from 'module';
```
[更多代码片段详见](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
### Git History (Git 历史记录插件)
可视化的 Git 历史记录插件。
### Document This (JSDoc注释插件)
在 TypeScript 和 JavaScript 文件中自动生成详细的 JSDoc 注释。

```
# 快捷键
control + alt + D
```
### fileheader插件(自动生成文件说明注释)
安装完成后，在用户设置里面加入如下配置即可。

```
"fileheader.Author": "自己的名字",
"fileheader.LastModifiedBy": "自己的名字",
"fileheader.tpl": "/*\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by:   {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n"
```
### 参考文档
1. [能让你开发效率翻倍的 VSCode 插件配置（上)](https://juejin.im/post/5a08d1d6f265da430f31950e)
2. [能让你开发效率翻倍的 VSCode 插件配置（中）](https://juejin.im/post/5ad13d8a6fb9a028ce7c0721)
3. [vscode: Visual Studio Code 常用快捷键](https://lzw.me/a/vscode-visual-studio-code-shortcut.html#%E4%B8%BB%E5%91%BD%E4%BB%A4%E6%A1%86)
4. [Visual Studio Code 必备插件，主题及语法提示](http://www.css88.com/archives/8064)