### bin

许多包有一个或多个可执行文件希望被安装到系统路径。在npm下要这么做非常容易(事实上，npm就是这么运行的)。

这需要在你的package.json中提供一个bin字段，它是一个命令名和本地文件名的映射。在安装时，如果是全局安装，npm将会使用符号链接把这些文件链接到prefix/bin，如果是本地安装，会链接到./node_modules/.bin/。

比如，要使用myapp作为命令时可以这么做：

```
{ 
	"bin" : {
	 	"myapp" : "./cli.js" 
	} 
}
```
这么一来，当你安装myapp，npm会从cli.js文件创建一个到/usr/local/bin/myapp的符号链接(这使你可以直接在命令行执行myapp)。
### 参考文档
1. [npm package.json属性详解](https://www.cnblogs.com/tzyy/p/5193811.html#_h1_1)
2. [(译)package.json详解](https://www.cnblogs.com/nullcc/p/5829218.html)
3. [【npm】伙计，给我来一杯package.json！不加糖](https://www.cnblogs.com/penghuwan/p/7134046.html)
4. [对package.json的理解和学习](https://www.cnblogs.com/whkl-m/p/6617540.html)