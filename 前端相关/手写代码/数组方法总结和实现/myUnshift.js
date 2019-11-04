Array.prototype.myUnshift = function(...values) { // values可能是多个值，因此这里用...接收
    // values需要放到新数组的前面
    const mergedArr = values.concat(this);
    const {length} = mergedArr;
    // 获取新数组的长度并遍历新数组，将它的值保存在原始数组中，并覆盖开始时的值。
    for (let i = 0; i < length; i++) {
        this[i] = mergedArr[i];
    }
    return this.length;
}

const arr = [1, 2, 3];
console.log(arr.myUnshift(4, 5, 6)); // 6
console.log(arr); // [ 4, 5, 6, 1, 2, 3 ]