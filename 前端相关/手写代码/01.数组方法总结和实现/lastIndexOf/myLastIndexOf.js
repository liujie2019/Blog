Array.prototype.myLastIndexOf = function(value) {
    if(!Array.isArray(this)) {
        return 'TypeError';
    }
    for (let i = this.length - 1; i >= 0; i--) {
        if (this[i] === value) {
            return i;
        }
    }
    return -1;
}

const arr = [2, 3, 6, 2];
console.log(arr.lastIndexOf(2)); // 3
console.log(arr.lastIndexOf(5)); // -1