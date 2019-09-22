// 连接数据库
const mongoose = require('mongoose');
const {mongoURI} = require('./config/constants');
// 连接数据库
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('数据库链接成功');
    }).catch(err => {
        console.log(err);
    });

// 连接失败
// mongoose.connection.on('error', err => {
//     console.error('数据库链接失败:' + err);
// });

// 连接成功
// mongoose.connection.on('open', () => {
//     console.log('数据库链接成功');
// });

// 断开数据库
mongoose.connection.on('disconnected', () => {
    console.log('数据库断开成功');
})

// 将mongoose导出
module.exports = mongoose;