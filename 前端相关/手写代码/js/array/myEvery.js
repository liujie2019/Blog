Array.prototype.myEvery = function(cb) {
    if(!Array.isArray(this)) {
        return 'Type Error';
    }
    let index = 0;
    while (index < this.length) {
        if (!cb(this[index], index, this)) {
            return false;
        }
        index++;
    }
    return true;
}

const arr = [3, 6, 9];

const res = arr.myEvery(item => {
    return item > 4;
});

console.log(res);