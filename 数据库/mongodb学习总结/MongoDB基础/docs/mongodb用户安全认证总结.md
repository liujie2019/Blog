# mongodb用户安全认证总结
## 目录
  - [mongodb默认权限](#mongodb默认权限)
  - [启用验证](#启用验证)
    - [创建用户管理员账户](#创建用户管理员账户)

## mongodb默认权限
在默认情况下，mongod是监听在127.0.0.1上的，任何客户端都可以直接连接27017，且没有认证。这样做的好处是：用户可以即时上手，不用担心被一堆配置弄的心烦意乱。然而坏处也是显而易见，如果直接在公网服务器上如此搭建MongoDB，那么所有人都可以直接访问并修改数据库数据了。

默认情况下，mongod也是没有管理员账户的。因此，除非我们在admin数据库中使用`db.createUser()`命令添加了管理员帐号，且使用`–-auth`参数启动`mongod`，否则在数据库中任何人都可以无需认证执行所有命令，包括delete和shutdown。
## 启用验证
### 创建用户管理员账户
用户管理包括：用户的创建、删除与修改。

我们在本地安装好MongoDB后并没有默认用户或密码，需要我们自己创建用户。我们之所以能够使用`mongo`连接数据库，是因为MongoDB为我们默认开了一个最高管理权限方便我们管理数据库。但是，在实际开发中，一般不能使用这个用户，安全性和可靠性都不适合，所以要对MongoDB的用户进行管理。

```js
// 需要先切换到admin数据库
>use admin
> db.createUser(
... {
... user: "adminUser",
... pwd: "123456",
... roles: [
... {
... role: "userAdminAnyDatabase",
... db: "admin"
... }]
... })
Successfully added user: {
	"user" : "adminUser",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
```
### 开启用户验证登陆
启动带访问控制的`Mongodb`，新建终端：

```js
mongod --auth --port 27017 --dbpath /data/db
```
### 用户身份验证
>有两种方式：

>方式一：类似MySql，客户端连接时，指定用户名，密码，db名称。

```js
mongo --port 27017 -u "adminUser" -p "123456" --authenticationDatabase "admin"
```
>方式二：客户端连接后，再进行验证
```js
mongo --port 27017
```
```js
> use admin
switched to db admin
> db.auth("adminUser", "123456")
1
// 输出 1 表示验证成功
```
### 创建一个超级用户
```js
>use admin
> db.createUser({user: "root",pwd: "123456",roles: [ { role: "root", db: "admin" } ]})
Successfully added user: {
	"user" : "root",
	"roles" : [
		{
			"role" : "root",
			"db" : "admin"
		}
	]
}
```
### 创建一个普通用户
```js
> db.createUser({
... user: "liujie",
... pwd: "123456",
... customData: {
... name: "刘杰",
... email: "709394597@qq.com",
... age: 20,
... },
... roles:[
... {
... role: "readWrite",
... db: "user"
... },
... "read"
... ]
... })
Successfully added user: {
	"user" : "liujie",
	"customData" : {
		"name" : "刘杰",
		"email" : "709394597@qq.com",
		"age" : 20
	},
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "user"
		},
		"read"
	]
}
```
```js
> db.system.users.find()
{ "_id" : "admin.userAdmin", "user" : "userAdmin", "db" : "admin", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "QLGaLE0O+/Jdf85aJbyxEg==", "storedKey" : "MDvsRA3m2pqDJhSi2A3w8AjJLGY=", "serverKey" : "+ot5fCFQt/msTBHaaYsK9FcRPww=" } }, "roles" : [ { "role" : "userAdminAnyDatabase", "db" : "admin" } ] }
{ "_id" : "admin.liujie", "user" : "liujie", "db" : "admin", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "5yXweRDH65hmFCDbmcr2sw==", "storedKey" : "mC4z5S7SyWdwD00SoRsvYxvLLIs=", "serverKey" : "jfPT11glB+MAjIdFz/9ZCY+mccg=" } }, "customData" : { "name" : "刘杰", "email" : "709394597@qq.com", "age" : 20 }, "roles" : [ { "role" : "readWrite", "db" : "user" }, { "role" : "read", "db" : "admin" } ] }
```
```js
> db.auth("liujie","123456")
1
```

### 内置角色
- read：允许用户读取指定数据库；
- readWrite：允许用户读写指定数据库；
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile；
- userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户；
- clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限；
- readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限；
- readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限；
- userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限；
- dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限；
- root：只在admin数据库中可用。超级账号，超级权限；

**[⬆ 返回顶部](#mongodb用户安全认证总结)**

### 参考文档
1. [MongoDB 用户名密码登录](https://www.jianshu.com/p/79caa1cc49a5)
2. [MongoDB给数据库创建用户](https://www.imooc.com/article/18439)
3. [MongoDB 内置角色](https://www.cnblogs.com/zzw1787044/p/5773178.html)
4. [mongodb用户安全认证详解](https://blog.csdn.net/su377486/article/details/51756053)
