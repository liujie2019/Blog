```
# man命令用来查看某些命令的用法，这里查看rm命令的用法
man rm
```

### 绝对路径和相对路径
* 绝对路径：都是以"/"开头
* 相对路径：以"."或者".."开头，一个"."代表当前目录，两个".."代表上一级目录

```
# 回到上次进入的目录
cd -
```
### 操作文件和目录
```
# 复制文件和目录
cp file1 file2
cp -r dir1 dir2

# 移动文件和目录
# 将文件移动到上一级目录
mv file ..
# 将文件移动到指定的文件夹
mv file dir/

# 重命名文件和目录
mv file1 file2
# dir2 存在，则为移动操作
mv dir1 dir2

# 删除文件和目录
rm file
rm -r dir
```
```
# 此时当前目录只有dir1目录
➜  test ls
dir1
# 复制dir1目录为dir2目录
➜  test cp -r dir1 dir2
➜  test ls
dir1 dir2
➜  test cd dir2
➜  dir2 ls
a.txt
# 创建新目录mydir
➜  test mkdir mydir
➜  test ls
dir1  dir2  mydir
# 复制dir1到已存在的目录mydir时，则实际上是移动dir1到mydir中
➜  test cp -r dir1 ./mydir
➜  test ls
dir1  dir2  mydir
➜  test cd mydir
➜  mydir ls
dir1
```
```
# 创建文件
touch a.txt
>a.txt

# 创建目录
mkdir dir

# 查看文件
cat file

# 查看文件类型
file a.txt
```
#### 创建隐藏文件和目录
```
➜  test touch .aa
➜  test mkdir .mydir2
➜  test ls
dir1  dir2  mydir
# 想要查看隐藏的目录和文件需要加-a参数
➜  test ls -a
.       ..      .aa     .mydir2 dir1    dir2    mydir
```
```
# 查看当前目录下所有可见文件
➜  test ls
a.txt   ab.txt  abc.txt b.txt
# echo可以查看a*匹配的文件
➜  test echo a*
a.txt ab.txt abc.txt
➜  test
# 查看所有以.txt结尾的文件
➜  test echo *.txt
a.txt ab.txt abc.txt b.txt
```
### 重定向
```
➜  test date >output.txt
➜  test ls
a.txt      ab.txt     abc.txt    b.txt      output.txt
➜  test cat output.txt
2018年 7月15日 星期日 18时07分06秒 CST
```
```
➜  test ls ./>test.txt
➜  test ls
a.txt      ab.txt     abc.txt    b.txt      output.txt test.txt
➜  test cat test.txt
a.txt
ab.txt
abc.txt
b.txt
output.txt
test.txt
➜  test ls ./>test.txt | grep ab
ab.txt
abc.txt
➜  test grep less <test.txt
➜  test grep ab <test.txt
ab.txt
abc.txt
```
### 用户和文件权限
### 进程
### Linux 查找

### 1. 命令提示符
```
[root@localhost~]#
其中：
  root: 当前登录用户
  localhost: 主机名
  ~: 当前所在目录（家目录）
  #: 超级用户的提示符
     普通用户的提示符是$

pwd: 显示当前位置
cd 目录: 切换目录
```
#### 1.1 命令格式
```
命令 [选项] [参数]
#简化选项与完整选项
-a等于--all
```
#### 1.2 查看目录中内容: ls
```
ls [选项] [文件或目录]
选项：
-a: 显示所有文件，包括隐藏文件
-l: 显示详细信息
-d: 查看目录属性
-h: 人性化显示文件大小
-i: 显示inode
```
```
ls -lh
```

详细信息解释：

```
-rw-r--r--
第一位-表示文件类型(后面的9位字符每三位是一组)
-表示文件
d表示目录
l表示软链接文件
rw-: u所有者
r--: g所属组
r--: o其他人
r: 读
w: 写
x: 执行
```
#### 1.3 目录处理命令
```
#建立目录: mkdir
mkdir -p [目录名]
-p: 递归创建
#例子：
mkdir test //创建test文件夹
mkdir -p demo/test //先在当前目录创建demo文件夹，然后在demo文件夹中创建test文件夹
```
```
#切换所在目录: cd
简化操作：
cd ~或者cd: 进入当前用户的家目录  
cd -: 进入上次目录
cd ..: 进入上一级目录
cd .:进入当前目录
```
**相对路径和绝对路径**

* 相对路径：参照当前所在目录进行查找
* 绝对路径：从根目录开始指定，一级一级递归查找。在任何目录下，都能进入指定位置。

```
#查询所在目录位置
pwd
```
```
#删除空目录
rmdir [目录名](用的很少)
#删除文件或目录: rm
rm -rf [文件或目录]
选项：
-r 删除目录
-f 强制
```
#### 1.4 文件处理命令
```
#复制命令: cp
cp [选项] [原文件或目录] [目标目录]
选项：
-r 复制目录
-p 连带文件属性复制
-d 若源文件是链接文件，则复制链接属性
-a 相当于 -pdr(即上面三个选项之和)
```
```
#剪切或改名命令: mv
mv [原文件或目录] [目标目录]
#说明：原文件和目标文件在同一个目录下就是改名，不在同一个目录下就是剪切
```
#### 1.5 链接命令
```
#链接命令: ln
ln -s [原文件] [目标文件]
#功能描述: 生成链接文件
选项: -s 创建软链接
创建软连接一定要写绝对路径
```

**硬链接：**

1. 拥有相同的i（inode)节点和存储block块，可以看做是同一个文件；
2. 可通过i节点识别，i节点相同，文件大小完全一样；
3. 不能跨分区；
4. 不能针对目录使用；

硬链接特征：硬链接相当于一个教室的两个门，把一个删掉，另一个只要文件名还在，依然可以使用。

**软链接：**

1. 类似windows快捷方式；
2. 软件拥有自己的I节点和Block块，但是数据块中只保存原文件的文件名和I节点号，并没有实际的文件数据；
3. lrwxrwxrwx：l代表软链接，软链接文件权限都为rwxrwxrwx；
4. 修改任意文件，另一个文件都改变；
5. 删除原文件，软链接将不能使用；
6. 创建软链接时，必须使用绝对路径；

### 2. 文件搜索命令
#### 2.1 locate命令格式
```
#在后台数据库中按文件名搜索，搜索速度更快
locate 文件名  
/var/lib/mlocate是locate命令所搜索的后台数据库
注:该文件内容每天一更新，新建文件可能搜索不到，但可以updatedb强制更新
#更新数据库
updatedb
```
#### 2.2 搜索字符串命令grep
```
#在文件当中匹配符合条件的字符串
grep [选项] 字符串 文件名
选项：
-i 忽略大小写
-v 排除指定字符串
```

### 参考博文
1. [对 Linux 新手非常有用的 20 个命令](https://zhuanlan.zhihu.com/p/30383450)
2. [后端程序员必备的Linux基础知识](https://zhuanlan.zhihu.com/p/39157806)
3. [Linux命令大全](http://man.linuxde.net/cat)
4. [手册](http://billie66.github.io/TLCL/book/index.html)