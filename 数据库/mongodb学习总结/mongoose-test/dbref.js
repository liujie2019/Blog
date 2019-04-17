// 连接数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/book', { useNewUrlParser: true });

// 模型骨架
const UserSchema = new mongoose.Schema({
    username: String
});

const NewsSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User' // 指定使用User集合中的数据，通过ref指定将两个集合关联起来
    }
});

const Users = mongoose.model('User', UserSchema);
const News = mongoose.model('News', NewsSchema);

const user = new Users({
    username: 'lisi'
});
const news = new News({
    title: '武侠小说',
    author: user
});

user.save(err => {
    if (err) {
        return console.log('save failed', err);
    }
    news.save(err => {
        if (err) {
            return console.log('save news failed：', err);
        }
        News.findOne().populate('author').exec((err, doc) => {
            console.log('save success:', doc);
        });
    });
});
