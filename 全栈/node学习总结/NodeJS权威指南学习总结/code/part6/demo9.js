const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test3.txt');
file.pipe(out);