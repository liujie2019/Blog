const Model = require('./Model.js');

// 查询数据
Model.find({username: 'liutao'}, (err, res) => {
	if(err){
		console.log(err);
    }
    else {
		console.log(res);
	}
})