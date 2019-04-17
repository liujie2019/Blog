const Person = require('./Model.js');
// 查询username为lisi或者wangwu的数据
const cond = {
    $or: [
        {username: 'lisi'},
        {username: 'wangwu'}
    ]
};
Person.find(cond, (err, res) => {
	if(err){
        console.log(err);
        return;
    }
    console.log('cond:', cond, 'res:', res);
})