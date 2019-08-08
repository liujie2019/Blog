const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('./hrtime.js')
    .pipe(zlib.createGzip())
    .pipe(process.stdout);