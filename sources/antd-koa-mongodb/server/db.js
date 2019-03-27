// 连接数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true });

// 连接失败
mongoose.connection.on('error', (err) => {
    console.error('数据库链接失败:' + err);
});

// 连接成功
mongoose.connection.on('open', () => {
    console.log('数据库链接成功');
});

// 断开数据库
mongoose.connection.on('disconnected', () => {
    console.log('数据库断开成功');
})

// 将mongoose导出
module.exports = mongoose;