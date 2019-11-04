Array.prototype.myPop = function() {
    const value = this[this.length - 1];
    this.length -= 1;
    return value;
}
const arr = [1, 2, 3, 4];
console.log(arr.myPop()); // 4
console.log(arr);  // [1, 2, 3]