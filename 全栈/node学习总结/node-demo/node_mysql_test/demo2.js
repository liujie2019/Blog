const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'node_test',
	user: 'root',
	password: 'root'
});

connection.connect(function(err) {
	if(err) console.log('mysql数据库连接失败');
	else {
		console.log('mysql数据库连接成功');
	}
	// connection.query('SELECT * FROM ??', ['users'], function(err, result){
	// 	if(err) console.log('查询数据失败');
	// 	else {
	// 		console.log(result);
	// 		connection.end();
	// 	}
	// });
	// connection.query('INSERT INTO users SET ?', 
	// 	{username: '周', firstname: '杰伦'}, 
	// 	function(err, result) {
	// 	if(err) console.log('插入数据失败');
	// 	else {
	// 		console.log('插入数据成功');
	// 	}
	// });
	connection.query('INSERT INTO users SET ?', {username: '杰', firstname: '王'}, function(err, result) {
		if(err) console.log('插入数据失败');
		else {
			console.log('插入数据成功');
			console.log('插入数据的ID是%d', result.insertId);
			connection.end();
		}
	});
});