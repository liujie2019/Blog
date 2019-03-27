npm是javascript的包管理工具，是前端模块化下的一个标志性产物。简单地地说，就是通过npm下载模块，复用已有的代码，提高工作效率。
### NPM 命令系统
```
# 该命令可以获取install命令的详细信息
npm help install

# 查看各命令的简单用法
npm -l

# 初始化package.json
npm init -y

# 搜索与查询
# 使用search命令来搜索npm仓库
npm search jquery

# 查询jquery
npm info jquery

# 进行查询过滤操作
npm info jquery | grep 1.12.3

# 查询版本信息
npm dist-tag ls jquery

# 安装指定版本的包(使用@加上版本号即可)
npm install jquery@1.12.3
```
#### 初始化package.json文件
一般执行`npm init -y`命令可以快速创建一个package.json文件，相应文件如下：

```
{
  "name": "npm_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
我们还可以对NPM进行一些默认配置：

```
npm config set init-author-name "liujie"    # 你的名称
npm config set init-author-email "abc.example@qq.com" # 你的邮箱
npm config set init-author-url "https://www/baidu.com"  # 你的个人网页
npm config set init-license "ISC"   # 开源授权协议名
npm config set init-version "1.0.0"   # 版本号
```
### 更新Node.js和npm

#### MAC更新Node.js和Npm到最新版本

* 1. 查看当前本地安装的node版本

```
node -v
```
* 2. 清除本地node.js的缓存

```
sudo npm cache clean -f
```
* 3. 安装n工具(该工具专门用来管理node.js版本)

```
sudo npm install -g n
```
* 4. 安装最新版本的node.js

```
#安装最新的稳定版本
sudo n stable

#安装最新的 LTS 版
n lts 

# 也可以选择安装一个指定的版本号
sudo n 5.5.1
```
在电脑上安装完成多个版本后，直接在命令行窗口中输入不带参数的 `n` 命令，会出现一个已安装版本的列表，用键盘上下键选择版本，然后回车，就可以切换默认 Node 版本。

* 5. 最后确认一下本地的node.js是否已经更新

```
node -v
```
* 6. 更新npm到最新版

```
npm install npm@latest -g
# 检查更新后的npm版本
npm -v
```

* 7. 直接启动不同版本的 Node
假如我们将默认的 Node 版本设置为 6.10.0 了，而我们要使用 7.6.0 启动某个应用，也非常简单，只需要：

```
n use 7.6.0 index.js
```

* 8. nvm安装node

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
然后依次执行下面两行代码来配置环境变量。

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```
然后在命令行输入：

```
nvm
```
出现`node version manger`等信息，表示安装成功。

```
# 安装对应版本的node
nvm install node版本号
```


### 1. 检查node和npm的安装位置及版本
检查node的安装位置及版本：windows中使用where，linux和mac使用which

```
$ which node
/usr/local/bin/node
$ node --version 或者 node -v
v6.10.3
```

```
$ which npm
/usr/local/bin/npm
$ npm --version
3.10.10
```
### 2. 使用npm安装包
npm可以在局部或全局范围内安装包，在局部范围内，包会安装到根目录下`node_modules`文件夹下面，属于当前用户的。全局范围的包会安装在`{prefix}/lib/node_modules/`下，`{prefix}`通常是`/usr/或/usr/local`。

```
# npm config可以输出安装信息
npm config list
# 获取当前的全局地址
npm config get prefix
# 创建package.json文件
npm init -y
```

当我们试图安装命令行工具的时候，使用全局安装；当我们试图只是单纯安转某一模块的时候，使用本地安装。

**需要注意：本地安装的时候，将依赖包信息写入package.json中非常有必要。**
 
在我们日常的团队协作中，一个常见的情景是别人从代码库中clone你的项目，然后通过`npm install`安装必要的依赖，（刚从代码库中clone下来是没有`node_modules`的，需要安装。那么根据什么信息安装模块依赖呢？就是你的`package.json`中的`dependencies和devDependencies`。所以，在本地安装的同时，将依赖包的信息（要求的名称和版本）写入package.json中是很重要的！

