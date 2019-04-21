## 使用curl命令安装
>进入/usr/local目录
```js
cd /usr/local

// 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz

// 解压
sudo tar -zxvf mongodb-osx-x86_64-3.4.2.tgz

// 重命名为 mongodb 目录
sudo mv mongodb-osx-x86_64-3.4.2 mongodb
```
安装完成后，我们可以把`MongoDB`的二进制命令文件目录(安装目录/bin)添加到`PATH`路径中：

```js
export PATH=/usr/local/mongodb/bin:$PATH
```
## 使用`brew`安装
```js
sudo brew install mongodb
```
## 配置环境变量
Mac下配置环境变量的方式：
首先打开终端 ，然后 cd ~

>环境变量的位置在以下几个文件中：

```js
cat /etc/profile
cat /etc/paths
cat ~/.bash_profile
```
>输入内容：
```js
➜  ~ cat /etc/paths
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
```
```js
vi /etc/paths
```
我目前电脑已经列出了所有的环境变量执行目录，可以看到/usr/local/bin已经是环境变量目录了，而我电脑所有的软件执行文件基本都在这个目录下，因此不需要特意在去添加mongodb的目录，大家可以直接通过一个软连接的方式把文件配置到这个目录就可以了。
```js
vi ~/.bash_profile
```
```js
// 添加下面两行
export MONGO_PATH=/usr/local/Cellar/mongodb/3.6.3/bin
export PATH=$PATH:$MONGO_PATH
```
```js
// 使配置生效
source ~/.bash_profile
```
## 安装配置中的问题
### Unable to create/open lock file
![](./static/mongo1.png)

>解决办法：该问题是没有读写权限，加权限`sudo chown <UserName> /data/db`。

## 启动MongoDB数据库
>首先我们创建一个数据库存储目录`/data/db`，否则会报错：

```js
// -p参数表示创建多级目录
sudo mkdir -p /data/db
```
### 启动MongoDB服务端
安装好MongoDB数据库和配置好数据存储目录后，需要启用`MongoDB`服务端才能使用。启用服务的命令是：`mongod`，这样MongoDB服务就启动了，默认端口是`27017`，默认数据库目录为`/data/db`。
```js
// 配置好path路径后，直接运行
mongod --port 27017 --dbpath /data/db
// 或者直接运行，因为上述命令中的端口和数据库目录是默认的
mongod
```
### 链接服务
服务端开启后，我们可以使用命令行来链接服务端，链接命令是`mongo`。重新打开一个命令行工具，然后输入mongo命令。
```js
// 打开另一个命令行窗口，运行
mongo
```
```js
// 查看存在的数据库
show dbs

// 查看当前数据库版本
db.version()
```
如以上两条命令都可以正常的显示出结果，说明我们的MongoDB数据库已经安装成功了。

## 参考文档
1. [Mac下安装MongoDB 及使用教程](https://segmentfault.com/a/1190000002547229)
2. [mac下mongodb的安装和使用\(使用终端操作\)](https://blog.csdn.net/qq_34629352/article/details/78166482)
3. [Mac环境下安装和配置MongoDB](https://www.imooc.com/article/22733)
4. [在Mac上安装MongoDB](https://www.cnblogs.com/quickcodes/p/5390482.html#4013861)