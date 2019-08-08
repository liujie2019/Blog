const fs = require('fs');
function foo() {
    function beginAnotherTash() {
        const file = fs.createReadStream('./test.txt');
        file.on('data', (data) => {
            console.log('读取到%d字节。', data.length);
        });
    }
    process.nextTick(beginAnotherTash);
}
const file = fs.createReadStream('./test.txt');
file.on('data', (data) => {
    console.log('从test.txt中读取到%d字节。', data.length);
});
foo();