const mongoose = require('mongoose');
const userSchema = require('../schema/User');
// 导出user的模型
module.exports = mongoose.model('user', userSchema);