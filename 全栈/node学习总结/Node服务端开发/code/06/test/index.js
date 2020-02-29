const fs = require('fs');
const path = require('path');

require('./a');

fs.readFile('./a.txt', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
});

// fs.readFile(path.join(__dirname, './a.txt'), 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
// });