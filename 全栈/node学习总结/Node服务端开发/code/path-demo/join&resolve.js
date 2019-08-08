const path = require('path');

const path1 = path.join(__dirname, '/static/test.js');
const path2 = path.join(__dirname, './static/test.js');
const path3 = path.join(__dirname, '/Demo', './static/test.js');
const path4 = path.resolve(__dirname, '/static/test.js');
const path5 = path.resolve(__dirname, './static/test.js');
const path6 = path.resolve(__dirname, '/Demo', './static/test.js');

console.log(path1); // /Users/liujie26/static/test.js
console.log(path2); // /Users/liujie26/static/test.js
console.log(path3); // /Users/liujie26/Demo/static/test.js
console.log(path4); // /static/test.js
console.log(path5); // /Users/liujie26/static/test.js
console.log(path6); // /Demo/static/test.js

console.log(process.cwd());
console.log(__dirname);