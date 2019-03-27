/*
对文件执行读写操作
fs.readFile(filename, [options], callback)
其中filename和callback是必须要指定的参数，options为可选参数。
filename参数用于指定读取文件的完整文件路径和文件名
*/
const fs = require('fs');
//这里使用options参数值中的encoding属性指定使用何种编码格式来读取该文件
fs.readFile('./test.txt', 'utf8', function(err, data) {
	if(err) {
		console.log('读取文件时发生错误。');
	}
	else {
		//使用Buffer对象的toString方法将缓存区中内容转换为字符串
		console.log(data);
		// console.log(data.toString());
	}
});