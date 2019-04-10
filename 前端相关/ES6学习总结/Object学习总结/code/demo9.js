var book = {
    _year: 2004,
    edition: 1
};
// year是访问器属性
Object.defineProperty(book, 'year', {
    get: function() {
        return this._year;
    }
});

book.year = 2005;
console.log(book.edition);