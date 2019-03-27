浏览器将CORS请求分成两类：简单请求和非简单请求。

简单请求在之前博客中总结过了，详见[传送门](http://blog.csdn.net/liujie19901217/article/details/50723702)。
这里主要总结一下非简单请求。非简单请求是那种**对服务器有特殊要求的请求**，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
## 1. **预检请求(preflight request)**
### 1.1 为什么要发预检请求
我们都知道浏览器的同源策略，就是出于安全考虑，浏览器会限制从脚本发起的跨域HTTP请求，像XMLHttpRequest和Fetch都遵循同源策略。
浏览器限制跨域请求一般有两种方式：

1. 浏览器限制发起跨域请求;
2. 跨域请求可以正常发起，但是返回的结果被浏览器拦截了

一般浏览器都是第二种方式限制跨域请求，那就是说请求已到达服务器，并有可能对数据库里的数据进行了操作，但是返回的结果被浏览器拦截了，那么我们就获取不到返回结果，这是一次失败的请求，但是可能对数据库里的数据产生了影响。

为了防止这种情况的发生，规范要求，对这种可能对服务器数据产生副作用的HTTP请求方法，浏览器必须先使用OPTIONS方法发起一个预检请求，从而获知服务器是否允许该跨域请求：如果允许，就发送带数据的真实请求；如果不允许，则阻止发送带数据的真实请求。
### 1.2 什么时候会发预检请求
简单来说，就是对于一些可能**对服务器数据有影响的请求**，如 `PUT，DELETE 和搭配某些 MIME 类型的 POST 方法`，浏览器必须先发送一个“预检请求”——也就是刚才说的 `preflight response`，来确认服务器是否允许该请求，允许的话再真正发送相应的请求。
### 1.3 预检请求都做了什么 
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为**预检请求（preflight）**。

浏览器先询问服务器，**当前网页所在的域名是否在服务器的许可名单之中**，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
**Demo:**

```
<script type="text/javascript">
        function createXhr(){
            if(typeof XMLHttpRequest){
                return new XMLHttpRequest();
            }else if(typeof ActiveXObject){
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        var xhr=createXhr();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
     var data = JSON.parse(xhr.responseText);
    	console.log(data.name+'--'+data.age+'--'+data.job);//lisi--24--worker
                }
            }
        }
        //put请求
        xhr.open("put","http://www.abc.com/mywork/21code/example.php",true);
        xhr.setRequestHeader('X-Custom-Header', 'value');
        xhr.send(null);
    </script>
```
**example.php**

```
<?php
    header("Content-Type: text/plain");//文本类型
    //允许的域名
    header("Access-Control-Allow-Origin:http://www.example.com");
    //响应类型
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    //头部字段
    header("Access-Control-Allow-Headers: X-Custom-Header");
    $res = array('name'=>'lisi','age'=>24,'job'=>'worker');
    echo json_encode($res);
?>

```
上面代码中，HTTP请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。
浏览器发现，这是一个非简单请求，就自动发出一个预检请求，要求服务器确认是否可以接收这样的请求。下面是这个预检请求的HTTP头信息以及预检请求的回应。
![这里写图片描述](http://img.blog.csdn.net/20160809164823763)

**预检请求**用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。
除了Origin字段，预检请求的头信息包括两个特殊字段：

 - **Access-Control-Request-Method**
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上面例子中是PUT。
 - **Access-Control-Request-Headers**
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会**额外发送的头信息字段**，上例是X-Custom-Header。
![这里写图片描述](http://img.blog.csdn.net/20160809164843950)

服务器收到预检请求后，检查了`Origin`、`Access-Control-Request-Method和Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。
上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://www.example.com`可以请求数据。**该字段也可以设为星号，表示同意任意跨源请求。**

**如果浏览器否定了预检请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。**这时，浏览器就会认定，服务器不同意预检请求，因此**触发一个错误**，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出相应的报错信息。
## 2. 服务器响应的其他CORS相关字段

```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 180000
```
 - **Access-Control-Allow-Methods**

该字段必需，它的值是**逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。**注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次预检请求。

 - **Access-Control-Allow-Headers**

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，**表明服务器支持的所有头信息字段**，不限于浏览器在预检中请求的字段。

 - **Access-Control-Allow-Credentials**

**该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。**默认情况下，Cookie不包括在CORS请求之中。**设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器**。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

 - **Access-Control-Max-Age**

**该字段可选，用来指定本次预检请求的有效期，单位为秒。** `Access-Control-Max-Age` 表明该响应的有效时间为 180000 秒。在有效时间内，浏览器无须为同一请求再次发起预检请求。请注意，浏览器自身维护了一个最大有效时间，如果该首部字段的值超过了最大有效时间，将不会生效。

## **3. 浏览器的正常请求和响应**
一旦服务器通过了预检请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的响应，也都会有一个`Access-Control-Allow-Origin`头信息字段。
**经过预检请求后，正式通信的请求与相应如下所示：**
![这里写图片描述](http://img.blog.csdn.net/20160809162734645)

上面请求头信息的**Origin字段是浏览器自动添加的**，Access-Control-Allow-Origin字段是每次响应都必定包含的。


### 参考文档
1. [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
2. [跨域资源共享 CORS](http://corsbook.rails365.net/467077)
3. [前端 | 浅谈preflight request](http://www.jianshu.com/p/b55086cbd9af)
4. [iframe与主框架跨域相互访问方法](https://blog.csdn.net/fdipzone/article/details/17619673/)
5. [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)