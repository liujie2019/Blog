// 流和管道
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/test.txt');
var myWriteStream = fs.createWriteStream(__dirname + '/writeTest.txt');

myReadStream.pipe(myWriteStream);