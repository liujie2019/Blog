const readline = require('readline');
const fs = require('fs');
const file = fs.createReadStream('./message.txt');
const out = fs.createWriteStream('./outMessage.txt');
let index = 1;
out.write('line' + index.toString() + ':');
index += 1;
const rl = readline.createInterface({
    input: file,
    output: out,
    terminal: true
});
rl.on('line', (line) => {
    out.write('line' + index.toString() + ':');
    index += 1;
});