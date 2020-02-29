const fs = require('fs');

const readFilePromise = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readFilePromise('./data/a.txt').then(data => {
    console.log(data);
    return readFilePromise('./data/b.txt');
}, err => {
    console.log('读取文件失败', err);
}).then(data => {
    console.log(data);
    return readFilePromise('./data/c.txt');
}).then(data => {
    console.log('end11');
    console.log(data);
})