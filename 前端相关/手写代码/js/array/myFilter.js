Array.prototype.myFilter = function (cb) {
    if(!Array.isArray(this)) {
        return 'Type Error';
    }
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            console.log(this[i]);
            newArr.push(this[i]);
        }
    }
    return newArr;
}

const arr = [{
    name: 'lisi',
    age: 20
}, {
    name: 'wangwu',
    age: 22
}];

const resAge = arr.myFilter(item => {
    return item.age > 20;
});

console.log(resAge); // [ { name: 'wangwu', age: 22 } ]