```
# 全局安装
npm install -g 模块名称

# 本地安装
# 安装好后不写入package.json中,该命令用来安装相应的模块到node_modules目录
npm install 模块名称

# 安装好后写入package.json的dependencies中（生产环境依赖）
npm install 模块 --save 或 -S

# 安装好后写入package.json的devDependencies中（开发环境依赖）
npm install 模块 --save-dev 或 -D

# 查看全局安转的包
npm list --global 或 npm list -g 或者 npm ls -g

# 该命令会显示所有模块：(安装的)模块，子模块以及子模块的子模块等。可以限制输出的模块层级:
npm list --depth=0

# 全局路径下的包在命令行中可以使用
uglifyjs example.js -o example.min.js
```

在安装模块之前，`npm install`会先检查`node_modules`目录中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。
如果你希望，一个模块不管是否安装过，`npm` 都要强制重新安装，可以使用`-f`或`--force`参数。

```
npm install <packageName> --force
```

#### 2.1 正确的区分环境依赖
对于一个Web应用来说你的自动构建任务所依赖的包，它属于开发环境依赖，如果你的Web应用依赖jQuery来发起Ajax请求，它应该属于生产环境依赖。

```
# 安装开发环境依赖
npm install webpack --save-dev
# 安装生产环境依赖
npm install jquery --save
```
开发环境依赖和开发环境依赖是有区别的，因为如果你的生产应用依赖jquery写入到了开发环境依赖中，它是无法更新的，除非你手动修改package.json文件中的版本信息，并且将node_modules中的jquery删除和重新使用`npm install`安装之外，你别无它法。正确的方法是写入生产应用依赖，并且用`npm update jquery --save`方式来更新你的jquery。

#### 2.2 删除npm包

```
#删除全局模块
npm uninstall -g <package>

#删除本地模块时你应该思考的问题：是否将在package.json上的相应依赖信息也删除？
#该命令删除本地模块，但不删除模块留在package.json中的对应信息
npm uninstall 模块 

#删除模块，同时删除模块留在package.json中dependencies下的对应信息
npm uninstall 模块 --save 

#删除模块，同时删除模块留在package.json中devDependencies下的对应信息
npm uninstall 模块 --save-dev
```
### 3. npm update
首先先检查包是否有更新：

```
npm outdated
Package     Current  Wanted  Latest  Location
underscore    1.8.2   1.8.3   1.8.3  project
```
* Current代表你已经安装的包版本;
* Latest为最新的版本;
* Wanted为在不破坏现有代码情况下可以更新到的版本号。

如果想更新已安装模块，就要用到`npm update`命令。

```
# 更新全局包
npm update <name> -g

#更新生产环境依赖包
npm update <name> --save

#更新开发环境依赖包
npm update <name> --save-dev
```
它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。
### 4. registry

`npm update`命令怎么知道每个模块的最新版本呢？
答案是 : `npm` 模块仓库提供了一个查询服务，叫做 `registry` 。以 `npmjs.org `为例，它的查询服务网址是 `https://registry.npmjs.org/` 。
这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 `https://registry.npmjs.org/react`，就会看到 react 模块所有版本的信息。
它跟下面命令的效果是一样的。

```
npm view react
# npm view 的别名
npm info react
npm show react
npm v react
```
`registry` 网址的模块名后面，还可以跟上版本号或者标签，用来查询某个具体版本的信息。比如， 访问 `https://registry.npmjs.org/react/v0.14.6` ，就可以看到 React 的 0.14.6 版。
返回的 JSON 对象里面，有一个`dist.tarball`属性，是该版本压缩包的网址。

```
dist: {
  shasum: '2a57c2cf8747b483759ad8de0fa47fb0c5cf5c6a',
  tarball: 'http://registry.npmjs.org/react/-/react-0.14.6.tgz' 
}
```
到这个网址下载压缩包，在本地解压，就得到了模块的源码。`npm install`和`npm update`命令，都是通过这种方式安装模块的。
### 5. 缓存目录
`npm install或npm update`命令，从 `registry `下载压缩包之后，都存放在本地的缓存目录。
这个缓存目录，在 `Linux 或 Mac` 默认是用户主目录下的`.npm`目录，在 Windows 默认是`%AppData%/npm-cache`。通过配置命令，可以查看这个目录的具体位置。

```
$ npm config get cache
$HOME/.npm
#$HOME/是用户主目录
```
你最好浏览一下这个目录。

```
$ ls ~/.npm 
# ~代表的是当前用户的home目录(主目录)
# 或者
$ npm cache ls
```
你会看到里面存放着大量的模块，储存结构是`{cache}/{name}/{version}`。

