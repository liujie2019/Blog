process.stdin.resume();
process.stdin.on('data', (chunk) => {
    process.stdout.write('进程接收到数据：' + chunk);
});