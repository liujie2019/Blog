const Person = require('./Model.js');

// 创建一个实例
const person = new Person({
    username: 'lisi',
    age: 20,
    address: 'tianjin',
    time: new Date()
});

person.save((err, res) => {
    if(err) {
        console.error(err);
    }
    else {
        console.log('插入数据成功');
        console.log(res);
    }
});

// 插入数据
// Model.create([
//     {
//         username: 'wangwu',
//         age: 33,
//         address: 'tianjin',
//         time: new Date()
//     }, {
//         username: 'zhaoliu',
//         age: 20,
//         address: 'henan',
//         time: new Date()
//     }
// ], (err, res) => {
//     if(err) {
//         console.error(err);
//     }
//     else {
//         console.log('插入数据成功');
//         console.log(res);
//     }
// });