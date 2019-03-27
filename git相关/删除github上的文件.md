有时候因为某些原因，需要将上传到github上制定的文件删除，但如果只是单纯地删除本地文件，再执行提交操作，删除的只是本地文件，远程的文件依然存在。可以使用下面的命令，先将`stage`中的文件删除，然后提交，再push到远程，这时github上的文件就不存在了。

例如删除github上的`.DS_Dtore`文件的执行操作，进入到对应目录，在终端中执行以下操作：

```
git rm --cached filename
git commit -m "hehe"
git push origin
```
执行完毕，刷新一遍github，你会发现此时想要删除的文件已经消失了。
