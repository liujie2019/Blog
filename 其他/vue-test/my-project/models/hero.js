//引入mongoose模块
const mongoose = require('mongoose');

//定义数据模型
const heroSchema = mongoose.Schema({
    name: String,
    age: String,
    sex: String,
    address: String,
    dowhat: String,
    imgArr: [],
    favourite: String,
    explain: String
}, {
    collection: 'myheros'
});
//第二个参数指定了到数据库中的hreolist表中取数据

const Hero = module.exports = mongoose.model('hero', heroSchema);