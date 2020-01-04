const fs = require('fs');
const Promise = require('bluebird');

Promise.reduce(['file1.txt', 'file2.txt', 'file3.txt'], (total, fileName) => {
    // console.log(fileName);
    fs.readFileSync(fileName, 'utf-8', content => {
        console.log(content);
        total += parseInt(content, 10);
    });
    return total;
}, 0).then(total => {
    console.log(total);
});
