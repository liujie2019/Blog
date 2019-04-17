const mongoose = require('./db.js');

// 模型骨架
const PersonSchema = new mongoose.Schema({
    fristName: String,
    lastName: String
});

// 创建虚拟属性
PersonSchema.virtual('fullName').get(function() {
    return this.fristName + ' ' + this.lastName;
});

PersonSchema.set('toJSON', {getters: true, virtual: true});

// 由schema构造生成Model
const Person = mongoose.model('Person', PersonSchema);
// 实例化
const person = new Person({
    fristName: 'li',
    lastName: 'si'
});
console.log('fullName:', person.fullName);
console.log('JSON:', JSON.stringify(person));

module.exports = Person;
