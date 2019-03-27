const fs = require('fs');
const out = fs.createWriteStream('./anotherTest.txt');
for(let i = 1; i <= 10000; i++) {
    const flag = out.write(i.toString());
    console.log(flag);
}
out.on('drain', () => {
    console.log('操作系统缓存区中的数据已经全部输出');
});
const out2 = fs.createWriteStream('./test2.txt');
for(let i = 1; i <= 10; i++) {
    const flag = out2.write(i.toString());
    console.log(flag);
}
out2.on('drain', () => {
    console.log('操作系统缓存区中的数据已经全部输出');
});