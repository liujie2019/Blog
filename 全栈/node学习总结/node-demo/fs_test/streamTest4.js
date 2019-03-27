// 压缩
const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const password = new Buffer(process.env.PASS || 'password');
const encryptStream = crypto.createCipher('aes-256-cbc', password);

const gzip = zlib.createGzip();
const readStream = fs.createReadStream(__dirname + "/test.txt");
const writeStream = fs.createWriteStream(__dirname + '/out.gz');

readStream // reads current file
    .pipe(encryptStream) // 加密
    .pipe(gzip) // 压缩
    .pipe(writeStream) // writes to out file
    .on('finish', () => { // all done
        console.log('done');
    });