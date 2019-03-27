const mongoose = require('./db.js');

// 模型骨架
const PersonSchema = new mongoose.Schema({
    isnb: {
        type: Number,
        unique: true // 唯一索引
    },
    name: {
        type: String,
        index: true // 辅助索引
    }
});