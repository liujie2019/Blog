// 连接数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/book', { useNewUrlParser: true });

// 模型骨架
const OrderSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true, // 设置必须
        max: 1000, // 设置最大值
        min: 10 // 设置最小值
    },
    status: {
        type: String,
        enum: ['created', 'success', 'failed'] // 枚举验证器
    },
    desc: {
        type: String,
        match: /book/g, // 正则验证器，值中必须包含book字符串
        validate: function(desc) { // 自定义验证器，必须大于10个字符
            return desc.length >= 10;
        }
    }
});

const Order = mongoose.model('Order', OrderSchema);
const order = new Order();
order.count = 100;
order.status = 'success';
order.desc = 'test';
order.save(err => {
    if (err) {
        return console.log('save failed', err);
    }
    console.log('save success');
});
