Array.prototype.myReverse = function() {
    const result = [];
    for (let i = this.length - 1; i >= 0; i--) {
        result.push(this[i]);
    }
    return result;
}

let arr = [1, 2, 3];
console.log(arr.myReverse()); // [3, 2, 1]