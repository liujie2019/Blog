`Docker`是一个开源的应用容器引擎，基于`Go`语言并遵从`Apache2.0`协议开源。
`Docker`可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的`Linux`机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似iPhone的app）,更重要的是容器性能开销极低。
### 1. 安装和配置
#### 1.1 下载
#### 1.2 常用命令
* docker pull(获取image)
* docker build(创建image)
* docker images(列出image)
* docker run(运行container)
* docker ps(列出container)
* docker rm(删除container)
* docker rmi(删除image)
* docker cp(在host和container之间拷贝文件)
* docker commit(保存改动为新的image)

### 2. Dockerfile
通过编写简单的文件自创docker镜像。

* host(宿主机)
* image(镜像)
* container(容器)
* registry(仓库)
* daemon(守护程序)
* client(客户端)

### 参考文档
1. [Docker说了这么多 最全的一篇在这里](https://mp.weixin.qq.com/s/r6Zj9Umlc9v_rqplq8207A)
2. [Docker 入门](http://guide.daocloud.io/dcs/docker-9152673.html)
3. [持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)
4. [Docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)