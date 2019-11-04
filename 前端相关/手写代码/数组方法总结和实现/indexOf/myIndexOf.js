Array.prototype.myIndexOf = function (value) {
    if(!Array.isArray(this)) {
        return 'TypeError';
    }
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return i;
        }
    }
    return -1;
}

const arr = [1, 2, 3];
console.log(arr.myIndexOf(2)); // 1
console.log(arr.myIndexOf(6)); // -1