### net模块(实现基于TCP的数据通信)
```
const net = require('net');
const server = net.createServer((socket) => {
    console.log('客户端与服务端连接已经建立');
});
server.listen(8431, 'localhost', () => {
    console.log('服务端开始监听');
});
```
#### telnet命令(linux)
telnet命令用于登录远程主机，对远程主机进行管理。telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务，而改用更安全的ssh方式了。

```
const net = require('net');
const server = net.createServer((socket) => {
    console.log('客户端与服务端连接已经建立');
});
server.listen(8431, 'localhost', () => {
    console.log('服务端开始监听');
    const address = server.address();
    console.log('被监听的地址信息为%j', address);// 被监听的地址信息为{"address":"127.0.0.1","family":"IPv4","port":8431}
});
```
### dgram模块(实现基于UDP的数据通信)