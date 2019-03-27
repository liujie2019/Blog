### 1. npm命令的配置
>可以通过以下两种方式对`npm`命令进行配置：

#### 1.1 通过npm的config指令
该命令是用来管理`npm`的配置文件的，所以通过`config`命令配置的项目实际上是通过更新配置文件`.npmrc`来配置的。

通过修改`npm`命令的配置文件`.npmrc`文件；

>`.npmrc`配置文件的位置如下：

```js
npm内嵌配置文件：/usr/local/lib/node_modules/npm/npmrc
全局配置文件：/etc/npmrc
用户配置文件：~/.npmrc
项目配置文件$项目目录/.npmrc
```

具体的配置命令如下:
```js
npm config set <key> <value> [-g|--global]  //给配置参数key设置值为value；
npm config get <key>          //获取配置参数key的值；
npm config delete <key>       //删除置参数key及其值；
npm config list [-l]      //显示npm的所有配置参数的信息；
npm config edit     //编辑配置文件
npm get <key>     //获取配置参数key的值；
npm set <key> <value> [-g|--global]    //给配置参数key设置值为value；
```
### 2. 配置npm的注册源的方式
#### 2.1 通过给npm 命令添加注册源选项
>示例如下：
```js
npm --registry=https://registry.npm.taobao.org [npm命令]
```
通过这种方式指定的注册源只在本条命令内有效；

#### 2.2 通过npm的config命令配置指向国内镜像源
>示例如下：
```js
npm config set registry https://registry.npm.taobao.org  //配置源为淘宝的源
```
>注意：通过config命令配置的项目实际上是通过更新用户配置文件~/.npmrc来配置的。

#### 2.3 在配置文件`.npmrc`文件写入源地址
>示例如下：`.npmrc`文件内容
```js
registry=https://registry.npm.taobao.org   //写入配置文件
```
>需要注意：

1. 第1种配置方法是命令内有效，第2和第3种配置方法是用户内有效；
2. 如果想恢复默认配置，只需要将用户配置文件`~/.npmrc`删除即可。

### 3. 使用淘宝镜像的方法
使用淘宝镜像有2种方式，如下：

安装淘宝cnpm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org


配置npm的源为淘宝的源https://registry.npm.taobao.org；


### 4. npm包的符号链接
npm的link命令是用来创建包的链接的；
具体机制如下:

如果在包的文件夹下执行npm link命令，则会在全局目录下创建一个该包的符号链接{prefix}/lib/node_modules/<package>，如果该包包含可执行的命令文件，则也会把该包的可执行命令文件链接到全局目录下{prefix}/bin/{commandName};
如果在不是包的文件夹下执行npm link package-name，则会在当前目录./node_modules/下创建一个全局包package-name的符号链接；
如果在包packageA的文件夹下执行npm link packageB，则会：先把包packageB链接到全局目录{prefix}/lib/node_modules/<packageB>下，然后再把全局目录下的包packageB链接到当前目录下的./node_module目录下；