const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test4.txt');
file.pipe(out, {end: false});
file.on('end', () => {
    out.end('追加数据');
});