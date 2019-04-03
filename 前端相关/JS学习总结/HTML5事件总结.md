### 1. DOMContentLoaded 事件
#### 1.1 DOMContentLoaded与load事件的区别
* load事件：是js中最常用的一个事件。当页面完全加载后(包括所有图像、js文件、css文件等外部资源)，就会触发window上面的load事件。但是这个过程可能会因为要加载的外部资源过多而颇费周折。

```
window.addEventListener('load', this.refresh.bind(this), false);
```
* DOMContentLoaded 事件：

### 参考文档
1.
