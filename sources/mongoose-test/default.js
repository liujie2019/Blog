const mongoose = require('./db.js');

// 模型骨架
const PersonSchema = new mongoose.Schema({
    username: {type: String, default: 'wangwu'},
    age: {type: Number, default: 12},
    address: {type: String, default: 'beijing'},
    time: {type: Date, default: Date.now}
});

// 由schema构造生成Model
const Person = mongoose.model('Person', PersonSchema);
const person = new Person();
console.log(person);

module.exports = Person;
