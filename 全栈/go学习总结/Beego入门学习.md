### 1. 为什么要学习Go
1. 支持并发，这是Go与生俱来的特性
2. 简单易学，与C语言类似，学过Java的也推荐学习，性能可以于C比肩
3. 静态类型语言，静态类型的语言就是可以在编译的时候检查出来隐藏的大多数问题
4. 跨平台编译
5. 内嵌C支持

### 2. Go可以做些什么
1. 网络编程，开发Web应用、API应用等
2. 内存数据库，前一段时间Google开发的groupcache，couchbase的部分组建
3. 云平台，目前国外很多云平台在采用Go开发

### 3. 开源项目
#### 3.1 Docker
Docker是一个开源的应用容器引擎
#### 3.2 etcd
etcd是一个高可用的Key/Value存储系统，主要用于分享配置和服务发现。

### 4. 环境配置
* GOPATH: 工作目录
* GOROOT: 安装目录
* GOBIN：Go安装路径的bin路径
* GOOS: 操作系统
* GOARCH: 计算架构

例如以`$GOOS_$GOARCH`为命名方式，如`linux_amd64`，表示linux系统，平台架构是64位。


#### 4.1 Go环境变量与工作目录(工作区)
**根据约定，GOPATH下(即工作区)需要建立3个目录：**

* src目录: 用于存放源码，以代码包为组织形式；
* pkg目录: 用于存放归档文件(名称以.a为后缀的文件)，所有归档文件都会被存放到该目录下的平台相关目录中，同样以代码包为组织形式；
* bin目录: 用于存放当前工作区中的Go程序的可执行文件；
* 命令源码文件：声明自己属于main代码包、包含无参数声明和结果声明的main函数。
#### 4.1 Go命令
在命令行或终端输入`go`即可查看所有支持的命令。

**Go常用命令:**

* go get：获取远程包（需提前安装git）
* go run：直接运行程序
* go build：测试编译，检查是否有编译错误
* go fmt：格式化源码（部分IDE在保存时自动调用）
* go install：编译包文件并编译整个程序
* go test：运行测试文件

#### 4.2 代码包导入
```
//导入后起别名
//这样就可以使用str来调用代码包strings中的函数
import str "strings"
//例如str.HasPrefix("abc", "a")

//本地化导入
import . "strings" 
//这样就可以使用HasPrefix("abc", "a")来调用

//仅仅初始化，不调用程序的实体  
//仅执行代码包中的初始化函数
import _ "strings"
//代码包初始化函数即：无参数声明和结果声明的init函数。init函数可以被声明在任何文件中，且可以有多个。

//导入多个代码包   
import (             
"flag"
"fmt"
"strings"
)
```
```
import "fmt" 
告诉 Go 编译器这个程序需要使用 fmt 包的函数，fmt 包实现了格式化 IO（输入/输出）的函数
可以是相对路径也可以是绝对路径，推荐使用绝对路径（起始于工程根目录）

#点操作
import(
	. "fmt"
) 
这个点操作的含义就是这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，也就是前面你调

用的fmt.Println("hello world")可以省略的写成Println("hello world")
```
```
#别名操作(别名操作顾名思义我们可以把包命名成另一个我们用起来容易记忆的名字)
import(
	f "fmt"
) 
别名操作的话调用包函数时前缀变成了我们的前缀，即f.Println("hello world")
```
```
#_操作(这个操作经常是让很多人费解的一个操作符，请看下面这个import)
import (
  "database/sql"
  _ "github.com/ziutek/mymysql/godrv"
) 
_操作其实是引入该包，而不直接使用包里面的函数，而是调用了该包里面的init函数
```
### 5. 命令基础
#### 5.1 go run命令常用标记
`go run`命令用于运行命令源码文件。

* -a ：强制编译相关代码，不论编译结果是否是最新的
* -n ：打印编译过程需要用到的命令，但不真正执行他们
* -p n ：并行编译，n为并行的数量(n最好设置为当前计算机CPU的逻辑个数)
* -v ：列出被编译的代码包的名称
* -a -v : 列出所有被编译的代码包的名称
* -work ： 显示编译时创建的临时工作目录的路径，并且不删除它
* -x : 打印编译过程中所需运行的命令

特别注意：

