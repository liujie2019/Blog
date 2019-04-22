// 连接数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/book', { useNewUrlParser: true });

// 模型骨架
const BookSchema = new mongoose.Schema({
    isbn: Number,
    name: String
});
// 定义静态方法
BookSchema.statics.findByISBN = function(isbn, cb) {
    this.findOne({isbn: isbn}, (err, doc) => {
        cb(err, doc);
    });
};
// 定义实例方法
BookSchema.methods.print = function() {
    console.log('Book info：');
    console.log('\tTitle：', this.name);
    console.log('\tISBN：', this.isbn);
};
const Book = mongoose.model('Book', BookSchema);
const book = new Book({
    name: '计算机程序设计',
    isbn: 123456
});
book.save(err => {
    if (err) {
        return console.log('save book failed', err);
    }
    Book.findByISBN(123456, (err, doc) => {
        console.log('findByISBN, err, doc：', err, doc);
    });
    book.print(); // 调用实例方法
});
