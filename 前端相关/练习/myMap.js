// ES5循环实现map
const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = []
    for (let i = 0; i < arr.length; i++) {
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue;
        mappedArr.push(fn.call(context, arr[i], i, this))
    }
    return mappedArr
}

Array.prototype.selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = []
    for (let i = 0; i < arr.length; i++) {
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue;
        mappedArr.push(fn.call(context, arr[i], i, this))
    }
    return mappedArr
}

const arr = [1, 2, 3];

const newArr = arr.selfMap(item => {
    return item * 3;
});

console.log(newArr);