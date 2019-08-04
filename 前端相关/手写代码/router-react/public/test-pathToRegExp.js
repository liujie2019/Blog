const pathToRegExp = require('path-to-regexp');

let reg = pathToRegExp('/home', [], {end: false});

console.log(reg.test('/home/1/2/3')); // true