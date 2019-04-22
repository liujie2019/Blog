const mongoose = require('./db.js');

// 模型骨架
const PersonSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true // 去空格
    },
    age: {type: Number},
    blog: {
        type: String,
        set: url => { // 如果blog前面没有协议，则默认添加'http://'
            if (!url) return url;
            if (url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0) {
                url = 'http://' + url;
            }
            return url;
        }
    }
});

// 由schema构造生成Model
const Person = mongoose.model('Person', PersonSchema);
const person = new Person({
    username: '  zhaoliu ',
    age: 20,
    blog: 'www.baidu.com'
});
console.log(person);

module.exports = Person;
