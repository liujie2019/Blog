// 解压
const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const password = new Buffer(process.env.PASS || 'password');
const decryptStream = crypto.createDecipher('aes-256-cbc', password);

const gzip = zlib.createGunzip();
const readStream = fs.createReadStream(__dirname + '/out.gz');

readStream // reads current file
    .pipe(gzip) // 解压
    .pipe(decryptStream) // 解密
    .pipe(process.stdout) // writes to terminal
    .on('finish', () => { // finished
        console.log('done');
    });