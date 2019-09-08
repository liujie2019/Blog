Array.prototype.mySome = function(cb) {
    if(!Array.isArray(this)) {
        return 'Type Error';
    }
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            return true;
        }
    }
    return false;
}


const arr = [3, 6, 9];

const res = arr.mySome(item => {
    return item > 7;
});

console.log(res);