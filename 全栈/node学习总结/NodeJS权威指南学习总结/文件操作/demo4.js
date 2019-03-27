/*
对文件执行写操作
fs.writeFile(filename, data, [options], callback)
其中filename和callback是必须要指定的参数，options为可选参数。
filename参数用于指定读取文件的完整文件路径和文件名
*/

const fs = require('fs');
let options = {
	flag: 'a'
}
fs.writeFile('./message.txt', '这是追加的数据。', options, function(err) {
	if(err) {
		console.log('写文件操作失败。');
	}
	else {
		console.log('写文件操作成功');
	}
});