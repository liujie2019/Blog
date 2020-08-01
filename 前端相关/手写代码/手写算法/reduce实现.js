const arr = [1, 2, 3, 4];

Array.prototype.myReduce = function(cb, initialValue) {
    let {length} = this; // 获取数组长度
    let res = initialValue;
    let startIndex = 0;
    if (initialValue === undefined) {
        res = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < length; i++) {
        res = cb(res, this[i], i, this);
    }
    return res;
}

let res = arr.myReduce((accumulator, cur) => {
    return accumulator + cur;
}, 0);

console.log(res);