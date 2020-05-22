Array.prototype.mySlice = function(startIndex = 0, endIndex = this.length) {
    const result = [];
    for (let i = startIndex; i < endIndex; i++) {
        result.push(this[i]);
    }
    return result;
}

const arr = [1, 2, 3, 4, 5];
console.log(arr.mySlice(1, 3));  // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5]