const longComputation = () => {
    let sum = 0;
    console.info('计算开始了！！！');
    console.time('计算耗时');
    for (let i = 0; i < 1e10; i++) {
        sum += i;
    }
    console.info('计算结束了！！！');
    console.timeEnd('计算耗时');
    return sum;
}

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 输出子进程id
    const sum = longComputation();
    // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
    process.send(sum);
});