Array.prototype.myReduce = function(cb, initialValue) {
    const {length} = this;
    let result = initialValue;
    let startIndex = 0;
    if (initialValue === undefined) {
        result = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < length; i++) {
        result = cb(result, this[i], i, this);
    }
    return result;
}

const arr = [1, 2, 3, 4];
const res = arr.myReduce((initialValue, value, index, arr) => {
    return initialValue + value;
});
console.log(res);