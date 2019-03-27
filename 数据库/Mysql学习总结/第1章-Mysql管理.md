```
# 重新加载授权表
FLUSH PRIVILEGES;
```

特别注意：

1. 在 MySQL5.7 中 user 表的 password 已换成了authentication_string。
2. 在注意需要执行`FLUSH PRIVILEGES`语句。 这个命令执行后会重新载入授权表。如果你不使用该命令，你就无法使用新创建的用户来连接mysql服务器，除非你重启mysql服务器。

### 1. 管理MySQL的命令
#### 1.1 USE 数据库名(选择数据库)
选择要操作的Mysql数据库，使用该命令后所有Mysql命令都只针对该数据库。

```
mysql> USE mysql;
Database changed
```
#### 1.2 SHOW DATABASES(列出 MySQL 数据库管理系统的数据库列表)
#### 1.3 SHOW TABLES
显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库。
#### 1.4 SHOW COLUMNS FROM tb_name
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。

```
mysql> show columns from users;
+----------+----------------------+------+-----+---------+----------------+
| Field    | Type                 | Null | Key | Default | Extra          |
+----------+----------------------+------+-----+---------+----------------+
| id       | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| username | varchar(20)          | NO   |     | NULL    |                |
| password | varchar(32)          | NO   |     | NULL    |                |
| age      | tinyint(3) unsigned  | NO   |     | 10      |                |
| sex      | tinyint(1)           | YES  |     | NULL    |                |
+----------+----------------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```
#### 1.5 SHOW INDEX FROM 数据表
显示数据表的详细索引信息，包括PRIMARY KEY（主键）。

```
mysql> show index from users;
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| users |          0 | PRIMARY  |            1 | id          | A         |           5 |     NULL | NULL   |      | BTREE      |         |               |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
1 row in set (0.01 sec)
```
#### 1.6 SHOW TABLE STATUS LIKE [FROM db_name] [LIKE 'pattern'] \G 
该命令将输出Mysql数据库管理系统的性能及统计信息。

```
# 显示数据库 mysql_test 中所有表的信息
mysql> SHOW TABLE STATUS FROM mysql_test;   

# 表名以user开头的表的信息
mysql> SHOW TABLE STATUS from mysql_test LIKE 'user%';

# 加上 \G，查询结果按列打印
mysql> SHOW TABLE STATUS from mysql_test LIKE 'user%'\G;
```
```
mysql> show table status from mysql_test like 'user%'\G;
*************************** 1. row ***************************
           Name: users
         Engine: InnoDB
        Version: 10
     Row_format: Dynamic
           Rows: 5
 Avg_row_length: 3276
    Data_length: 16384
Max_data_length: 0
   Index_length: 0
      Data_free: 0
 Auto_increment: 9
    Create_time: 2017-12-23 14:44:46
    Update_time: NULL
     Check_time: NULL
      Collation: latin1_swedish_ci
       Checksum: NULL
 Create_options:
        Comment:
1 row in set (0.01 sec)
```