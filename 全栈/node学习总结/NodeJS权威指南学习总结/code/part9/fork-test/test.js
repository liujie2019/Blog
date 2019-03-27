process.on('message', (msg) => {
    console.log('子进程接收到消息：', msg);
    process.send({ name: '我是子进程' });
});