```
$ npm cache ls react
~/.npm/react/react/0.14.6/
~/.npm/react/react/0.14.6/package.tgz
~/.npm/react/react/0.14.6/package/
~/.npm/react/react/0.14.6/package/package.json
```
每个模块的每个版本，都有一个自己的子目录，里面是代码的压缩包`package.tgz`文件，以及一个描述文件`package/package.json`。
除此之外，还会生成一个`{cache}/{hostname}/{path}/.cache.json`文件。比如，从 `npm` 官方仓库下载 `react` 模块的时候，就会生成`registry.npmjs.org/react/.cache.json`文件。
这个文件保存的是，所有版本的信息，以及该模块最近修改的时间和最新一次请求时服务器返回的 `ETag` 。

```
{
  "time":{
    "modified":"2016-01-06T23:52:45.571Z",
    // ...
  },
  "_etag":"\"7S37I0775YLURCFIO8N85FO0F\""
}
```
对于一些不是很关键的操作（比如`npm search或npm view`），`npm`会先查看`.cache.json`里面的模块最近更新时间，跟当前时间的差距，是不是在可接受的范围之内。如果是的，就不再向远程仓库发出请求，而是直接返回`.cache.json`的数据。
`.npm`目录保存着大量文件，清空它的命令如下。

```
$ rm -rf ~/.npm/*
# 或者
$ npm cache clean
```
### 6. 模块的安装过程
总结一下，Node模块的安装过程是这样的:

 - 发出npm install命令
 - npm 向 registry 查询模块压缩包的网址
 - 下载压缩包，存放在~/.npm目录
 - 解压压缩包到当前项目的node_modules目录

注意:一个模块安装以后，本地其实保存了两份。一份是`~/.npm`目录下的压缩包，另一份是`node_modules`目录下解压后的代码。
但是，运行npm install的时候，只会检查`node_modules`目录，而不会检查`~/.npm`目录。也就是说，如果一个模块在`～/.npm`下有压缩包，但是没有安装在`node_modules`目录中，`npm` 依然会从远程仓库下载一次新的压缩包。
这种行为固然可以保证总是取得最新的代码，但有时并不是我们想要的。最大的问题是，它会极大地影响安装速度。即使某个模块的压缩包就在缓存目录中，也要去远程仓库下载，这怎么可能不慢呢？
另外，有些场合没有网络（比如飞机上），但是你想安装的模块，明明就在缓存目录之中，这时也无法安装。
### 7. 删除 node_modules

```
# 删除当前目录下的node_modules文件夹
rm -rf node_modules
```
### 8. npx(npm 5.2.0 内置的包执行器)
### 9. 解决安装某些npm包失败问题
#### 9.1 通过config命令
```
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```
#### 9.2 命令行指定
```
npm --registry https://registry.npm.taobao.org info underscore 
```
#### 9.3 编辑`~/.npmrc`加入下面内容
```
registry = https://registry.npm.taobao.org

# 查找.npmrc文件可以使用find命令
find .npmrc
```

>.npmrc文件的作用，就是配置npm源。

### 参考文档
1. [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
2. [利用npm安装/删除/发布/更新/撤销发布包](http://www.cnblogs.com/penghuwan/p/6973702.html)
3. [玩转npm](https://github.com/icepy/we-writing/issues/36)
4. [npm的package.json中文文档](https://github.com/ericdum/mujiang.info/issues/6/)
5. [npm入门](https://zhuanlan.zhihu.com/p/27539908)
6. [npm 常用命令详解](http://www.cnblogs.com/PeunZhang/p/5553574.html)
7. [npx: npm 5.2.0 内置的包执行器](https://zhuanlan.zhihu.com/p/27832595)
8. [2018 年了，你还是只会 npm install 吗？](https://juejin.im/post/5ab3f77df265da2392364341)
9. [npx 是什么](https://zhuanlan.zhihu.com/p/27840803)
10. [轻松管理你的 Node 版本](https://www.h5jun.com/post/manage_node_with_n.html)
11. [nvm(node version manger)](https://github.com/creationix/nvm#install-script)
12. [npm 基本用法和实用技巧](https://github.com/theicebear/npm-basic-usage)
13. [安装 node-sass 的正确姿势](https://github.com/lmk123/blog/issues/28)