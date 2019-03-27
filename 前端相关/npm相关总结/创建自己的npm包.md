npm是javascript的包管理工具，是前端模块化下的一个标志性产物。简单地地说，就是通过npm下载模块，复用已有的代码，提高工作效率。
### 1. 创建一个模块
Node.js模块就是发布到npm的代码包。

创建一个新模块的第一步就是创建一个`package.json`文件。 我们可以使用`npm init -y`来快速创建一个`package.json`文件。这个过程中命令行会逐步提示你输入这个模块的信息，其中**模块名字和版本号**是必填项。

```
{
  "name": "npm_lj_test",
  "version": "1.0.2",
  "description": "npm package test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "lj",
  "license": "ISC"
}
```
### 2. 新建入口文件
入口文件默认是`index.js`。这里给出一个最简单的例子，在默认的`index.js`文件里写一个要导出的函数，这个函数也就是别人的代码里可以**import或者require**的。

```
exports.sayHello = function () {
    console.log("This is my first npm module");
};
```
至此，我们的第一个node模块就已经创建完成了，下一步就是发布到npm服务器了。
### 3. 将新建模块发布到npm服务器
#### 3.1 注册npm账号
**目前有两种方式：**

1. [npm官网注册](https://www.npmjs.com/signup)
2. `npm adduser` (按照提示创建)

#### 3.2 登录并输入相关信息
首次需要登录，`npm login` 存储证书到本地，之后就不需要每次都登录了。登录过程中需要输入用户名，密码，还有邮箱，这些都是刚刚注册时候填写的。
#### 3.3 NPM 包文件设置
NPM 打包发布的时候，会默认把当前目录下所有文件打包。但是 Git 仓库中，有些东西是不需要 发布到 NPM 的，因此我们需要使用一个文件 `.npmignore` 来忽略这些文件，常用配置如下：

```
/.git/
/.vscode/
/docs/
/node_modules/
.gitignore
.npmignore
tslint.json
tsconfig.json
*.log
```
这些文件都不是发布需要的内容，因此可以忽略。
#### 3.4 模块发布
```
# 发布包
npm publish
```
发布过程会把整个目录发布，不想发布的内容模块，可以通过 `.gitignore` 或 `.npmignore` 文件忽略不想发布的内容。

发布成功后可以到[npm个人中心的packages页面查看](https://www.npmjs.com/settings/dlutliujie/packages)。
#### 3.5 更新npm包
对包中的相关文件进行修改完毕后，在发布修改的模块之前，必须先创建新版本的version，执行一下命令：

```
npm version [patch/minor/major]
#运行命令后，package.json中的version将被修改

#然后在之下发布命令
npm publish
```

### 4. npm包维护
**语义化的版本：**

1. patch(补丁): bug的修复和小的修改；
2. minor(次要更新): 增添了新的特性，但不破坏之前的特性；
3. major(主要更新): 项目大的调整，修改了之前的特性；
4. prerelease: 预览版。

#### 4.1. 版本号维护
维护一个包，肯定是要进行包的版本升级的。如何进行呢？手动修改 package.json 的 version 字段是一个办法，但是显得有点 low。可以使用下面的命令：

```
# 主版本号.子版本号.修订版本号 => 0.1.0
# 版本号变成 0.1.0，即显式设置版本号
npm version v0.1.0

# 版本号从 0.1.0 变成 0.1.1，即修订版本号加一
npm version patch

# 版本号从 0.1.1 变成 0.2.0，即子版本号加一
npm version minor

# 版本号从 0.2.0 变成 1.0.0，即主版本号加一
npm version major
```
除了上述命令之外，还有四个命令用于创建预发布版本(非稳定版本)，具体命令如下：

```
#显式设置版本为1.2.3
npm version v1.2.3

# 版本号从 1.2.3 变成 1.2.4-0，就是 1.2.4 版本的第一个预发布版本
npm version prepatch

# 版本号从 1.2.4-0 变成 1.3.0-0，就是 1.3.0 版本的第一个预发布版本
npm version preminor

# 版本号从 1.2.3 变成 2.0.0-0，就是 2.0.0 版本的第一个预发布版本
npm version premajor

# 版本号从 2.0.0-0 变成 2.0.0-1，就是使预发布版本号加一
npm version prerelease
```
**特别注意：** version 命令默认会给你的 git 仓库自动 commit 一把，并打一个 tag。如果不想它动你的 git 仓库，你应该使用 `--no-git-tag-version` 参数，例如：

```
npm --no-git-tag-version version patch
```
如果想一劳永逸，那么可以使用如下 NPM 设置彻底禁止它：

```
npm config set git-tag-version false  # 不要自动打 tag
npm config set commit-hooks false     # 不要自动 commit
```

#### 4.2. 使用标签
以 TypeScript 为例，通过 `npm info typescript` 可以看到 `dist-tags` 字段有着五个 值，分别是 `latest, beta, rc, next, insiders`，这些都是 `dist-tag`，可以 称之为标签——你可以把它理解为 git 里面的分支。

有什么用呢？其实，我们平时用 `npm install xxx` 的时候，是使用了一个潜在的选项 `tag = latest`，可以通过 `npm config list -l | grep tag` 看到。

因此实际上是执行了 `npm install xxx@latest`。也就是安装了 `latest` 这个标签对应的最新版本。

不同的标签可以有不同的版本，这就方便我们发表非稳定版本到 npm 上，与稳定版本分开。默认是发布到 latest 标签下的。

例如 `npm publish --tag dev` 就可以发布一个版本到 dev 标签下。
#### 4.3. 使用前缀
如果你使用过 AngularJS 或者 TypeScript，那么肯定知道有一些包的名字是这样的：

```
@types/node
@types/jquery
@angular/core
```
`@types/ 和 @angular/` 叫做包前缀（scope）。

作者起初以为使用包前缀也是收费的，后来仔细阅读了文档才发现公开的包可以免费使用包前缀。

那我们怎么使用呢？很简单，首先在 `package.json` 里面把 name 字段加上一个前缀。

**前缀必须是你 NPM 账户的用户名，比如你注册了一个用户名为 abc 的账户，则你只能使用 @abc/ 为你的包前缀。**
举个例子，将你的包名设置为 `@abc/test`。

如果你要初始化一个带包前缀的包，则可以使用下面的命令:

```
npm init --scope=abc #可以加上个 `-y` 快速创建。
```
或者你想每次都使用 `@abc/` 包前缀，加个设置即可：

```
#这样每次初始化新的 package.json，都将自动应用 @abc/ 包前缀。
npm config set scope abc
```

现在，可以发布你的包到 npmjs.org 了。哦不，别忘了一点：

**官方文档表示：所有带前缀的包，在发布的时候，默认都是发布为私有包。**

这意味着你不能就这么发布，因为你（可能）不是付费用户，不能发布私有的包。那怎么办呢？别担心，`npm publish` 命令还有一个参数 `--access` ，通过这个参数可以指定发布的是公共包还是私有包。因此，只要用下面的命令就可以发布一个公共的带包前缀的包了：

```
npm publish --access=public
```

### 5. demo
```
#发布第一个稳定版本
npm publish  //1.0.0

#进行相应修改，发布第二个稳定版本
npm version patch
npm publish  //1.0.1

#继续修改文件发布一个prerelease版本
npm version prerelease
npm publish --tag beta //1.0.2-0

#继续修改文件发布一个prerelease版本
npm version prerelease
npm publish --tag beta //1.0.2-1
```
使用`npm info`命令查看相关信息：

```
#主要关注以下信息
'dist-tags': { latest: '1.0.1', beta: '1.0.2-1' },
versions: [ '1.0.0', '1.0.1', '1.0.2-0', '1.0.2-1' ]
```
`dist-tags`字段中存储了当前模块的最新的稳定版本和最新的beta版本，versions数组中存储的是当前模块的所有版本列表。

#### 5.1 `npm dist-tag`命令
```
#获取到所有的最新的版本，包括prerelease与稳定版本
npm dist-tag ls

#结果如下：
beta: 1.0.2-1
latest: 1.0.1
```
```
#<pkg>代表当前npm包名
#<version>是版本号
#<tag>可以为latest, beta, rc, next, insiders
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
```
#### 5.2 设置prerelease版本为稳定版本
当模块的prerelease版本已经稳定了，可以将其设置为稳定版本，具体命令如下：

```
npm dist-tag add npm_test_lj@1.0.2-1 latest
```

通过`npm info`查看结果如下：

```
#latest: '1.0.2-1' => 已经改变
name: 'npm_test_lj',
'dist-tags': { latest: '1.0.2-1', beta: '1.0.2-1' },
versions: [ '1.0.0', '1.0.1', '1.0.2-0', '1.0.2-1' ]
```

### 参考文档
1. [npm开始](https://www.jianshu.com/p/ee567ce31888)
2. [手把手教你创建你的第一个 NPM 包](https://juejin.im/post/5971aa866fb9a06bb5406c94)
3. [npm](https://www.cnblogs.com/Leo_wl/p/6844253.html)
4. [使用 NPM 发布与维护 TypeScript 模块](https://my.oschina.net/fenying/blog/1607571)
5. [深入 Node 模块的安装和发布](https://segmentfault.com/a/1190000004221514)