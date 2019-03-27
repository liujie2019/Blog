>在NodeJs中，使用fs模块来实现所有有关文件及目录的创建、写入及删除操作。

### 文件读取
```
// 文件读取
const fs = require('fs');
fs.readFile('./test.txt', (err, data) => {
    if (err) console.log('读取文件时发生错误');
    else { // 在控制台中输出文件内容
        console.log(data); // data中是存取了文件原始二进制数据的缓存区中的内容
        console.log(data.toString()); // 将文件内容以字符串的形式输出
    }
});
```
```
// 异步文件读取
const fs = require('fs');
fs.readFile('./test.txt', 'utf8' , (err, data) => {
    if (err) console.log('读取文件时发生错误');
    else { // 在控制台中输出文件内容
        console.log(data); // 将文件内容以utf8格式字符串的形式输出
    }
});
```
>需要注意的是：当指定了编码方式后，就不需要使用data.toString()了，直接使用data就可以输出文件内容的字符串了。

```
// 同步文件读取
const fs = require('fs');
try {
    const data = fs.readFileSync('./test.txt', 'utf8');
    console.log(data);
} catch (error) {
    console.log('读取文件时发生错误');
}
```
### 创建与读取目录
```
const fs = require('fs');
fs.readdir('./', (err, files) => {
    if (err) console.log('读取目录操作失败');
    else console.log(files); // [ 'demo.js', 'part4', 'part5', 'part6' ]
    // files是一个数组，存放了读取到的文件中的所有文件名
});
```
### 查看与修改文件或目录的信息
### 对文件或目录执行的其他操作
#### 创建与删除文件的硬链接
```
const fs = require('fs');
fs.link('./test.txt', './test/message.txt', (err) => {
    if (err) console.log('创建硬链接操作失败');
    else console.log('创建硬链接操作成功');
});
```
>特别注意：这里的test目录一定要存在，否则会创建失败。

#### 创建与查看符号链接
### 使用文件流
流是一组有序的、有起点和终点的字节数据的传输手段。
#### 使用ReadStream对象读取文件
```
// 使用流读取数据
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
// 文件被打开
file.on('open', (fd) => {
    console.log('开始读取文件。');
});
// 数据被读取到
file.on('data', (data) => {
    console.log('读取到数据：');
    console.log(data.toString());
});
// 数据读取完毕
file.on('end', () => {
    console.log('文件已全部读取完毕');
});
// 文件被自动关闭
file.on('close', () => {
    console.log('文件被关闭');
});
file.on('error', (err) => {
    console.log('文件读取失败');
});
```
```
// 使用流读取数据
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
// 暂停文件读取操作
file.pause();
file.on('data', (data) => {
    console.log('读取到数据：');
    console.log(data.toString());
});
// 1秒后恢复文件读取操作
setTimeout(() => {
    file.resume();
}, 1000);
file.on('error', (err) => {
    console.log('文件读取失败');
});
```
#### 使用WriteStream对象写入文件
```
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./anotherTest.txt');
file.on('data', (data) => {
	// 调用out(WriteStream对象)的write方法将读取到的数据写入对应的文件中
    out.write(data);
});
out.on('open', (fd) => {
    console.log('需要被写入的文件已经被打开');
});
file.on('end', () => {
	// out(WriteStream对象)的end方法可以在文件关闭之前向文件追加写入数据
    out.end('再见', () => {
        console.log('文件全部写入完毕');
        console.log('共写入%d字节数据', out.bytesWritten);
    });
});
```
#### drain事件
当操作系统缓存区中的数据已被全部读出并写入到目标文件时，触发WriteStream对象的drain事件，表示操作系统缓存区中的数据已全部读出，可以继续向操作系统缓存区中写入新的数据。

```
const fs = require('fs');
const out = fs.createWriteStream('./anotherTest.txt');
for(let i = 1; i <= 10000; i++) {
    const flag = out.write(i.toString());
    console.log(flag);
}
out.on('drain', () => {
    console.log('操作系统缓存区中的数据已经全部输出');
});
const out2 = fs.createWriteStream('./test2.txt');
for(let i = 1; i <= 10; i++) {
    const flag = out2.write(i.toString());
    console.log(flag);
}
out2.on('drain', () => {
    console.log('操作系统缓存区中的数据已经全部输出');
});
```
>out(WriteStream对象)的write方法返回一个布尔类型的返回值，当操作系统缓存区中数据已经全部写满时，该参数值为false，表示操作系统缓存区中的数据已满并将立即输出到目标对象中，当操作系统缓存区中还可以写入数据时，该参数值为true.

**特别注意：**在NodeJS中，当操作系统缓存区中数据已全部写满时，不代表不能继续写数据，而是指在将操作系统缓存区中的数据写入到文件中的同时把读取到的数据暂时缓存在**内存**中，待操作系统缓存区中数据已全部输出时首先将**内存**中缓存的数据读入操作系统缓存区中。
#### ReadStream对象的pipe方法(执行文件的复制操作)
```
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test3.txt');
file.pipe(out);
```
```
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test4.txt');
file.pipe(out, {end: false});
file.on('end', () => {
    out.end('追加数据');
});
```
>end属性为true时，表示当数据被全部读取完毕时，立即将操作系统缓存区中的剩余数据全部写入文件中并关闭文件；end属性为false时，则不关闭文件，文件中可以继续写入新的数据。默认值为true。

```
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test4.txt');
file.pipe(out, {end: false});
setTimeout(() => {
    file.unpipe(out); // 取消目标文件的写入操作
    out.end();
}, 10);
```
### 对路径进行操作
#### normalize方法
```
path.normalize('.//a//b//d//..//c/e//..//'); // 'a/b/c/'
```
#### join方法
```
path.join(__dirname, 'a', 'b', 'c'); // /Node权威指南demo/part6/a/b/c
```
#### resolve方法
resolve方法以应用程序根目录为起点，根据所有的参数值字符串解析出一个绝对路径。
#### relative方法
获取两个路径之间的相对关系。
#### dirname方法
该方法用于获取一个路径中的目录名。

```
> path.dirname('/foo/bar/test.html')
'/foo/bar'
>
```
#### basename方法
该方法用于获取一个路径中的文件名。

```
> path.basename('/foo/bar/test.html')
'test.html'
>
```
#### extname方法
该方法用于获取一个路径中的扩展名。

```
> path.extname('/foo/index.html')
'.html'
>
```
#### path.sep属性
属性值为操作系统指定的文件分隔符。

```
> path.sep
'/'
>
```
#### path.delimiter属性
属性值为操作系统指定的路径分隔符。

```
> path.delimiter
':'
>
```
