Array.prototype.myIncludes = function(searchValue) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === searchValue) {
            return true;
        }
    }
    return false;
}

const arr = [1, 2, 3];
console.log(arr.myIncludes(2)); // true
console.log(arr.myIncludes(4)); // false