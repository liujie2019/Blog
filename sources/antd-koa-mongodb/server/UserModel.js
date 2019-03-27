const mongoose = require('./db.js');

// 模型骨架
const Schema = new mongoose.Schema({
    username: {type: String},
    age: {type: Number, default: 123456},
    address: {type: String},
    time: {type: Date}
});

// 由schema构造生成Model
const Model = mongoose.model('user', Schema);

module.exports = Model;