```
-n: 打印编译过程中所需的命令，但并不执行
-x: 打印编译过程中所需的命令，并执行他们。
```
#### 5.2 go build
`go build`命令用于编译源码文件或代码包。编译非命令源码文件不会产生任何结果文件，编译命令源码文件会在该命令的执行目录中生成一个可执行文件。

1. 执行`go build`命令且不追加任何参数时，该命令会试图把当前目录作为代码包并编译。
2. 执行`go build`命令且以代码包的导入路径作为参数时，该代码包及其依赖会被编译。
3. 执行`go build`命令且以若干源码文件作为参数时，只有这些文件会被编译。

#### 5.3 go install
`go install`命令用于编译并安装代码包或源码文件。

1. 安装代码包会在当前工作区的pkg/<平台相关目录>下生成归档文件。
2. 安装命令源码文件会在当前工作区的bin目录或$GOBIN目录下生成可执行文件。
3. 执行`go install`命令且不追加任何参数时，会试图把当前目录作为代码包并安装。
4. 执行`go install`命令且以代码包的导入路径作为参数时，该代码包及其依赖会被安装。
5. 执行`go install`命令且以命令源码文件及其相关库源码文件作为参数时，只有这些文件会被编译并安装。
#### 5.4 go get
`go get`命令是用于从远程代码仓库(如github)上下载并安装代码包。指定的代码包会被下载到`$GOPATH`中包含的第一个工作区的src目录中。

常用标记：

* -d: 只执行下载动作，而不执行安装动作
* -fix: 在下载代码包后先执行修正动作，而后再进行编译和安装
* -u: 利用网络来更新已有的代码包及其依赖包

### 6. 变量和常量
用于声明变量的关键字`var`，以及用于声明常量的关键字`const`。

```
#普通赋值，由关键字var、变量名称、变量类型、特殊标记=，以及相应的值组成。
#若只声明不赋值，则去除最后两个组成部分即可。
var num1 int = 1 
#或：
var num2, num3 int = 2, 3 // 注释：平行赋值    
#或：
var ( // 注释：多行赋值
    num4 int = 4
    num5 int = 5
)
```
上述这三种变量声明的方式，也适用于常量。但是要注意，对于常量不能出现只声明不赋值的情况。
#### 6. *和&

两者同c一样

`*`是代表指针，也可以从地址中获取内容

`&`获取一个对象的地址

```
i := 1
point := &i // point等于一个地址
data = *point //data == 1
```
另外函数中要分清楚值传递和指针传递，这是一个交换函数，很清晰

```
func change(a *int,b *int) {
  c := *a
  *a = *b
  *b = c
}
a := 3
b := 4
func(&a,&b)
```



### 参考文档
1. [Go简明教程](http://smallsoho.com/backend/2016/11/20/Go%E7%AE%80%E6%98%8E%E6%95%99%E7%A8%8B/)
2. [GO语言学习资源整理](https://zhuanlan.zhihu.com/p/25493806?utm_source=tuicool&utm_medium=referral)
3. [入门学习](https://github.com/zoeminghong/go-library)
4. [Go指南](https://tour.go-zh.org/welcome/1)
5. [Go Web 编程》模板使用指南](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/01.0.md)
6. [Beego官方文档](https://beego.me/docs/quickstart/view.md)
7. [go例子集合](https://gobyexample.com/)
8. [go 入门参考资料](https://mp.weixin.qq.com/s?__biz=MzA4NzAzMjk4Mw==&mid=2247483738&idx=1&sn=784b773657b8738881267e7beba6417b&chksm=903ed4a2a7495db4d67176dc37bc568f3b36ad6b3ed5a1e3df1b905c166e83c479d71b04166d&scene=0&key=dc7dfb672b5ac5a8ea6981f3dc3fefb0b9aff7f2e96ccb64f33c5b30774246dfd9b88b659424ca039c88e28cbfb14dd13b9b13e34e3a322859f23d516437d53b3f3cf03618e2c216452736100a95f304&ascene=0&uin=OTUyMjY5NDgw&devicetype=iMac16,1%20OSX%20OSX%2010.12.3%20build(16D32)&version=12020810&nettype=WIFI&fontScale=100&pass_ticket=UCnt2mlbLQK0LQCE2WJzZ83b21CwTB3t3tmP+caHdGQf7ENogbeVafHJkNSqJs3F)
9. [Go 入门指南](http://wiki.jikexueyuan.com/project/the-way-to-go/)
10. [Go 编程基础](https://github.com/Unknwon/go-fundamental-programming)