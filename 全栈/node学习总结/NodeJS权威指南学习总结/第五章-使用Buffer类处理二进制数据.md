### Buffer对象与字符串对象之间的相互转换
#### Buffer对象的toString方法
#### Buffer对象与json对象之间的相互转换
```
> buf = new Buffer('我喜爱编程');
<Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
> json = JSON.stringify(buf);
'{"type":"Buffer","data":[230,136,145,229,150,156,231,136,177,231,188,150,231,168,139]}'
> JSON.parse(json);
{ type: 'Buffer',
  data: [ 230, 136, 145, 229, 150, 156, 231, 136, 177, 231, 188, 150, 231, 168, 139 ] }
> copy = new Buffer(JSON.parse(json));
<Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
> copy.toString();
'我喜爱编程'
```
#### 复制缓存数据(copy方法)
```
> a = new Buffer('我喜爱编程');
<Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
> b = new Buffer(128);
<Buffer 01 00 00 00 01 00 00 00 04 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 38 61 01 02 01 00 00 00 00 00 00 00 00 00 00 00 08 59 01 02 01 00 00 00 00 00 ... >
> b.fill(0);
<Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
> a.copy(b, 10);
15
> b
<Buffer 00 00 00 00 00 00 00 00 00 00 e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
```
#### Buffer类的类方法
##### isBuffer方法
isBuffer方法用于判断一个对象是否为一个Buffer对象。

```
> a = 'aaa';
'aaa'
> b = new Buffer(10);
<Buffer f0 e6 bf 5f ff 7f 00 00 00 00>
> typeof(a);
'string'
> typeof(b);
'object'
> Buffer.isBuffer(a);
false
> Buffer.isBuffer(b);
true
>
```
##### byteLength方法
byteLength方法用于计算一个指定字符串的字节数。

```
Buffer. byteLength(string, [encoding]);
```
```
> a = '我喜爱编程';
'我喜爱编程'
> a.length;
5
> Buffer.byteLength(a, 'utf8');
15
> Buffer.byteLength(a, 'utf16le');
10
>
```
##### concat方法
concat方法用于将几个Buffer对象结合创建为一个新的Buffer对象。

```
Buffer.concat(list, [totalLength]);
```
##### isEncoding方法
isEncoding方法用于检测一个字符串是否为一个有效的编码格式字符串。

```
Buffer.isEncoding(encoding);
```
```
> Buffer.isEncoding('utf16le');
true
> Buffer.isEncoding('utf16e');
false
>
```