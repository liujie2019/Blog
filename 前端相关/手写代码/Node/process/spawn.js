const {spawn} = require('child_process');
const child = spawn('pwd');

// 子进程的stdout与当前进程的stdout之间建立管道
// child.stdout.pipe(process.stdout);

child.stdout.on('data', data => {
    process.stdout.write(data);
});