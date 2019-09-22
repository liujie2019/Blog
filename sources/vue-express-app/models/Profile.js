const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describtion: { // 描述
        type: String
    },
    income: { // 收入
        type: Number,
        required: true
    },
    expand: { // 支出
        type: Number
    },
    cash: { //
        type: Number,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);