### npm包管理工具
```
# 搜索并查看包的信息
npm search <包名>

# 查看官方包仓库中对应包所用package.json文件中的信息
npm view <包名>

# 在命令行提示窗口当前目录下的node_modules目录中安装对应的包
npm install <包名>

# 在node全局包的安装路径中安装对应的包
npm install -g <包名>

# 查看node全局包的安装路径
npm root -g

# 修改node全局包的安装路径
# 该命令把node全局包的安装路径修改为:'d:\node\node_modules'
npm config set prefix 'd:\node'

# 查看命令行提示窗口当前目录下所安装的所有包：
npm list

# 查看node全局包的安装路径下安装的所有包
npm list -g

# 卸载命令行提示窗口当前目录下安装的某个包
npm uninstall <包名>

# 卸载node全局包
npm uninstall -g <包名>

# 更新命令行提示窗口当前目录下安装的某个包
npm update <包名>

# 卸载node全局包
npm update -g <包名>

# 更新命令行提示窗口当前目录下安装的所有包
npm update

# 卸载node全局包的安装路径下安装的所有包
npm update -g
```