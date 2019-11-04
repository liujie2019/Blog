/**
 * insertIndex：插入元素的位置
 * removeNumbers：从插入位置开始删除指定数量的元素
 * values：要插入的元素
*/
Array.prototype.mySplice = function(insertIndex, removeNumbers, ...values) {
    const firstPart = this.slice(0, insertIndex);
    const secondPart = this.slice(insertIndex + removeNumbers);
    const removeElements = this.slice(insertIndex, insertIndex + removeNumbers);

    const joinedArr = firstPart.concat(values, secondPart);
    const {length} = joinedArr;
    for (let i = 0; i < length; i++) {
        this[i] = joinedArr[i];
    }
    this.length = length;
    return removeElements; // 返回被删除的元素
}

const arr = [5, 6, 7, 8];
console.log(arr.mySplice(1, 2, 3));  // [6, 7]
console.log(arr); // [5, 3, 8]