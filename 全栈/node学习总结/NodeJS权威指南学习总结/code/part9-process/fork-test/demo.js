const cp = require('child_process');
const n = cp.fork(__dirname + '/test.js');
n.on('message', (msg) => {
    console.log('父进程接收到消息：', msg);
    process.exit();
});
n.send({ usernName: '我是父进程' });