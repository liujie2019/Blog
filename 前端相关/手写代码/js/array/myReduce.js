Array.prototype.myReduce = function (cb, initialValue) {
    let i = 0;
    let result = initialValue;
    // 处理初始值不传情况
    if (typeof initialValue === 'undefined') {
        result = this[0];
        i++;
    }
    for (i; i < this.length; i++) {
        // 回调函数接收四个参数
        result = cb(result, this[i], i, this);
    }
    return result;
}

const arr = [1, 2, 3, 4, 5];
// accumulator为初始值，没有初始值的话为数组的第一个元素
const res = arr.myReduce((accumulator, currentValue, currentIndex, sourceArray) => {
    return accumulator + currentValue;
});
const res2 = arr.myReduce((accumulator, currentValue, currentIndex, sourceArray) => {
    return accumulator + currentValue;
}, 10);

console.log(res); // 15
console.log(res2); // 25