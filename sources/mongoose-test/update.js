const Model = require('./Model.js');

// 更新数据

Model.updateOne({username: 'liutao'}, {age: 62}, (err, res) => {
	if(err) {
		console.error('Error: ' + err);
    }
    else {
		console.log(res);
	}
});
