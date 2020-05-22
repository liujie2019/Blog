Array.prototype.myPush = function(...values) {
    const {length} = this;
    const {length: valuesLength} = values;
    for (let i = 0; i < valuesLength; i++) {
        this[length + i] = values[i];
    }
    return this.length;
}
const arr = [2, 3, 4];
const res = arr.myPush(5);
console.log(arr); // [2, 3, 4, 5]
console.log(res); // 4