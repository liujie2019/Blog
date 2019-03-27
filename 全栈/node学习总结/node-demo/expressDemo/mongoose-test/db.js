const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/mongoosesample';

// 连接数据库
mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to：' + DB_URL);
});

// 连接失败
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error：' + err);
});

// 断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});