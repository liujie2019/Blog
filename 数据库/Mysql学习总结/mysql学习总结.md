### 1. 定义mysql别名

```
#输入alias命令
alias mysql=/usr/local/mysql/bin/mysql
#回车，再输入
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

### 2. 设置mysql root帐号的密码

```
#设置初始密码
mysqladmin -u root password 当前密码
#如果设置完密码后，需要修改，执行命令
mysqladmin -u root -p  password
```
执行修改密码命令后，输入一次旧密码，再输入两次新密码。

### 3. 连接数据库

```
mysql -uroot -p -P3306 -h127.0.0.1
#-P指定端口号
#-h指定主机名
然后输入root账户密码即可登录
```
### 4. 增加新用户

格式如下：

```
grant 操作权限 on 数据库.* to 用户名@登陆主机地址 identified by '密码';
```
意思是：授予，某主机上的某用户（附带该用户的登陆密码）在某数据库上，执行某些操作的权限

(1)比如：任意主机上("%")，用户（用户名：test1，密码：adc）在所有数据库上，执行任意操作的权限（很危险）

```
grant all privileges on *.* to test1@"%" identified by "abc";
```
其中all privileges表示查询，插入，修改，删除的权限：select,insert,update,delete。

以上命令等价于：

```
grant select,insert,update,delete on *.* to test1@"%" identified by "abc";
```
然后刷新权限：

```
flush privileges;
```

(2)授权本地主机上的用户操作数据库的权限

创建数据库：

```
create database openfire;
```

授予本地主机用户（用户名：test，密码：123）访问数据库(数据库名称：openfire)的操作权限：

```
grant all privileges on openfire.* to test@localhost identified by "123";
#刷新权限
flush privileges;
```
之后，就可以用新的用户test访问openfire数据库了


#### 4.2 更新指定帐户的密码（用户名：test1，新密码：1234）

```
update mysql.user set password=password('1234') where User="test1" and Host="localhost";
```

#### 4.3 删除用户

```
#先使用mysql数据库
use mysql;
#删除mysql数据库中user表中的某个本地用户（test7）
delete from user where User="test7" and Host="localhost";
```

#### 4.4 显示命令

(1）显示所有数据库列表：

```
show databases;
```
初始化只有两个数据库：mysql和test

注意：MYSQL的系统信息都存储在mysql库中，比如：修改密码和新增用户，实际上就是用这个库进行操作

（2）打开某个数据库(比如数据库：open fire)：use openfire;

（3）显示本库中的所有表：show tables;

（4）显示某表（table1）的结构：describe table1;

（5）建库：create database 库名;

（6）建表：
    use 库名;
    create table 表名 (字段设定列表);
 
（7）删库：drop database 库名;

（8）删表：drop table 表名;

（9）将表中的记录清空：delete from 表名;

（10）显示表中的记录：select * from 表名;

### 5. 登录和退出mysql
#### 5.1 MySQL登录
mysql参数：

* -D, --database=name：打开指定数据库
* --delimiter=name：指定分隔符
* -h，--host=name：服务器名称
* -p，--password[=name]：密码
* -P，--port=#：端口号
* --prompt=name：设置提示符
* -u，--user=name：用户名
* -V，--version：输出版本信息并且退出

```
// 默认端口是3306
// 默认连接本地服务器127.0.0.1
mysql -uroot -p -P3306 -h127.0.0.1
```

#### 5.2 MySQL退出

```
1.exit;
2.quit;
3.\q;
```
#### 5.3 修改MySQL提示符
```
// 1.连接客户端时通过参数指定
mysql -uroot -p -P3306 -h127.0.0.1 --prompt 提示符

// 2.连接上客户端后，通过prompt命令修改
prompt 提示符
```

MySQL提示符取值：

* \D：完整的日期
* \d：当前数据库
* \h：服务器名称
* \u：当前用户

#### 5.4 MySQL常用命令
```
// 显示当前服务器版本
select version();

// 显示当前日期和时间
select now();

// 显示当前用户
select user();
```
#### 5.5 MySQL语句的规范
* 关键字与函数名称全部大写
* 数据库名称、表名称、字段名称全部小写
* SQL语句必须以分号结尾

#### 5.6 操作数据库

```
// 创建已存在数据库会有警告
mysql> create database if not exists books;
Query OK, 1 row affected, 1 warning (0.01 sec)

// 查看警告信息
mysql> show warnings;
+-------+------+------------------------------------------------+
| Level | Code | Message                                        |
+-------+------+------------------------------------------------+
| Note  | 1007 | Can't create database 'books'; database exists |
+-------+------+------------------------------------------------+
1 row in set (0.01 sec)
```
```
// 查看创建数据库books时的指令
mysql> show create database books;
+----------+------------------------------------------------------------------+
| Database | Create Database                                                  |
+----------+------------------------------------------------------------------+
| books    | CREATE DATABASE `books` /*!40100 DEFAULT CHARACTER SET latin1 */ |
+----------+------------------------------------------------------------------+
1 row in set (0.00 sec)
```
```
// 创建数据库
// {DATABASE | SCHEMA}大括号中的内容表示必须要输入，任选其一即可
// [IF NOT EXISTS]中括号中的内容表示选择输入
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name [[DEFAULT] CHARACTER SET [=] charset_name];

// 修改数据库
ALTER {DATABASE | SCHEMA} db_name [DEFAULT] CHARACTER SET [=] charset_name;

// 删除数据库
DROP {DATABASE | SCHEMA} [IF EXISTS] db_name;

// 查看创建数据库时的指令
SHOW CREATE DATABASE db_name;
```

### 6. 启动和停止MySQL
```
#启动
/usr/local/mysql/share/mysql.server start

#停止
/usr/local/mysql/bin/mysqladmin -u root -p shutdown
然后输入root密码即可停止
```
### 7. 基本操作
数据表是一张二维表格，行表示记录，列表示字段。

```
#打开数据库
use mysql;

#查看数据表结构
show columns from users;

#插入记录
INSERT tab_name(col_name) VALUES(val);

#记录查找(证明记录是否写入成功)
SELECT * FROM tab_name;
```

### 8. 数据类型
* 整型
* 浮点型
* 字符型
* 日期时间型

### 相关资料
1. [21分钟 MySQL 入门教程](https://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html#c1)__