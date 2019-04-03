var book = {
    _year: 2004,
    edition: 1
};
// year是访问器属性
Object.defineProperty(book, 'year', {
    get: function() {
        console.log(111);
        return this._year;
    },
    set: function(newValue) {
        console.log(222);
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
console.log(Object.getOwnPropertyDescriptor(book, '_year'));
console.log(Object.getOwnPropertyDescriptor(book, 'year'));

// 这里修改访问器属性，会调用访问器属性的set函数
book.year = 2005;
console.log(book.edition); // 2
// 这里读取访问器属性year，会调用访问器属性的get函数，返回this._year
console.log(book.year);
console.log(book._year); // 2005