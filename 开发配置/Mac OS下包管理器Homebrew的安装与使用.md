### 1. 为什么要使用Homebrew
包管理工具可以让你安装和更新程序变得更方便，目前在`Mac OS X`系统中最受欢迎的包管理工具是 Homebrew。

Mac OS X是基于Unix的，它可以使用非常多Linux平台上开源的优秀工具，比如wget，比如dos2unix脚本工具等。
但是OS X系统本身却缺少Linux下得包管理器。比如Fedora的yum与dnf，比如Ubuntu的apt-get，比如ArchLinux的Pacman等。

于是这些优秀的开源软件在Mac上的安装只能通过下载源码，编译，安装，配置环境变量的步骤来完成安装。对于大部分的软件，在安装过程中是需要很多的依赖库的，手动去解决这些依赖库是十分痛苦的事情。包管理器干的就是这样的事情：解决软件安装过程中的依赖关系。
有一个开源的项目叫Homebrew，完美解决了Mac OS X上没有包管理器的尴尬。

#### 1.1 安装
```js
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
#### 1.2 基本使用
```
#安装软件
brew install wget

#更新Homebrew在服务器端上的包目录
brew update

#查看你的包是否需要更新
brew outdated

#搜索软件
brew search wget

#查看软件信息
brew info wget

#卸载软件
brew uninstall wget

#查看你的包是否需要更新
brew outdated

#更新包
brew upgrade <package_name>

#Homebrew将会把老版本的包缓存下来，以便当你想回滚至旧版本时使用。但这是比较少使用的情况，当你想清理旧版本的包缓存时，可以运行:
brew cleanup

#查看你安装过的包列表（包括版本号)
brew list --versions
```
#### 1.3 Homebrew Cask
你已经感受到了使用 Homebrew 安装命令行程序的便利。那么接下来，我们将通过 Homebrew Cask 优雅、简单、快速的安装和管理 OS X 图形界面程序，比如 Google Chrome 和 Dropbox。

如果我想安装Chrome浏览器怎么办？试试下面的命令：

```js
brew install google-chrome
```
发现并不能安装，没有该软件。怎么办？好消息是一个叫做homebrew-cask的工具扩充了homebrew。

```
#安装 Homebrew-cask 是如此的简单直接，运行以下命令即可完成：

brew tap caskroom/cask  //添加 Github 上的 caskroom/cask 库
brew install brew-cask  //安装 brew-cask
brew cask install google-chrome //安装 Google 浏览器
brew update && brew upgrade brew-cask && brew cleanup //更新
```
```
#安装
brew install caskroom/cask/brew-cask

#使用(基本用法与brew相同，只不过在brew后面加了一个cask单词)
#安装软件
brew cask install google-chrome

#卸载软件
brew cask uninstall google-chrome
```
### 参考文档
1. [Mac OS下包管理器Homebrew的安装与使用](https://www.jianshu.com/p/d229ac7fe77d)
2. [Homebrew官网](https://brew.sh/index_zh-cn.html)