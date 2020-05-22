Array.prototype.myShift = function(value) {
    const firstValue = this[0];
    for (let i = 1; i < this.length; i++) {
        this[i - 1] = this[i];
    }
    this.length -= 1;
    return firstValue;
}

const arr = [1, 2, 3];
console.log(arr.myShift()); // 1
console.log(arr); // [ 2, 3 ]