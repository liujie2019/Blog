// 连接数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/book', { useNewUrlParser: true });

// 模型骨架
const ResellerSchema = new mongoose.Schema({
    address: String
});

ResellerSchema.post('save', function(next) {
    console.log('我是后置中间件，在保存动作之后执行');
    next();
});
ResellerSchema.pre('save', true, function(next, done) {
    console.log('我是预处理中间件，在保存动作之前执行');
    next();
    done();
});
const Reseller = mongoose.model('Reseller', ResellerSchema);
const reseller = new Reseller({
    address: 'beijing'
});
reseller.save();
