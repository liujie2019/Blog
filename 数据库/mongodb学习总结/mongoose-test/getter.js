const mongoose = require('./db.js');

// 模型骨架
const PersonSchema = new mongoose.Schema({
    blog: {
        type: String,
        get: url => { // 如果blog前面没有协议，则默认添加'http://'
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
    blog: 'www.baidu.com'
});
console.log(person);

module.exports = Person;
