const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', (line) => {
    if(line === 'exit' || line === 'quit' || line === 'q') {
        rl.close();
    }
    else {
        console.log('输出了：' + line);
    }
});