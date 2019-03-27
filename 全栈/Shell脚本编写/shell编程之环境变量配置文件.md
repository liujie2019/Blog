### 环境变量配置文件
变量类型：

* 用户自定义变量(本地变量)
* 环境变量
* 预定义变量
* 位置参数变量

>环境变量作用：定义每个用户的操作环境。环境变量举例：path、ps1

#### source 命令
修改配置文件后，必须注销重新登录才能生效。但是使用`source`命令可以不用重新登录。

```
source 配置文件 或者 . 配置文件
```
>特别注意：在linux中，所有以点(.)开头的文件都是隐藏文件。

#### 环境变量配置文件简介
环境变量配置文件中主要是定义对系统操作环境生效的系统默认环境变量，如PATH等。

常见环境变量配置文件：

* /etc/profile
* /etc/profile.d/*.sh
* ~/.bash_profile
* ~/.bashrc
* /etc/bashrc

>特别注意：放在/etc目录下的环境变量配置文件对所有用户有效；放在~/目录下的环境变量配置文件只对当前用户有效。

![](../static/linux-profile.png)

* 正常输入用户名密码的登录过程配置文件加载顺序：

```
（1）/etc/profile -> /etc/profile.d/*.sh -> /etc/profile.d/lang.sh -> /etc/sysconfig/i18n
（2）~/.bash_profile -> ~/.bashrc -> /etc/bashrc -> 命令提示符
```
* 从超级用户切换到其他用户时配置文件加载顺序：

```
/etc/bashrc -> /etc/profile.d/*.sh -> /etc/profile.d/lang.sh -> /etc/sysconfig/i18n -> 命令提示符
```

#### umask命令(查看系统默认权限)

1. 文件最高权限为666
2. 目录最高权限为777
3. 权限不能使用数字进行换算，而必须使用字母
4. umask定义的权限，是系统默认权限中准备丢弃的权限

```
# r=4 w=2 x=1
文件最高权限为666，默认权限为022 
666换算成字母为：rw-rw-rw- 
022换算成字母为：----w--w- 
666 - 022 = 644换算为字母为：rw-r--r--

目录最高权限为777，默认权限为022
777换算成字母为：rwxrwxrwx
022换算成字母为：----w--w- 
777 - 022 = 755换算为字母为：rwxr-xr-x
```

#### 环境变量配置文件的功能
#### 3. 其他配置文件
##### 3.1 注销时生效的环境变量配置文件
```
~/.bash_logout
```
##### 3.2 .bash_history
```
# 历史命令记录保存在硬盘的~/.bash_history文件中
# 当前登录后的命令保存在内存中，正确退出后才写入文件
~/.bash_history
```
### Shell登录信息
#### 本地终端欢迎信息：/etc/issue
![](../static/shell-etc-issue.png)
#### 远程终端登录提示信息环境变量配置文件(/etc/issue.net)
```
# 不支持转义符，即转义符在/etc/issue.net文件中不能使用
# 是否显示此欢迎信息，由ssh的配置文件 /etc/ssh/sshd_config决定，加入"Banner /etc/issue.net" 行才能显示（记得重启SSH服务->service sshd restart）
```
#### 登录后欢迎信息：/etc/motd
不管是本地登录，还是远程登录，都可以显示此欢迎信息。