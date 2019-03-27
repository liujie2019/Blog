const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/mongoosesample';
const db = mongoose.connection;

// 连接数据库
mongoose.connect(DB_URL, {useNewUrlParser: true});

// 连接成功
db.once('open', () => {
    console.log('Mongoose connection open to：' + DB_URL);
});

// 连接失败
db.on('error', (err) => {
    console.log('Mongoose connection error：' + err);
});

// 连接断开
db.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;