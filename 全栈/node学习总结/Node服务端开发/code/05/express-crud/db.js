const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/express_crud');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    hobbies: {
        type: String
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});

// 导出模型构造函数
module.exports = mongoose.model('User', userSchema);