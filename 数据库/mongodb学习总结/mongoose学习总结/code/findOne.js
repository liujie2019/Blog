const Person = require('./Model.js');

// 删除数据
Person.findOne({username: 'lisi'}, (err, res) => {
	if(err){
        console.log(err);
        return;
    }
    if (res) {
        // 如果找到，则删除数据
        res.remove();
    }
})