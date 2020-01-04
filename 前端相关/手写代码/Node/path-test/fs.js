const fs = require('fs');
const path = require('path');
// console.log(path.resolve(__dirname, './path.js'));
// fs.readFile(path.resolve(__dirname, './path.js'), (err, data) => {
//     console.log(data.toString());
// });
// fs.readFile('./path.js', (err, data) => {
//     console.log(data.toString());
// });

const a = require('./path.js');
console.log(a);