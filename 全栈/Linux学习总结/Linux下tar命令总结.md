### 1. 压缩命令
常用压缩格式：
`.zip`,`.gz`,`.bz2`,`.tar.gz`,`.tar.bz2`.
#### 1.1 `.zip格式压缩`
```
#压缩文件
zip 压缩文件名 源文件
#压缩目录
zip -r 压缩文件名 源目录

#解压缩.zip文件
unzip 压缩文件
```
#### 1.2 `.gz格式压缩`
```
#压缩为.gz格式的压缩文件，源文件会消失
gzip 源文件
#压缩为.gz格式，源文件保留
#例如：gzip -c img > img.gz
gzip -c 源文件 > 压缩文件
#压缩目录下所有的子文件，但是不能压缩目录
gzip -r 目录

#解压缩文件
gzip -d 压缩文件
或者
gunzip 压缩文件
#解压缩目录(目录中的子文件会被解压缩，目录不会发生变化)
gunzip -r 目录
```
#### 1.3 `.bz2格式压缩`
```
#压缩为.bz2格式，不保留源文件
bzip2 源文件
#压缩之后保留源文件
bzip2 -k 源文件
#注意：bzip2命令不能压缩目录

#解压缩，-k保留压缩文件
bzip2 -d 压缩文件
或者
bunzip2 压缩文件
```
#### 1.4 打包命令tar
```
#打包
tar -cvf 打包文件名 源文件
选项：
-c: 打包
-v: 显示打包过程
-f: 指定打包后的文件名
例如：
tar -cvf img1.tar img1

#打包到指定目录
tar czvf test.tar *.txt -C /home/work

#解打包
tar -xvf 打包文件名
选项：
-x: 解打包
例如：
tar -xvf img1.tar
```
#### 1.5 `.tar.gz压缩格式`
`.tar.gz`格式是先打包为`.tar`格式，再压缩为`.gz`格式。

```
tar -zcvf 压缩包名.tar.gz 源文件
选项：
-z: 压缩为.tar.gz格式

#解压缩
tar -zxvf 压缩包名.tar.gz
选项:
-x: 解压缩.tar.gz格式
```
#### 1.6 `.tar.bz2压缩格式`
```
tar -jcvf 压缩包名.tar.bz2 源文件
选项：
-z: 压缩为.tar.bz2格式

#解压缩
tar -jxvf 压缩包名.tar.bz2
选项:
-x: 解压缩.tar.bz2格式
```

```
tar -jxvf 压缩包名.tar.bz2 -C 解压目录
选项：
-C: 用来指定想要解压到的目录
#把压缩包放到指定位置
tar -zcvf 绝对路径+压缩包名.tar.gz 源文件
例如：
tar -zcvf /test/img.tar.gz img
```

### 1. 打包和压缩
* 打包：将一大堆文件或目录变成一个总的文件【tar命令】
* 压缩：将一个大的文件通过一些压缩算法变成一个小文件【gzip，bzip2等】

Linux中很多压缩程序只能针对一个文件进行压缩，这样当你想要压缩一大堆文件时，你得将这一大堆文件先打成一个包（tar命令），然后再用压缩程序进行压缩（gzip bzip2命令）。

Linux下最常用的打包程序就是`tar`了，使用tar程序打出来的包我们常称为`tar包`，`tar包`文件的命令通常都是以`.tar`结尾的。生成tar包后，就可以用其它的程序来进行压缩。
#### 1.1 命令格式
```
tar [必要参数][选择参数] [文件] 
```
#### 1.2 命令功能

用来压缩和解压文件，tar本身不具有压缩功能，通过调用压缩功能实现的。

#### 1.3 命令参数
必要参数有如下：

* -A 新增压缩文件到已存在的压缩
* -B 设置区块大小
* -c 建立新的压缩文件
* -d 记录文件的差别
* -r 添加文件到已经压缩的文件
* -u 添加改变了和现有的文件到已经存在的压缩文件
* -x 从压缩的文件中提取文件
* -t 显示压缩文件的内容
* -z 支持gzip解压文件
* -j 支持bzip2解压文件
* -Z 支持compress解压文件
* -v 显示操作过程
* -l 文件系统边界设置
* -k 保留原有文件不覆盖
* -m 保留文件不被覆盖
* -W 确认压缩文件的正确性

可选参数如下：

* -b 设置区块数目
* -C 切换到指定目录
* -f 指定压缩文件
* --help 显示帮助信息
* --version 显示版本信息

### 2. 常用命令
#### 2.1 `.tar`
```
#解包
tar xvf FileName.tar
#打包
tar cvf FileName.tar DirName
#说明：tar是打包，不是压缩
```
#### 2.1 `.gz`
```
#解压1
gunzip FileName.gz
#解压2
gzip -d FileName.gz
#压缩
gzip FileName
```

#### 2.3 `.tar.gz 和 .tgz`
```
#解压
tar zxvf FileName.tar.gz
#压缩
tar zcvf FileName.tar.gz DirName
```
#### 2.4 `.bz2`
```
#解压1
bzip2 -d FileName.bz2
#解压2
bunzip2 FileName.bz2
#压缩
bzip2 -z FileName
```
#### 2.5 `.tar.bz2`
```
#解压
tar jxvf FileName.tar.bz2
#压缩
tar jcvf FileName.tar.bz2 DirName
```
#### 2.6 `.bz`
```
#解压1
bzip2 -d FileName.bz
#解压2
bunzip2 FileName.bz
```
#### 2.7 `.tar.bz`
```
#解压
tar jxvf FileName.tar.bz
```
#### 2.8 `.Z`
```
#解压
uncompress FileName.Z
#压缩
compress FileName
```
#### 2.9 `.tar.Z`
```
#解压
tar Zxvf FileName.tar.Z
#压缩
tar Zcvf FileName.tar.Z DirName
```
#### 2.10 `.zip`
```
#解压
unzip FileName.zip
#压缩
zip FileName.zip DirName
```
#### 2.11 `.rar`
```
#解压
rar x FileName.rar
#压缩
rar a FileName.rar DirName 
```
### 参考文档
1. [linux tar命令简介](https://www.cnblogs.com/starof/p/4229017.html)
2. [每天一个linux命令（28）：tar命令](http://www.cnblogs.com/peida/archive/2012/11/30/2795656.html)
3. [Linux常用命令之压缩打包篇](http://blog.csdn.net/yiliumu/article/details/20656597)