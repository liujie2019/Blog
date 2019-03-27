const Model = require('./Model.js');

// 删除数据
Model.deleteOne({username: 'zhaoliu'}, (err, res) => {
	if(err) {
		console.error(err);
    }
    else {
		console.log(res);
	}
});