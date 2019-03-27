### git add .和git add -u和git add -A的区别
* `git add .` ：该命令会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容的修改(modified)以及新建的文件(untracked file)，但不包括被删除的文件。

* `git add -u` ：该命令仅监控已经被add的文件（即tracked file），会将被修改的文件和被删除的文件提交到暂存区，但该命令不会提交新建的文件（untracked file）。（`git add --update`的缩写）

* `git add -A` ：是上面两个功能的合集（`git add --all`的缩写），将文件的修改，文件的删除，文件的新建，添加到暂存区。