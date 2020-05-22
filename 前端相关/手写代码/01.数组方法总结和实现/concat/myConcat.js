Array.prototype.myConcat = function(...values) {
    const result = [...this];
    for (let i = 0; i < values.length; i++) {
        // 如果是数组，再次遍历依次push到结果数组中
        if (Array.isArray(values[i])) {
            for (let j = 0; j < values[i].length; j++) {
                result.push(values[i][j]);
            }
        }
        else {
            result.push(values[i]);
        }
    }
    return result;
}
const arr = [1, 2];
console.log(arr.concat([3, 4, 5], 6, [7, 8]));