Array.prototype.myFill = function(value, startIndex = 0, endIndex = this.length) {
    for (let i = startIndex; i < endIndex; i++) {
        this[i] = value;
    }
    return this;
}

const arr = [1, 2, 3, 4, 5];
const res = arr.myFill(6);
console.log(arr); // [ 6, 6, 6, 6, 6 ]
console.log(res); // [ 6, 6, 6, 6, 6 ]