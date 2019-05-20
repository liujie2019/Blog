const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(__filename);
fs.readFile(path.join(__dirname, './dir_name.js'), (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});