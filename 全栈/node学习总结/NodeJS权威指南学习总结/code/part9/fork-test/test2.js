const fs = require('fs');
const out = fs.createWriteStream('./message.txt');
process.on('message', (data) => {
    out.write(data);
});