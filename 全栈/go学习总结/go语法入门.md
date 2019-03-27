### 1. 命令行工具

* go build: 用于编译源码文件、代码包、依赖包；
* go run: 可以编译并运行go源码文件；
* go get: 命令主要是用来动态获取远程代码包的；

### 2. 基础结构
```
//程序所属包
package main

//导入依赖包
import "fmt"

//定义常量
const NAME string = "test"

//全局变量的声明与赋值
var a string = "demo"

//一般类型声明(表示testInt是一个int类型)
type testInt int

//结构体声明
type Learn struct {
}

//接口声明
type Learn interface {
}

//函数定义
func LearnGo() {
}

//main函数
func main() {
}
```

### 3. package包用法
* package是最基本的分发单位和工程管理中依赖关系的体现；
* 每个go语言源代码文件开头都拥有一个package声明，表示源码文件所属代码包；
* 要生成go语言可执行程序，必须要有main的package包，且必须在该包下有main()函数；
* 同一个路径下只能存在一个package，一个package可以拆分成多个源文件组成；

### 4. import
* import语句可以导入源代码文件所依赖的package包；
* 不得导入源代码文件中没有用到的package，否则GO语言编译器会报编译错误；
* import语法格式主要有两种：

```
#第一种
import "package1"
import "package2"
import "package3"
#第二种(经常用到)
import (
	"package1"
	"package2"
	"package3"
)
```
#### 4.1 import原理
* 如果一个main导入其他包，包将被顺序导入；
* 如果导入的包中依赖其它包(包B)，会首先导入B包，然后初始化B包中常量和变量，最后如果B包中有init，会自动执行初始化函数init()；
* 所有包导入完成后才会对main中常量和变量进行初始化，然后执行main中的init函数(如果存在)，最后执行main函数；
* 如果一个包被导入多次则该包只会被导入一次；

#### 4.2 import别名(".","_")

* 别名操作的含义是：将导入的包命名为另一个容易记忆的别名；
* 点(.)操作的含义是：点(.)标识的包导入后，调用该包中函数时可以省略前缀包名；
* 下划线(_)操作的含义是：导入该包，但不导入整个包，而是执行该包中的init函数，因此无法通过包名来调用包中的其他函数。使用下划线操作往往是为了注册包里的引擎，让外部可以方便地使用；

```
#将fmt包命名为test，这样就可以使用test来调用fmt包中的函数了
import (
	test "fmt"
)
```
### 5. 数据类型
数据类型的出现是为了把数据分成所需内存大小不同的数据，编程的时候需要用大数据的时候才需要申请大内存，就可以充分利用内存。
#### 5.1 数值类型，字符类型和布尔型

#### 5.2 派生类型
* 指针类型(Pointer)
* 数组类型
* 结构化类型(struct)
* Channel类型(chan)
* 函数类型(func)
* 切片类型(slice)
* 接口类型(interface)
* Map类型(map)
#### 5.3 类型零值和类型别名
类型零值不是空值，而是某个变量被声明后的默认值，一般情况下，值类型的默认值是0，布尔类型默认值为false，string类型默认值是空字符串。我们可以对类型设置别名。
#### 5.4 类型所占存储大小

### 6. 常量与变量
#### 6.1 变量声明，初始化和赋值
**单个变量声明和赋值：**

* 变量的声明格式： var <变量名称> [变量类型]
* 变量的赋值格式: <变量名称> = <值，表达式，函数等>
* 声明和赋值同时进行: var <变量名称> [变量类型] = <值，表达式，函数等>
* 分组声明格式: 

```
var (
	a int
	b float64
	test string
)
```

1. 同一行声明多个变量和赋值：var a,b,c int = 1,2,3或者a,b := 1,2(这种形式只能用在函数内)
2. 全局变量的声明必须使用var关键字，局部变量则可以省略；
3. 特殊变量下划线"_";

**变量类型转换：**

* go中不存在隐式类型转换，类型转换必须是显式的；
* 类型转换只能发生在两种兼容类型之间；
* 类型转换格式：<变量名称> [:]= <目标类型>(<需要转换的变量>)

#### 6.2 变量可见性规则
* 大写字母开头的变量是可导出的，也就是其它包可以读取的，是公用变量；
* 小写字母开头的变量就是不可导出的，是私有变量；
#### 6.3 常量，常量声明和iota的使用

* 常量定义从形式上可分为显式和隐式：

```
#显式
const 常量名 [type] = value
#隐式
const 常量名 = value(省略了常量类型，称为无类型常量)
```
* 常量可以使用内置表达式定义(不能使用用户自定义的函数)，例如: len(), unsafe.Sizeof()等
* 常量范围目前只支持布尔型、数字型(整数型、浮点型和复数)和字符串型

#### 6.1 特殊常量iota的使用
* iota在const关键字出现时将被重置为0；
* const中每新增一行常量声明将使iota计数一次；
* iota常见使用法：

1. 跳值使用法
2. 插队使用法
3. 表达式隐式使用法
4. 单行使用法

```
#跳值使用
const (
	a = iota
	b = iota
	_
	_
	c = iota
)
fmt.Print(a) //0
fmt.Print(b) //1
fmt.Print(c) //4

#插队使用
const (
	a = iota
	b = 2.1
	c = iota
)
fmt.Print(a) //0
fmt.Print(b) //2.1
fmt.Print(c) //2

#表达式隐式使用法
const (
	a = iota * 2
	b 
	c 
)
fmt.Print(a) //0
fmt.Print(b) //2
fmt.Print(c) //4

const (
	a = iota * 2
	b = iota * 3
	c 
	d
)
fmt.Print(a) //0
fmt.Print(b) //3
fmt.Print(c) //6
fmt.Print(d) //9

const (
	a, b = iota, iota + 3
	c, d
	f = iota //恢复计数
)
fmt.Print(a) //0
fmt.Print(b) //3
fmt.Print(c) //1
fmt.Print(d) //4
fmt.Print(f) //2
```
### 参考文档
1. [厚土Go学习笔记](https://cloud.tencent.com/developer/article/1076012)