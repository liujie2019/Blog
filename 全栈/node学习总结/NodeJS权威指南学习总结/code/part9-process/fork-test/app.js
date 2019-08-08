const cp = require('child_process');
const sp1 = cp.fork('./test/test1.js', ['one', 'two', 'three', 'four'], {silent: true});
const sp2 = cp.fork('test2.js');
sp1.stdout.on('data', (data) => {
    console.log('子进程标准输出：' + data);
    sp2.send(data.toString());
});
sp1.on('exit', (code, signal) => {
    console.log('子进程退出，退出代码为：' + code);
    process.exit();
});
sp1.on('error', (err) => {
    console.log('子进程开启失败：' + err);
    process.exit();
});