对于node的版本管理工具，一般常用的有`nvm`和`n`两种，这两者的特性和差异在哪里？
### n
n 是一个需要全局安装的 npm package。

```
npm install -g n
```
这意味着，我们在使用 n 管理 node 版本前，首先需要一个 node 环境。我们或者用 Homebrew 来安装一个 node，或者从官网下载 pkg 来安装，总之我们得先自己装一个 node —— n 本身是没法给你装的。

然后我们可以使用 n 来安装不同版本的 node。

在安装的时候，n 会先将指定版本的 node 存储下来，然后将其复制到我们熟知的路径 /usr/local/bin，非常简单明了。当然由于 n 会操作到非用户目录，所以需要加 `sudo n`来执行命令。

所以这样看来，n 在其实现上是一个非常易理解的方案。
### nvm
我们再来看 nvm。不同于 n，nvm 不是一个 npm package，而是一个独立软件包。这意味着我们需要单独使用它的安装逻辑：

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
或者
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
```
# 执行source命令，使得配置文件生效
source ~/.bashrc
或者
source ~/.zshrc
```
#### 常用命令
* nvm ls-remote： 列出全部可以安装的版本号
* nvm install 版本号：安装指定版本
* nvm use 版本号：切换指定版本，切换效果是全局的
* nvm current：查看当前使用的版本
* nvm ls：查看该系统已经安装的版本，也能看到当前使用的是哪个版本

```
# 命令后加版本号就可以进行安装，字母v可以不写
nvm install v7.9.0 或者 nvm install 7.9.0
```
```
nvm use v7.8.0
```

或者使用 Homebrew 来安装。安装完后，还需要修改一下 shell 配置（~/.zshrc or whatever），具体参见官方文档。

然后我们可以使用 nvm 来安装不同版本的 node。

在安装的时候，nvm 将不同的 node 版本存储到 ~/.nvm/<version>/ 下，然后修改 $PATH，将指定版本的 node 路径加入，这样我们调用的 node 命令即是使用指定版本的 node。

nvm 显然比 n 要复杂一些，但是另一方面，由于它是一个独立软件包，因此它和 node 之间的关系看上去更合乎逻辑：nvm 不依赖 node 环境，是 node 依赖 nvm；而不像 n 那样产生类似循环依赖的问题。

### 如何选择？
这样看下来，nvm 和 n 的差异还是比较大的，具体体现在：

* 安装简易度。nvm 安装起来显然是要麻烦不少；n 这种安装方式更符合 node 的惯性思维。见仁见智吧。
* 系统支持。注意， nvm 不支持 Windows。
* 对全局模块的管理。n 对全局模块毫无作为，因此有可能在切换了 node 版本后发生全局模块执行出错的问题；nvm 的全局模块存在于各自版本的沙箱中，切换版本后需要重新安装，不同版本间也不存在任何冲突。
* 关于 node 路径。n 是万年不变的 /usr/local/bin；nvm 需要手动指定路径。

所以，如何选择？真心见仁见智了，不过这里可以给出大体的建议：

* 如果你使用 Windows，那没得选了，使用 n，或者换一台 Mac。
* 如果你会频繁切换 node 版本（比如本地经常测试最新版的特性，同时又要兼顾代码在生产环境的兼容性），那么从全局模块兼容性的角度考虑，只能使用 nvm。
* 如果你是一个轻量级的用户，不需要担心兼容性的问题，更关心 node 安装和使用上的体验，那么选择 n。

### 参考文档
1. [管理 node 版本，选择 nvm 还是 n？](http://taobaofed.org/blog/2015/11/17/nvm-or-n/)
2. [nvm](https://github.com/creationix/nvm)
3. [n](https://github.com/tj/n)
4. [正确的安装和使用nvm](https://www.cnblogs.com/cllgeek/p/6076280.html)